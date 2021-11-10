import React from 'react';
import styles from './validModal.module.css';

const ValidModal = ({onRequestClose}) => {

  const onClose = () => {
    onRequestClose();
  }

  return (
    <div className={styles.modalDiv}>
      <header className={styles.modalHeader}>안내 메세지</header>
      <h1 className={styles.modalMessage}>날짜를 선택해주세요</h1>    
      <footer className={styles.modalFooter} onClick={onClose}> 메세지 닫기</footer>
    </div>
  );
};

export default ValidModal;