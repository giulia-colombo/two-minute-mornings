import './LoginPage.css';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import authService from '../../services/auth.service';
import GenericForm from '../../components/GenericForm/GenericForm';
import Button from 'react-bootstrap/esm/Button';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleLoginSubmit = e => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then(response => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
      .catch(error => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  const confirmEmail = async formData => {
    try {
      console.log('formData: ', formData);
      await authService.initiatePswReset({
        email: formData,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const confirmEmailProps = {
    handleSubmit: confirmEmail,
    type: 'email',
    name: 'email',
    placeholder: 'Your email address',
    formText:
      'Confirm your email below. If it exists in our database, you will receive a link to reset your password. The link is valid for 24 hours.',
    successMessageTemplate: 'Email address submitted successfully.',
    errorMessageTemplate: 'Failed to submit email address.',
  };

  return (
    <div className="LoginPage container">
      <h1>Login</h1>
      <div className="my-3">
        <form onSubmit={handleLoginSubmit}>
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

          <Button type="submit" variant="primary">
            Login
          </Button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className="my-3">
        <h6>Don't have an account yet?</h6>
        <Link to={'/signup'}> Sign Up</Link>
      </div>

      <div className="my-3">
        <h6>Forgot your password?</h6>
        <GenericForm {...confirmEmailProps}></GenericForm>
      </div>
    </div>
  );
}

export default LoginPage;
