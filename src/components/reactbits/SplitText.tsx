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
  const Tag = (motion[tag] || motion.p) as any;

  const items = React.useMemo(() => {
    if (splitType === 'words') {
      return text.match(/[\u4e00-\u9fa5]|[^\s\u4e00-\u9fa5]+|\s+/g) || [text];
    }
    return text.split('');
  }, [text, splitType]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <Tag
      className={`inline-block max-w-full break-words ${className}`}
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
          className="inline-block whitespace-pre-wrap"
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </Tag>
  );
};

export default SplitText;
