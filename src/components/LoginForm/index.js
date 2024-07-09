import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [grant_type] = useState('password');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate(); 

  const onChangeUserName = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    navigate('/');
  };

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const client_id = 'scribbler-app';

    const userDetails = {
      grant_type,
      username,
      password,
      client_id,
    };

    const url = 'https://scribbler-demo.syskeysoftlabs.com/api/oauth/token';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        onSubmitSuccess(data.access_token || data.jwt_token);
      } else {
        onSubmitFailure(data.detail || 'Login failed');
      }
    } catch (error) {
      onSubmitFailure('Network error');
    }
  };

  return (
    <div className="bg-con">
      <div className="img-con">
        <img
          src="https://res.cloudinary.com/dtm38igx6/image/upload/v1715935830/logo_nu8o1e.png"
          alt="img"
          className="img-logo"
        />
      </div>
      <form
        className="form-con d-flex flex-column justify-content-around mt-5"
        onSubmit={submitForm}
      >
        <div className="d-flex flex-column mb-4">
          <label htmlFor="username" className="mb-2 w-100">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-100 input-con"
            value={username}
            onChange={onChangeUserName}
          />
        </div>
        <div className="d-flex flex-column mb-4">
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input-con"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          <button type="submit" className="btn btn-primary sign-in">
            Sign In
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
