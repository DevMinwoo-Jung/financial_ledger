import React from 'react';
import styles from './modal.module.css';

const Modal = ({onRequestClose, img}) => {

  const onClose = () => {
    onRequestClose();
  }

  return (
    <img className={styles.modal} src={img} alt="" onClick={onClose}/>
    
  );
};

export default Modal;