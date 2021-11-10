import React, { memo } from 'react';
import RecordEditForm from '../record_edit_form/record_edit_form';
import RecordAddForm from '../record_add_form/record_add_form';
import styles from './editor.module.css';

const Editor = memo(({onAsc, onDesc, FileInput, records, onUpdate, addRecord, updateRecord, deleteRecord}) => {

  const goAsc = () => {
    onAsc();
  }

  const goDesc = () =>{
    onDesc();
  }

  return (
    <div className={styles.informations}>
      <div className={styles.informations__header}>
        <span className={styles.textBox}>날짜
          <img className={styles.uploadIcon} src="/images/upload.png" alt="오름차순" onClick={goAsc} />
          <img className={styles.downLoadIcon} src="/images/download.png" alt="내림차순" onClick={goDesc} />
        </span>
        <span className={styles.textBox}>지출비용</span>
        <span className={styles.textBox}>분류</span>
        <span className={styles.textBox}>메모</span>
        <span className={styles.textBox}>사진첨부</span>
        <span className={styles.textBox}>추가/삭제</span>
      </div>  
      <RecordAddForm FileInput={FileInput} onAdd={addRecord}/>  
      {
        Object.keys(records).map(key => (
          <RecordEditForm FileInput={FileInput} onUpdate={onUpdate} key={key} record={records[key]} updateRecord={updateRecord} deleteRecord={deleteRecord}/>
        ))
      }
    </div>
  );
});

export default Editor;