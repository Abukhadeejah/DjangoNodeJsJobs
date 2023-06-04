import React, {  useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import AuthContext from '../../context/AuthContext';

const Header = () => {

const { loading, user} = useContext(AuthContext);

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/" legacyBehavior>
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="50" height="50" src="/images/logo.png" alt="AppopoleisJobs" />
            </div>
            <span className="logo1">Appopoleis</span>
            <span className="logo2">Jobs</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          <a href="/employeer/jobs/new" legacyBehavior>
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </a>

          <a href="/login">
            <button className="loginButtonHeader">
              <span>Login</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;

