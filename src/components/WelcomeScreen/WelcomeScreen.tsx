import { ScreenProps } from '../../types';
import { motion, Variants } from 'framer-motion';
import './WelcomeScreen.css';

interface WelcomeScreenProps extends ScreenProps {
    onNext: () => void;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { 
            duration: 0.6, 
            ease: "easeInOut"
        }
    }
};

const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { 
            duration: 0.8, 
            ease: "easeOut"
        }
    }
};

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
    return (
        <motion.div 
            className="container welcome-container" 
            onClick={onNext}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.header 
                className="welcome-header"
                variants={itemVariants}
            >
                <h1>Вы получили приглашение</h1>
            </motion.header>
            
            <motion.div 
                className="image-wrapper"
                variants={imageVariants}
            >
                <img src="/images/ilove.webp" alt="Фон" className="image-bg" />
                <motion.img 
                    src="/images/telepuziki3.jpg" 
                    alt="Декор" 
                    className="image-overlay"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                        duration: 0.8, 
                        delay: 0.4, 
                        ease: "easeOut"
                    }}
                />
            </motion.div>
            
            {/* Текст для разных устройств */}
            <div className="next-btn" role="button" aria-label="Коснитесь экрана для просмотра">
                <span className="text-desktop">Для просмотра кликните сюда</span>
                <span className="text-mobile">Для просмотра коснитесь экрана</span>
            </div>
        </motion.div>
    );
}