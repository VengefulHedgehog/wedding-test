import { motion } from 'framer-motion';
const DecorativeHearts = ({ position = 'top-right', count = 3, delay = 0 }) => {
    const hearts = ['/images/heart.jpg', '/images/heartarrow.jpg', '/images/hearts.jpg'];
    
    return (
        <>
            {[...Array(count)].map((_, i) => {
                const offset = i * 25;
                return (
                    <motion.img
                        key={i}
                        src={hearts[(i + delay) % hearts.length]}
                        alt="✦"
                        className={`decor-heart decor-${position}`}
                        style={{ 
                            '--offset': `${offset}px`,
                            '--delay': `${delay + i * 0.4}s`
                        } as React.CSSProperties}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        animate={{ 
                            y: [0, -8, 0],
                            rotate: [0, 3, -3, 0]
                        }}
                        transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: delay + i * 0.4
                        }}
                    />
                );
            })}
        </>
    );
};