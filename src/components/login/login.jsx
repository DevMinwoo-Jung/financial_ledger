import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './login.module.css'


const Login = ({authService}) => {
  const history = useHistory();
  const goTomaker = userId => {
    history.push({
      pathname: '/maker',
      state: { id: userId },
    });
  };
  const onLogin = event => {
    authService
      .login(event.currentTarget.textContent)
      .then(data => goTomaker(data.user.uid));
  };

  useEffect(() => {
    authService
      .onAuthChange(user => {
        user && goTomaker(user.uid);
      });

  })

  return(
    <section className={styles.login}>
      <div className={styles.loginLeft}>
        <span className={styles.loginLeftBigFont}>
          이번달은 먹은거 
          <br/>밖에 없는데
          <br/>바닥난 내 통장...
          <br/>얼마나 썼더라?
        </span>
        <span className={styles.loginLeftsmallFont}> 
          나만의 가계부로 소비습관을 쉽게 알아보세요!
        </span>
      </div>
      <div className={styles.loginRight}>  
        <ul className={styles.list}>
          <li className={styles.item}>
            <img className={styles.logo} src="/images/money.png" alt="logo" />
            <span className={styles.loginRightFont}>로그인하기</span>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>            
              <img src="/images/google.png" alt="" className={styles.loginLogo} />
              <span className={styles.logoPara}>Google</span>
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              <img src="/images/github.png" alt="" className={styles.loginLogo}/>
              <span className={styles.logoPara}>Github</span>
            </button>
          </li>
        </ul>
      </div>
    </section>
  )
};

export default Login;