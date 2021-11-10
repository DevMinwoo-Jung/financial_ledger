import React, { memo } from 'react';
import styles from './button.module.css';

const Button = memo(({name ,onClick}) => {
  return (
        <button className={styles.button} onClick={onClick}>
          <span className={styles.buttonSpan}>{name}</span>
        </button>
  );
});

export default Button;