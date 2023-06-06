import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import AuthContext from '../../context/AuthContext';

const Header = () => {

const { loading, user } = useContext(AuthContext);
// console.log(user.first_name)

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/" passHref>
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="50" height="50" src="/images/logo.png" alt="AppopoleisJobs" />
            </div>
            <span className="logo1">Appopoleis</span>
            <span className="logo2">Jobs</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          <Link href="/employer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>

          {user ? (
            <div className=" btn dropdown ml-3">
              <a 
                className="btn dropdown-toggle mr-4"
                id = "dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"              
              
              
              > 
              <span>Hi, {user.first_name}</span>{" "} 
              </a>

              <div className='dropdown-menu' aria-labelledby='dropDownMenuButton'>
                <a 
                  href="/employer/jobs"
                  className='dropdown-item'        
                > 
                  My Jobs
                </a>

                <a 
                  href="/me/applied"
                  className='dropdown-item'        
                > 
                  Jobs Applied
                </a>

                <a 
                  href="/me"
                  className='dropdown-item'        
                > 
                  Profile
                </a>

                <a 
                  href="/upload/resume"
                  className='dropdown-item'        
                > 
                  Upload Resume
                </a>

                <a 
                  href="/"
                  className='dropdown-item text-danger'        
                > 
                  Logout
                </a>

              </div>
            </div>

          ): (
            !loading && (
              <a href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </a>

            )
          )}
          

          
        </div>
      </div>
    </div>
  );
}

export default Header;

