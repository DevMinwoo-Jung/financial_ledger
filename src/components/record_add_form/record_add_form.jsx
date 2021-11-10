import React, { useRef, useState } from 'react';
import ValidModal from '../validModal/validModal';
import Button from '../button/button';
import styles from './record_add_form.module.css';

const RecordAddForm = ({FileInput, onAdd}) => {
  const formRef = useRef();
  const dateRef = useRef();
  const costRef = useRef();
  const categoryRef = useRef();
  const etcRef = useRef();
  const [file, setFile] = useState({fileName: null, fileURL: null});
  const [required, setRequired] = useState();
  const [show, setShow] = useState(false);

  const onSubmit = event => {
    event.preventDefault();
    const record = {
      id: Date.now(),
      date: dateRef.current.value,
      cost: costRef.current.value || '',
      category: categoryRef.current.value || '',
      etc: etcRef.current.value || '',
      fileName: file.fileName || '',
      fileURL: file.fileURL || '',
    };
    if(record.date === ''){
      setRequired(true);
      setShow(true);
      return;
    } 
    formRef.current.reset();
    setFile({ fileName: null, fileURL: null, });
    
    onAdd(record);
  };

  const onRequestClose = () => {
    setShow(false);
    setRequired(false);
  };

  const onFileChange = file => {
    setFile({
          fileName: file.name,
          fileURL: file.url,
    });
  };


  return (
      <form className={styles.form} ref={formRef}>
        <div className={show === true ? styles.showModal : styles.none}>
        {
          show === true ? <ValidModal onRequestClose={onRequestClose}/> : null
        }
        </div>
        <input className={required === true ? styles.required : styles.inputs} ref={dateRef} type="date" name="date"/>
        <input className={styles.inputs} ref={costRef} type="number" name="cost" />
        <select ref={categoryRef}className={styles.inputs} name="theme" >
                        <option value=""></option>
                        <option value="foods">식비</option>
                        <option value="rent">주거</option>
                        <option value="daily">생필품</option>
                        <option value="health/culture">건강/문화</option>
                        <option value="education">교육</option>
                        <option value="transportation">교통</option>
                        <option value="Installment">할부</option>
                        <option value="etc">기타</option>
        </select>
        <input className={styles.inputs} ref={etcRef} type="text" name="etc"/>
      <FileInput name={file.fileName} onFileChange={onFileChange}/>
      <Button name="추가" onClick={onSubmit} />
      </form>
  );
};

export default RecordAddForm;