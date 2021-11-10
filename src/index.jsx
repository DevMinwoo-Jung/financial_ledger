import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import AuthService from './service/auth_service'
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';
import RecordRepository from './service/record_repository';


const authService = new AuthService();
const imageUploader = new ImageUploader();
const recordRepository = new RecordRepository();
const FileInput = memo(props => (
  <ImageFileInput {...props} imageUploader={imageUploader}/>
));

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} recordRepository={recordRepository} FileInput={FileInput}/>
  </React.StrictMode>,
  document.getElementById('root')
);
