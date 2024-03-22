import GenericForm from '../../components/GenericForm/GenericForm';
import authService from '../../services/auth.service';
import { useParams } from 'react-router-dom';

const PswResetPage = () => {
  //TO DO:
  // 1. Parse token from URL
  const { parsedToken } = useParams();
  // 2. Make API call to a backend endpoint that takes the token and checks its validity
  try {
    // 4. If the token has been validated, show password reset form
    authService.validatePswResetToken(parsedToken);
  } catch (err) {
    console.error('Could not validate password reset token: ', err);
  }

  // 5. If the token is not valid, show a message warning the token is not valid anymore and to restart the operation.
  const submitNewPsw = newPsw => {
    try {
      console.log(newPsw);
    } catch (err) {
      console.error('Error updating password.');
    }
  };

  const pswResetFormProps = {
    handleSubmit: submitNewPsw,
    type: 'password',
    name: 'password',
    placeholder: '******',
    formText: 'Type your new password below. Click submit to confirm.',
    successMessageTemplate: 'Password updated successfully.',
    errorMessageTemplate: 'Failed to update password.',
  };

  return (
    <>
      <h4>Update your password</h4>

      <GenericForm {...pswResetFormProps}></GenericForm>
    </>
  );
};

export default PswResetPage;
