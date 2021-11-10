import React, { memo } from 'react';
import styles from './receipt.module.css';



const Receipt = memo(({record, showModal}) => {
  const {fileURL, etc, date} = record;
  const url = fileURL;

  const goShow = (event) => {
    showModal(event);
  }

  return (
        <div className={styles.receipt}>
          <p className={styles.date}>{date}</p>  
          <img className={styles.receipt__img} src={url} alt="" onClick={goShow} />
          <p className={styles.para}>{etc}</p>
        </div>
  );
});

export default Receipt;