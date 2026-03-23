import { useEffect, useState } from 'react';
import { CountdownTime } from '../types';

export default function Countdown() {
  const [time, setTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date();
    weddingDate.setDate(weddingDate.getDate() + 182);
    weddingDate.setHours(17, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => String(num).padStart(2, '0');

  return (
    <div className="countdown">
      {[
        { value: time.days, label: 'дней' },
        { value: time.hours, label: 'часов' },
        { value: time.minutes, label: 'минут' },
        { value: time.seconds, label: 'секунд' },
      ].map((item) => (
        <div className="countdown-item" key={item.label}>
          <div className="number">{formatNumber(item.value)}</div>
          <div className="label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}