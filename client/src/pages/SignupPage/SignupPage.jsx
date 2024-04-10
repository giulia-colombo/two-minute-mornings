import './SignupPage.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import Button from 'react-bootstrap/esm/Button';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleName = e => setName(e.target.value);

  const handleSignupSubmit = e => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then(response => {
        // If the POST request is successful redirect to the login page
        navigate('/login');
      })
      .catch(error => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage container">
      <h1>Sign Up</h1>
      <div>
        <form
          onSubmit={handleSignupSubmit}
          className="my-3 d-flex flex-column align-items-center justify-content-center"
        >
          <div className="my-3">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </div>

          <div className="my-3">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>

          <div className="my-3">
            <label>Name:</label>
            <input type="text" name="name" value={name} onChange={handleName} />
          </div>

          <Button type="submit" variant="primary" className="my-2">
            Sign up
          </Button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className="d-flex flex-column align-items-center my-3">
        <p>Already have an account?</p>
        <Link to={'/login'}> Login</Link>
      </div>
    </div>
  );
}

export default SignupPage;
