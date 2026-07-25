import React from 'react';
import { motion } from 'motion/react';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: 'chars' | 'words';
  threshold?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0.05,
  duration = 0.5,
  splitType = 'chars',
  threshold = 0.2,
  tag = 'p',
  textAlign = 'left'
}) => {
  const Tag = motion[tag] || motion.p;

  const items = splitType === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <Tag
      className={`inline-block ${className}`}
      style={{ textAlign }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={containerVariants}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block whitespace-pre"
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </Tag>
  );
};

export default SplitText;
