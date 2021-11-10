import React from 'react';
import { useRef } from 'react/cjs/react.development';
import styles from './date_search_form.module.css';


const DateSearchForm = ({onSubmit, startRef, endRef, onResetDate}) => {
  const formRef= useRef();


  const goSubmit = (event) => {
    onSubmit(event);
  }

  const goResetDate = (event) => {
    onResetDate(event);
    formRef.current.reset();
  }


  return (
    <div className={styles.search__div}>
      <form className={styles.search__form} ref={formRef}>
        <input className={styles.datesPicker} ref={startRef} type="date"  />
        <input className={styles.datesPicker} ref={endRef} type="date" />
        <div className={styles.container}>
          <img className={styles.searchImg} onClick={goSubmit} src="/images/search.png" alt="" title="검색하기"/>
        </div>
        <div className={styles.container}>
          <img className={styles.searchImg} onClick={goResetDate} src="images/circular-refreshment-arrow.png" alt="" title="날짜 초기화"/>
        </div>
      </form>
    </div>
  );
};

export default DateSearchForm;