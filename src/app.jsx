import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import styles from './app.module.css';
import Maker from './components/maker/maker';

function App({FileInput, authService, recordRepository }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div className={styles.app}>
            <Login authService={authService} />
          </div>
        </Route>
        <Route path="/maker">
          <Maker FileInput={FileInput} authService={authService} recordRepository={recordRepository}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
