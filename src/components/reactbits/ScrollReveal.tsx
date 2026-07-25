import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  enableBlur = true,
  baseOpacity = 0.15,
  blurStrength = 4,
  containerClassName = '',
  textClassName = ''
}) => {
  const words = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/);
  }, [children]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : 'none'
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      className={`inline-block ${containerClassName}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <span className={textClassName}>
        {words.map((word, i) => {
          if (word.match(/^\s+$/)) return word;
          return (
            <motion.span key={i} variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          );
        })}
      </span>
    </motion.div>
  );
};

export default ScrollReveal;
