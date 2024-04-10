import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GenericForm from '../../components/GenericForm/GenericForm';
import authService from '../../services/auth.service';

const PswResetPage = () => {
  //TO DO:
  // 1. Parse token from URL
  const { token } = useParams();
  console.log('token from url: ', token);
  const [tokenStatus, setTokenStatus] = useState('validating');
  // 2. Make API call to a backend endpoint that takes the token and checks its validity
  useEffect(() => {
    const validateToken = async () => {
      try {
        // 4. If the token has been validated, show password reset form

        await authService.validatePswResetToken(token);
        setTokenStatus('valid');
      } catch (err) {
        console.error('Could not validate password reset token: ', err);
        setTokenStatus('invalid');
      }
    };

    validateToken();
  });

  // 5. If the token is not valid, show a message warning the token is not valid anymore and to restart the operation.
  const submitNewPsw = newPsw => {
    try {
      console.log(newPsw);
      authService.sumbitNewPsw(newPsw);
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
    <div>
      {tokenStatus === 'validating' && <p>Validating token...</p>}

      {tokenStatus === 'invalid' && (
        <p>
          Token has expired or is invalid. Please request a new password reset.
        </p>
      )}

      {tokenStatus === 'valid' && (
        <>
          <h4>Update your password</h4>
          <GenericForm {...pswResetFormProps}></GenericForm>
        </>
      )}
    </div>
  );
};

export default PswResetPage;
