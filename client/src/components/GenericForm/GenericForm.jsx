import { useState } from 'react';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';

const GenericForm = ({
  handleSubmit,
  label,
  type,
  name,
  placeholder,
  successMessageTemplate,
  errorMessageTemplate,
  initialFormData,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentErrorMessage, setCurrentErrorMessage] = useState('');
  const [currentSuccessMessage, setCurrentSuccessMessage] = useState('');

  const handleChange = e => setFormData(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();

    try {
      await handleSubmit(formData);
      setCurrentSuccessMessage(successMessageTemplate || 'Success!');
      setFormData('');
      setCurrentErrorMessage('');
    } catch (err) {
      console.error(err);
      setCurrentErrorMessage(errorMessageTemplate || 'An error occurred.');
    }
  };

  return (
    <>
      <div>
        <Form onSubmit={onSubmit}>
          <Form.Group className="my-2 py-3" controlId={name}>
            <Form.Label className="fw-bold">{label}</Form.Label>
            <Form.Control
              type={type}
              name={name}
              value={formData} //the value attribute connects the input to the state
              onChange={handleChange}
              placeholder={placeholder}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      {currentErrorMessage && (
        <div>
          <p className="errorMessage">{currentErrorMessage}</p>
        </div>
      )}
      {currentSuccessMessage && (
        <div>
          <p className="successMessage">{currentSuccessMessage}</p>
        </div>
      )}
    </>
  );
};

export default GenericForm;
