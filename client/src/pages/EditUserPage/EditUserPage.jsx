import { useContext } from 'react';
import GenericForm from '../../components/GenericForm/GenericForm';
import { AuthContext } from '../../context/auth.context';

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
      console.error(err);
    }
  };

  const updateUsernameProps = {
    handleSubmit: updateUsername,
    label: 'Type your new username here',
    type: 'text',
    name: 'username',
    placeholder: 'Your new username here',
    successMessageTemplate: 'successfully saved email!',
    errorMessageTemplate: 'failed to save email!',
    initialFormData: user.name,
  };

  const confirmEmailProps = {
    handleSubmit: updateUsername,
    label: 'Confirm your new email here',
    type: 'text',
    name: 'username',
    placeholder: 'Your new username here',
    successMessageTemplate: 'successfully saved email!',
    errorMessageTemplate: 'failed to save email!',
    initialFormData: user.email,
  };

  return (
    <>
      <div>
        <h4>Edit username</h4>
        <GenericForm {...updateUsernameProps}></GenericForm>
      </div>

      <div className="my-3">
        <h4>Receive password reset link</h4>
        <GenericForm {...confirmEmailProps}></GenericForm>
      </div>
    </>
  );
};

export default EditUserPage;
