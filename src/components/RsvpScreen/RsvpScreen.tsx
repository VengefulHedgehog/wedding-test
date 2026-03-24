import { useState, FormEvent, ChangeEvent } from 'react';
import { ScreenProps } from '../../types';
import './RsvpScreen.css';
import '../ui/Button.css';
import { submitToGoogleSheets, FormData } from '../../utils/formSubmit';

interface RsvpScreenProps extends ScreenProps {}

export default function RsvpScreen({ onBack }: RsvpScreenProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    attendance: [],
    allergies: '',
    alcohol: [],
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'attendance') {
        setFormData(prev => ({
          ...prev,
          attendance: checked ? [value] : []
        }));
      } else {
        setFormData(prev => {
          if (value === 'Не пью') {
            return {
              ...prev,
              alcohol: checked ? ['Не пью'] : []
            };
          } else {
            if (checked) {
              const filtered = prev.alcohol.filter(item => item !== 'Не пью');
              return {
                ...prev,
                alcohol: [...filtered, value]
              };
            } else {
              return {
                ...prev,
                alcohol: prev.alcohol.filter(item => item !== value)
              };
            }
          }
        });
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || formData.attendance.length === 0) {
      setStatus('error');
      setStatusMessage('Пожалуйста, укажите имя и выберите вариант присутствия');
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 5000);
      return;
    }
    
    setStatus('loading');

    try {
      await submitToGoogleSheets(formData);
      
      setStatus('success');
      setFormData({ name: '', attendance: [], allergies: '', alcohol: [] });
      
    } catch (error) {
      console.error('Ошибка:', error);
      setStatus('error');
      setStatusMessage('⚠️ Что-то пошло не так. Попробуйте ещё раз или напишите нам.');
      
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 8000);
    }
  };

  return (
    <div className="container">
      <button onClick={onBack} className="back-btn" type="button">← Назад</button>
      
      <div className="rsvp">
        <h3> Подтвердите участие</h3>
        
        {statusMessage && (
          <p 
            className="form-status" 
            style={{ 
              textAlign: 'center', 
              marginTop: '12px', 
              fontSize: '0.9rem',
              color: status === 'success' ? '#2e7d32' : status === 'error' ? '#c62828' : '#666'
            }}
          >
            {statusMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} id="rsvpForm">
          <div className="form-group">
            <label htmlFor="name">Ваше ФИО *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Иван Иванов"
              disabled={status === 'success'} // Также блокируем ввод после успеха
            />
          </div>

          <div className="form-group">
            <label>Планируете ли вы присутствовать? *</label>
            <div className="checkbox-group">
              {[
                'Буду с радостью!',
                'К сожалению, нет'
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    name="attendance"
                    value={option}
                    checked={formData.attendance.includes(option)}
                    onChange={handleChange}
                    disabled={status === 'success'} // Блокируем чекбоксы
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="allergies">Есть ли у вас пищевые аллергии?</label>
            <input
              id="allergies"
              name="allergies"
              type="text"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="Например: орехи, лактоза..."
              disabled={status === 'success'} // Блокируем ввод
            />
          </div>
          
          <div className="form-group">
            <label>Предпочтения по алкоголю:</label>
            <div className="checkbox-group">
              {[
                'Шампанское', 'Красное вино', 'Белое вино', 
                'Виски', 'Водка', 'Не пью'
              ].map((drink) => (
                <label key={drink}>
                  <input
                    type="checkbox"
                    name="alcohol"
                    value={drink}
                    checked={formData.alcohol.includes(drink)}
                    onChange={handleChange}
                    disabled={status === 'success'} // Блокируем чекбоксы
                  />
                  {drink}
                </label>
              ))}
            </div>
          </div>
          
          <button 
            type="submit" 
            id="submitBtn"
            disabled={status === 'loading' || status === 'success'}
            className="next-btn"
          >
            {status === 'loading' 
              ? '⏳ Отправка...' 
              : status === 'success' 
                ? 'Спасибо, ваш ответ сохранён 💕' 
                : 'Отправить ответ'}
          </button>
        </form>
      </div>
    </div>
  );
}