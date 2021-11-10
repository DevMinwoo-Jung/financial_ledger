import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import DateSearchForm from '../date_search_form/date_search_form';
import Editor from '../editor/editor';
import Header from '../header/header';
import Receipts from '../receipts/receipts';
import Summary from '../summary/summary';
import styles from './maker.module.css';
import uuid from 'react-uuid';




const Maker = memo(({FileInput, authService, recordRepository }) => {


  const history = useHistory();
  const historyState = history?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [records, setRecords] = useState({});
  const [newRecords, setNewRecords] = useState({});
  const [orginalRecords, setOrginalRecords] = useState({});
  const [firstRender, setFirstRender] = useState(false);
  const [dates, setDates] = useState({start: '', end: ''});

  let startRef = useRef();
  let endRef = useRef();

  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  
  useEffect(() => {
    if(!userId){
      return;
    }
    if(firstRender === true){
    const stopSync = recordRepository.syncRecords(userId, records => {
      setOrginalRecords(records);
      setNewRecords(records);
    })
      return () => stopSync();
    } else {
      const stopSync = recordRepository.syncRecords(userId, records => {
        setOrginalRecords(records);
        setNewRecords(records);
        setRecords(records);
      })
      return () => stopSync();
    }
  }, [userId, recordRepository, firstRender]);

  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push('/');
      }
    });
  }, [userId, history, authService]);


  const onSubmit = (event) => {
    event.preventDefault();
    startRef = startRef.current.value;
    endRef = endRef.current.value;
    modifyDates(startRef, endRef);
    onUpdate(startRef, endRef);
  };

  const modifyDates = (startRef, endRef) => {
    setDates({
      start: startRef,
      end: endRef,
    })
  };

  const onResetDate = (event) => {
    event.preventDefault();
    startRef = '';
    endRef = '';
    modifyDates(startRef, endRef);
    onUpdate(startRef, endRef);
  };

  const onUpdate = (startRef, endRef) => {
    setNewRecords({...orginalRecords});
    
    setFirstRender(true);
      if((startRef === '') & (endRef === '')){
        setNewRecords({...orginalRecords});
        setRecords(newRecords);

      } else if ((startRef !== '') & (endRef === '')){
        setNewRecords({...orginalRecords});
        for(let key in newRecords){
          if(!(newRecords[key].date >= startRef)){
            delete newRecords[key];
          }
        }
        setRecords(newRecords);

      } else if ((startRef === '') & (endRef !== '')){
        setNewRecords({...orginalRecords});
        for(let key in newRecords){
          if(!(newRecords[key].date <= endRef)){
            delete newRecords[key];
          }
        }
        setRecords(newRecords);

      } else if ((startRef !== '') & (endRef !== '')){
        setNewRecords({...orginalRecords});
        for(let key in newRecords){
          if(!(newRecords[key].date >= startRef && newRecords[key].date <= endRef)){
            delete newRecords[key];
          }
        }
        setRecords(newRecords);
      }
  }

  const createOrUpdateRecord = record => {
    setRecords(records => {
      const updated = {...records};
      updated[record.id] = record;
      return updated;
    });
    recordRepository.saveRecord(userId, record);

  };

  const deleteRecord = record => {
    setRecords(records => {
      const updated = {...records};
      delete updated[record.id];
      return updated;
    });
    recordRepository.removeRecord(userId, record);
  };

  
  const onAsc = () => {
    setNewRecords({...orginalRecords});
    setRecords(newRecords);
    setFirstRender(true);
    let sortRecords = Object.keys(records).map(key => records[key])
    .sort(function (a, b) 
    {
      if(a['date'] > b['date']){
        return 1;
      } else if (a['date'] === b['date']){
        return 0;
      } else {
        return -1;
      }
    }
    ).map(records => records);
    const newKey = sortRecords.map(records =>  records['id']);
    const myObj = {};
    for(let i=0; i<sortRecords.length;i++){
      if(sortRecords[i]['date'] === ''){
        delete sortRecords[i];
      } else {
        myObj[newKey[i]] = sortRecords[i];
      }
    }
    setRecords(myObj);
  }

  const onDesc = () => {
    setNewRecords({...orginalRecords});
    setRecords(newRecords);
    setFirstRender(true);
    let sortRecords = Object.keys(records).map(key => records[key])
    .sort(function (a, b) 
    {
      if(a['date'] > b['date']){
        return -1;
      } else if (a['date'] === b['date']){
        return 0;
      } else {
        return 1;
      }
    }
    ).map(records => records);
    const newKey = sortRecords.map(records =>  records['id']);
    const myObj = {};

    for(let i=0; i<sortRecords.length;i++){
      if(sortRecords[i]['date'] === ''){
        delete sortRecords[i];
      } else {
        myObj[newKey[i]] = sortRecords[i];
      }
    }
    setRecords(myObj);
  }

  return (
    <>
    <Header onLogout={onLogout} />
    <section className={styles.contents}>
    <div>
      <DateSearchForm onSubmit={onSubmit} startRef={startRef} endRef={endRef} onResetDate={onResetDate} />
    </div>
    <div className={styles.display}>
      <Receipts records={records} key={uuid()}/>
      <Summary records={records} dates={dates} />
    </div>
    <div className={styles.editor}>
      <Editor onAsc={onAsc} onDesc={onDesc} FileInput={FileInput} records={records}  onUpdate={onUpdate} onSubmit={onSubmit} addRecord={createOrUpdateRecord} updateRecord={createOrUpdateRecord} deleteRecord={deleteRecord}/>    
    </div>
    </section>
    </>
  );
});

export default Maker;