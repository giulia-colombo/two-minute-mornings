import { useContext } from 'react';
import GenericForm from '../../components/GenericForm/GenericForm';
import { AuthContext } from '../../context/auth.context';
import Container from 'react-bootstrap/esm/Container';
import authService from '../../services/auth.service';

//TO DO
// COMPONENTS:
// 1. form for username update
// 2. field + button to initiate psw reset
// 3. upload field for profile pciture

const EditUserPage = () => {
  const { user } = useContext(AuthContext);

  const updateUsername = async formData => {
    try {
      console.log(formData);
    } catch (err) {
      console.error('Error while attempting to initiate password reset: ', err);
    }
  };

  const confirmEmail = async formData => {
    try {
      await authService.api.post(`/auth/password-reset/initiate`, {
        email: formData,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateUsernameProps = {
    handleSubmit: updateUsername,
    type: 'text',
    name: 'username',
    placeholder: 'Your new username',
    formText: 'Type your new username below. Click submit to confirm.',
    successMessageTemplate: 'Username submitted successfully.',
    errorMessageTemplate: 'Failed to submit username.',
    initialFormData: user.name,
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
    initialFormData: user.email,
  };

  return (
    <Container>
      <p className="lead">
        Here you can update your profile data: change your username or request a
        password reset.
      </p>
      <div className="bg-primary bg-opacity-10 border rounded-4 border-2 my-3 p-3">
        <h5>Edit username</h5>
        <GenericForm {...updateUsernameProps}></GenericForm>
      </div>
      <div className="bg-primary bg-opacity-10 border rounded-4 border-2 my-3 p-3">
        <h5>Receive password reset link</h5>
        <GenericForm {...confirmEmailProps}></GenericForm>
      </div>
    </Container>
  );
};

export default EditUserPage;
