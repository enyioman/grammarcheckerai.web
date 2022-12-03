import PropTypes from 'prop-types';
import { Dialog, IconButton } from '@mui/material';
import style from './popup.module.css';
import styles from './checkout.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoadingButton from '@mui/lab/LoadingButton';
import useLogin from '../../../hooks/auth/useLogin';
import useSignup from '../../../hooks/auth/useSignup';
import toast, { Toaster } from 'react-hot-toast';
import PasswordMask from 'react-password-mask';
import useTheme from '../../../hooks/useTheme';
import { AiOutlineClose } from 'react-icons/ai';
import check from '../Assets/tick-square.png';
import medal from '../Assets/medal-star-white.png';

const Checkout = (props) => {
  const context = useTheme();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserFirstName, setNewUserFirstName] = useState('');
  const [newUserLastName, setNewUserLastName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState('');
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [isPaymentPage, setIsPaymentPage] = useState(false);

  const success = (message) => toast.success(message);
  const error = (message) => toast.error(message);

  const authLogin = useLogin();
  const authSignup = useSignup();
  let navigate = useNavigate();

  const handleLoginAccount = () => {
    setIsCreateAccount(false);
  };
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };
  const handleCreateAccount = () => {
    setIsCreateAccount(true);
  };

  useEffect(() => {
    if (localStorage.getItem('grittyuserid') === null || localStorage.getItem('grittyuserid') === '') {
      localStorage.setItem('grittyuserid', userId);
      localStorage.setItem('grittyusertoken', userToken);
    } else {
      localStorage.setItem('grittyuserid', localStorage.getItem('grittyuserid'));
      localStorage.setItem('grittyusertoken', localStorage.getItem('grittyusertoken'));
    }
  }, [userId, userToken]);

  const handlelogin = (e) => {
    e.preventDefault();
    if ((userEmail !== '') & (userPassword !== '')) {
      authLogin
        .mutateAsync({
          email: userEmail,
          password: userPassword,
        })
        .then((res) => {
          if (localStorage.getItem('grittyuserid') === null || localStorage.getItem('grittyuserid') === '') {
            const resId = res.data.data._id;
            const resToken = res.data.data.token;
            setUserId(resId);
            setUserToken(resToken);
            localStorage.setItem('grittyuserid', userId);
            localStorage.setItem('grittyusertoken', userToken);
            success('Login Successful!');
            setTimeout(() => {
              setIsPaymentPage(true);
            }, 2000);
          } else {
            error('Already Logged in, proceeding...');
            setIsPaymentPage(true);
          }
          // localStorage.setItem('isdashboard', true);
          // setTimeout(() => {
          //   window.location.replace('/me/home');
          //   navigate('/me/home', { replace: true });
          // }, 5000);
        })
        .catch((err) => {
          error(err.message);
        });
    }
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    if (
      (newUserName !== '') &
      (newUserFirstName !== '') &
      (newUserLastName !== '') &
      (newUserPassword !== '') &
      (newUserEmail !== '') &
      (newUserConfirmPassword === newUserPassword)
    ) {
      authSignup
        .mutateAsync({
          email: newUserEmail,
          firstName: newUserFirstName,
          lastName: newUserLastName,
          username: newUserName,
          language: 'English',
          password: newUserPassword,
          confirm_password: newUserConfirmPassword,
        })
        .then((res) => {
          success("Account Created Succesfully!\nYou'll be redirected to the Dashboard in 5 seconds...");
          const resId = res.data.data._id;
          const resToken = res.data.data.token;
          // setUserId(resId);
          // setUserToken(resToken);
          // localStorage.setItem('grittyuserid', userId);
          // localStorage.setItem('grittyusertoken', userToken);
          // localStorage.setItem('isdashboard', true);
          // setTimeout(() => navigate('/me/home', { replace: true }), 5000);
        })
        .catch((err) => {
          error(err.response.data.message);
        });
    } else if (newUserPassword !== newUserConfirmPassword) {
      setIsSamePassword(false);
    }
  };

  // const useFetch = (url) => {
  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow',
  //   };
  //   fetch(url, requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       const oBJ = JSON.parse(result);
  //       window.location.href = oBJ.message;
  //     })
  //     .catch((err) => error(err.message));
  // };

  // const handleGoogleAuth = () => {
  //   useFetch('https://speakbetter.hng.tech/api/v1/auth/google');
  // };

  const isTabletorMobile = useMediaQuery('(min-width:850px)');
  const matches = useMediaQuery('(max-width:694px)');
  const isMobile = useMediaQuery('(max-width:389px)');

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClosePremium}
      TransitionComponent={props.Transition}
      className={style._sbDialog}
    >
      <div signup-theme={context.theme} className={styles._gs2mainlogin}>
        <div className={styles._gs2login}>
          {!isCreateAccount ? (
            <div className={styles._gs2logincol1} gs2logincol1-theme={context.theme}>
              <div className={styles._gs2logincontent}>
                <div className={styles._authback}>
                  <svg onClick={props.handleBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="48"
                      d="M328 112L184 256l144 144"
                    />
                  </svg>
                </div>
                <h2 signup-theme={context.theme}>Subscription</h2>
                <p signup-theme={context.theme} className={styles._subtitle}>
                  Complete the process with just few steps. You’re almost all set.
                </p>
                {}
                <form onSubmit={(e) => handlelogin(e)} className={styles._gs2loginform}>
                  <div className={styles._gs2logininput}>
                    <span>Email</span>
                    <input
                      type="email"
                      placeholder="shalomtaiwo@example.com"
                      defaultValue=""
                      id="userName"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <div className={styles._gs2logininput}>
                    <span>Password</span>
                    <PasswordMask
                      type="password"
                      value={userPassword}
                      id="userPassword"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                      required
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                  </div>
                  {!isMobile && (
                    <div className={styles._gs2logincheck}>
                      <div className={styles._gs2loginsignin} signup-theme={context.theme}>
                        <a href="#/" className={styles._gsloginforgot} onClick={handleCreateAccount}>
                          Create an account?
                        </a>
                      </div>
                      <div>
                        <button
                          signup-theme={context.theme}
                          type="button"
                          className={styles._gsloginforgot}
                          onClick={handleForgotPassword}
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>
                  )}
                  <div className={styles._gs2logincontinue}>
                    <LoadingButton size="small" type="submit" loading={authLogin.isLoading} variant="contained">
                      Login
                    </LoadingButton>
                  </div>
                  {isMobile && (
                    <div className={styles._gs2logincheck}>
                      <div className={styles._gs2loginsignin} signup-theme={context.theme}>
                        <a href="#/" className={styles._gsloginforgot} onClick={handleCreateAccount}>
                          Create an account?
                        </a>
                      </div>
                      <div>
                        <button
                          signup-theme={context.theme}
                          type="button"
                          className={styles._gsloginforgot}
                          onClick={handleForgotPassword}
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>
                  )}
                  {/* <div className={styles._gs2sociallogincol}>
                  <p>Alternatively, you can sign up with:</p>
                  <div className={styles._gs2sociallogins}>
                  <button type="button" className={styles._google} onClick={handleGoogleAuth}>
                    <img src={google} alt="google authentication" />
                  </button>
                  <button type="button" className={styles._facebook} onClick={handleFacebookAuth}>
                    <img src={facebook} alt="facebook authentication" />
                  </button>
                  <button type="button" className={styles._apple} onClick={handleLinkedInAuth}>
                    <img src={apple} alt="apple authentication" />
                  </button>
                </div>
                </div> */}
                </form>
              </div>
              {!isTabletorMobile && (
                <div className={styles._gs2logincol2}>
                  <div className={styles._sbmodalCol1}>
                    <div className={styles._sbmodalHeaderCol1}>
                      <div className={styles._sbmodalTitle}>
                        <img src={medal} alt="medal" />
                        <h2>Upgrade to premium</h2>
                      </div>
                    </div>
                    <div className={styles._sbmodalCol1Body}>
                      <div className={styles._sbmodalText}>
                        <p>You can get a lot more out of Speak Better by upgrading to premium. Get all features:</p>
                      </div>
                      <div className={styles._sbmodalList}>
                        <div>
                          <img src={check} alt="check" className={styles._sbListIcon} />
                          <p>Unlimited audio length</p>
                        </div>
                        <div>
                          <img src={check} alt="check" className={styles._sbListIcon} />
                          <p>Access to transcription history</p>
                        </div>
                        <div>
                          <img src={check} alt="check" className={styles._sbListIcon} />
                          <p>Variety of AI bot</p>
                        </div>
                        <div>
                          <img src={check} alt="check" />
                          <p>Grammer corrections</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles._gs2logincol1} gs2logincol1-theme={context.theme}>
              <div className={styles._gs2logincontent}>
                <div className={styles._authback}>
                  <svg onClick={props.handleBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="48"
                      d="M328 112L184 256l144 144"
                    />
                  </svg>
                </div>
                <h2 signup-theme={context.theme}>Subscription</h2>
                <p signup-theme={context.theme} className={styles._subtitle}>
                  Complete the process with just few steps. You’re almost all set.
                </p>
                <form onSubmit={(e) => handleSignUp(e)} className={styles._gs2loginform}>
                  <div className={styles._gs2logininput}>
                    <span>Enter Your Email</span>
                    <input
                      type="email"
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      placeholder="shalomtaiwo@example.com"
                      id="signupEmail"
                      required
                    />
                  </div>
                  <div className={styles._gs2logininput}>
                    <span>Username</span>
                    <input
                      type="text"
                      onChange={(e) => setNewUserName(e.target.value)}
                      pattern="[A-Za-z_-]{1,32}"
                      placeholder="meisieshalom"
                      required
                      id="signupUserName"
                    />
                  </div>
                  <div className={styles._gs2logininput}>
                    <span>First Name</span>
                    <input
                      type="text"
                      required
                      placeholder="Shalom"
                      onChange={(e) => setNewUserFirstName(e.target.value)}
                      id="signupFirstName"
                    />
                  </div>
                  <div className={styles._gs2logininput}>
                    <span>Last Name</span>
                    <input
                      type="text"
                      required
                      placeholder="Taiwo"
                      onChange={(e) => setNewUserLastName(e.target.value)}
                      id="signupLastName"
                    />
                  </div>
                  <div className={styles._gs2logininput}>
                    <span>Create a password</span>
                    <PasswordMask
                      type="password"
                      required
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      value={newUserPassword}
                      title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                      id="signupCreatePassword"
                    />
                  </div>
                  <div className={styles._gs2logininput}>
                    <span>Confirm password</span>
                    <PasswordMask
                      type="password"
                      required
                      value={newUserConfirmPassword}
                      onChange={(e) => setNewUserConfirmPassword(e.target.value)}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                      id="signupConfirmPassword"
                    />
                    <span className={styles._gs2signupvalidate}>
                      {isSamePassword === false ? 'Passwords must be the same' : ''}
                    </span>
                  </div>
                  {!isMobile && (
                    <div className={styles._gs2logincheck}>
                      <div className={styles._gs2loginsignin} signup-theme={context.theme}>
                        <a href="#/" className={styles._gsloginforgot} onClick={handleLoginAccount}>
                          Log in instead?
                        </a>
                      </div>
                    </div>
                  )}
                  <div className={styles._gs2logincontinue}>
                    <LoadingButton size="small" type="submit" loading={authLogin.isLoading} variant="contained">
                      Create Account
                    </LoadingButton>
                  </div>
                  {isMobile && (
                    <div className={styles._gs2logincheck}>
                      <div className={styles._gs2loginsignin} signup-theme={context.theme}>
                        <a href="#/" className={styles._gsloginforgot} onClick={handlelogin}>
                          Log in instead?
                        </a>
                      </div>
                    </div>
                  )}
                  {/* <div className={styles._gs2sociallogincol}>
                  <p>Alternatively, you can sign up with:</p>
                  <div className={styles._gs2sociallogins}>
                  <button type="button" className={styles._google} onClick={handleGoogleAuth}>
                    <img src={google} alt="google authentication" />
                  </button>
                  <button type="button" className={styles._facebook} onClick={handleFacebookAuth}>
                    <img src={facebook} alt="facebook authentication" />
                  </button>
                  <button type="button" className={styles._apple} onClick={handleLinkedInAuth}>
                    <img src={apple} alt="apple authentication" />
                  </button>
                </div>
                </div> */}
                </form>
              </div>
            </div>
          )}
          {isTabletorMobile && (
            <div className={styles._gs2logincol2}>
              <div className={styles._sbmodalCol1}>
                <div className={styles._sbmodalHeaderCol1}>
                  <div className={styles._sbmodalTitle}>
                    <img src={medal} alt="medal" />
                    <h2>Upgrade to premium</h2>
                  </div>
                </div>
                <div className={styles._sbmodalCol1Body}>
                  <div className={styles._sbmodalText}>
                    <p>You can get a lot more out of Speak Better by upgrading to premium. Get all features:</p>
                  </div>
                  <div className={styles._sbmodalList}>
                    <div>
                      <img src={check} alt="check" className={styles._sbListIcon} />
                      <p>Unlimited audio length</p>
                    </div>
                    <div>
                      <img src={check} alt="check" className={styles._sbListIcon} />
                      <p>Access to transcription history</p>
                    </div>
                    <div>
                      <img src={check} alt="check" className={styles._sbListIcon} />
                      <p>Variety of AI bot</p>
                    </div>
                    <div>
                      <img src={check} alt="check" />
                      <p>Grammer corrections</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Toaster />
      </div>
    </Dialog>
  );
};

Checkout.propTypes = {
  open: PropTypes.bool,
  handleClosePremium: PropTypes.func,
  handleBack: PropTypes.func,
  Transition: PropTypes.object,
  duration: PropTypes.node,
};

export default Checkout;