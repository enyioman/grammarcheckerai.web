import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import toast, { Toaster } from 'react-hot-toast';
import styles from './step1.module.css';
import Logo from '../../../../assets/signup-logo.png';
import Image1 from '../../../../assets/steponeframeone.png';
import Image2 from '../../../../assets/steponeframetwo.png';

const index = () => {
  const [userEmail, setUserEmail] = useLocalStorage('createEmail', '');
  const error = (message) => toast.error(message);

  let navigate = useNavigate();
  const handleNext = (e) => {
    e.preventDefault();
    if (userEmail === '') {
      error('Invalid Email');
    } else if (userEmail === 'shalom') {
      error('User Already exists!');
    } else {
      navigate('/signup/step-two');
    }
  };
  const isTabletorMobile = useMediaQuery({
    query: '(min-width: 850px)',
  });
  return (
    <div className={styles._gcmainsignup}>
      <div className={styles._gcsignup}>
        <div className={styles._gcsignupcol1}>
          {isTabletorMobile && (
            <div className={styles._gcsignuplogo}>
              <img src={Logo} alt="Grammar Checker Logo" />
            </div>
          )}
          <div className={styles._gcsignupcontent}>
            {isTabletorMobile && (
              <p>
                STEP <span>1</span> OUT OF <span>2</span>
              </p>
            )}
            <h2>Get Started with Gritty Grammar today!</h2>
            <p className={styles._subtitle}>Start your learning journey today, you can skip this process for later.</p>
            <form onSubmit={handleNext} className={styles._gcsignupform}>
              <div className={styles._gcsignupinput}>
                <span>Enter Your Email</span>
                <input
                  type="email"
                  onChange={(e) => setUserEmail(e.target.value)}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  placeholder="shalommeisie@example.com"
                  id="signupEmail"
                  required
                />
                <span className={styles._gcsignupvalidate}></span>
              </div>
              <div className={styles._gcsignupcontinue}>
                <button type="submit">Continue</button>
              </div>
            </form>
          </div>
          <div className={styles._gcsignupfooter}>
            <p>
              By signing up for Grit Grammer, you are also agreeing to our Terms and Conditions.{' '}
              <a href="/terms-of-use">Learn More</a>
            </p>
          </div>
        </div>
        <div className={styles._gcsignupcol2}>
          <div className={styles._gcmainsignupcol2body}>
            <div className={styles._gcmainsignupcol2images}>
              <img src={Image1} alt="column1" />
              <img src={Image2} alt="column1" />
            </div>
            {isTabletorMobile && (
              <div className={styles._gcmainsignupcol2content}>
                <h3>Adaptive learning & Improvements</h3>
                <p>
                  Our App gets to know you better as you use it and provides more personalised recommendations for
                  improvements.
                </p>
              </div>
            )}
          </div>
          <div className={styles._gcmainsignupcol2footer}>
            <div className={styles._gcsignupslider}>
              <div className={styles._dots}>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default index;
