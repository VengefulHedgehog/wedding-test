import { motion, Variants } from 'framer-motion';
import { ScreenProps } from '../../types';
import './DetailsScreen.css';

interface DetailsScreenProps extends ScreenProps {
    onBack: () => void;
    onNext: () => void;
}

// Варианты анимации для появления при скролле
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

export default function DetailsScreen({ onNext }: DetailsScreenProps) {
    return (
        <motion.div 
            className="details-page"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Главное фото на всю ширину */}
            <motion.section className="section main-photo-section" variants={fadeInUp}>
                <img src="/images/wedding.jpg" alt="Свадьба" className="main-photo" />
            </motion.section>

            {/* Фото пары */}
            <motion.section className="section couple-section" variants={fadeInUp}>
                <motion.h2 
                    className="couple-names"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <span className="name-first">Евгений +</span>
                    <br />
                    <span className="name-second">Лилия</span>
                </motion.h2>
                <div className="couple-photos-wrapper"> {/* 👈 Новая обёртка для позиционирования */}
                    <div className="couple-photos">
                        <motion.img 
                            src="/images/jenya.jpg" 
                            alt="Евгений" 
                            className="couple-photo"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        />
                        <motion.img 
                            src="/images/lilya.jpg" 
                            alt="Лилия" 
                            className="couple-photo"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        />
                    </div>
                    
                    {/* 👇 Блок с датой поверх фото */}
                    <motion.div 
                        className="couple-date-btn next-btn"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        15 мая 2026
                    </motion.div>
                </div>
            </motion.section>

            {/* Приветствие */}
            <motion.section className="section greeting-section" variants={fadeInUp}>
                <h3>Дорогие наши друзья и родные !</h3>
                <p>Это официальное приглашение на нашу свадьбу !<br />
                А получили вы его, потому что мы очень хотим видеть вас в этот день рядом с нами !</p>
            </motion.section>

            {/* Дата */}
            <motion.section className="section date-section" variants={fadeInUp}>
                <div className="date-numbers">
                    <span>15</span>
                    <span className="dot">•</span>
                    <span>05</span>
                    <span className="dot">•</span>
                    <span>26</span>
                </div>
            </motion.section>

            {/* Календарь */}
            <motion.section className="section calendar-section" variants={fadeInUp}>
                <img src="/images/calendar.jpg" alt="Календарь" className="calendar-img" />
            </motion.section>

            {/* Место проведения */}
            <motion.section className="section venue-section" variants={fadeInUp}>
                <h3>Место проведения</h3>
                <p className="venue-name">Бар-ресторан "Кул"</p>
                <a 
                    href="https://yandex.ru/maps/org/kul/119246599550?si=c0qbzjm4jve6qey3f28r8gd1qw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="venue-link"
                >
                    <span className="map-marker">📍</span>
                    <span>Чернышевского, 9</span>
                </a>
            </motion.section>

            {/* Тайминг */}
            <motion.section className="section timeline-section" variants={fadeInUp}>
                <h3>Тайминг</h3>
                <div className="timeline-list">
                    {[
                        { icon: '/images/love.jpg', time: '17:00', text: 'Сбор гостей' },
                        { icon: '/images/ring.jpg', time: '17:30', text: 'Начало торжества' },
                        { icon: '/images/disco.jpg', time: '22:00', text: 'Окончание банкетной части' },
                        { icon: '/images/moon.jpg', time: '23:00', text: 'Окончание мероприятия' },
                    ].map((item, index) => (
                        <motion.div 
                            key={index}
                            className="timeline-item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <img src={item.icon} alt="" className="timeline-icon" />
                            <span><strong>{item.time}</strong> {item.text}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Дресс-код */}
            <motion.section className="section dresscode-section" variants={fadeInUp}>
                <h3>Дресс-код</h3>
                <p>- Свободный стиль</p>
                <p>Мы хотим, чтобы вы чувствовали себя комфортно и оставались собой. 
                Выбирайте костюмы и платья, в которых вам удобно, которые вам к лицу 
                и в которых вы будете по-праздничному сиять!</p>
            </motion.section>

            {/* Детали */}
            <motion.section className="section details-section" variants={fadeInUp}>
                <h3>Детали</h3>
                <p>Дорогие гости, пожалуйста не обременяйте себя выбором цветов и подарков, 
                будем благодарны за вклад в бюджет нашей молодой семьи, который поможет 
                осуществить наши мечты.</p>
                <p>Присоединяйтесь к нашему ТГ-каналу с важной информацией и мемами.</p>
                <ul>
                    <li>Также там будет удобный способ перевода средств в день торжества — QR-код</li>
                    <li>А после мероприятия будем рады получить от вас все фото и видео с этого торжества</li>
                </ul>
                <a 
                    href="https://t.me/your_channel" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="next-btn telegram-btn"
                >
                    Telegram
                </a>
            </motion.section>

            {/* Анкета гостя */}
            <motion.section className="section rsvp-section" variants={fadeInUp}>
                <h3>Анкета гостя</h3>
                <p>Пожалуйста подтвердите своё присутствие на мероприятии до</p>
                <p className="rsvp-date">12 апреля 2026</p>
                <button onClick={onNext} className="next-btn telegram-btn" type="button">
                    Подтвердить
                </button>
            </motion.section>

            {/* Завершающий блок */}
            <motion.section className="section closing-section" variants={fadeInUp}>
                <p className="closing-text">
                    До скорой встречи !<br />
                    С любовью,<br />
                    Евгений и Лилия
                </p>
                <motion.img 
                    src="/images/photo.jpg" 
                    alt="Пара" 
                    className="closing-photo"
                    initial={{ rotate: 0 }}
                    whileInView={{ rotate: 2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </motion.section>
        </motion.div>
    );
}