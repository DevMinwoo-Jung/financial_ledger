import {firebaseDatabase} from './firebase';

class RecordRepository {

  syncRecords(userId, onUpdate){
    const ref = firebaseDatabase.ref(`${userId}/records`);
    ref.on('value', snapshot => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }

  saveRecord(userId, record){
    firebaseDatabase.ref(`${userId}/records/${record.id}`).set(record);
  }

  removeRecord(userId, record){
    firebaseDatabase.ref(`${userId}/records/${record.id}`).remove();
  }
}

export default RecordRepository;