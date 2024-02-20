import { useState } from 'react';
import entryService from '../../services/entry.service';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';

const PromptInput = () => {
  // Setting up state variables and setter functions
  const [focusPrompt, setFocusPrompt] = useState('');
  const [gratefulPrompt, setGratefulPrompt] = useState('');
  const [letGoPrompt, setLetGoPrompt] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Setting up handler functions for changes in the `textarea` inputs
  const handleFocusPrompt = e => setFocusPrompt(e.target.value);
  const handleGratefulPrompt = e => setGratefulPrompt(e.target.value);
  const handleLetGoPrompt = e => setLetGoPrompt(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    setError(null);
    setSuccessMessage(null);

    const newEntry = {
      focusPrompt,
      gratefulPrompt,
      letGoPrompt,
    };

    try {
      const response = await entryService.createOne(newEntry);
      console.log('Saved entry:', response);
      setSuccessMessage('Entry saved successfully!');

      //reset the state
      setFocusPrompt('');
      setGratefulPrompt('');
      setLetGoPrompt('');
    } catch (err) {
      console.log('Error saving the entry: ', err);
      setError('Failed to save the entry. Please try again.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2 py-3" controlId="focusPrompt">
          <Form.Label>Today I will focus on:</Form.Label>
          <Form.Control
            as="textarea"
            name="focusPrompt"
            value={focusPrompt} //the value attribute connects the input to the state
            onChange={handleFocusPrompt}
            autoFocus
            placeholder="Your thoughts here..."
          />
        </Form.Group>

        <Form.Group className="my-2 py-3" controlId="gratefulPrompt">
          <Form.Label>Today I am grateful for:</Form.Label>
          <Form.Control
            as="textarea"
            name="focusPrompt"
            value={gratefulPrompt} //the value attribute connects the input to the state
            onChange={handleGratefulPrompt}
            placeholder="Your thoughts here..."
          />
        </Form.Group>

        <Form.Group className="my-2 py-3" controlId="letGoPrompt">
          <Form.Label>Today I let go of:</Form.Label>
          <Form.Control
            as="textarea"
            name="letGoPrompt"
            value={letGoPrompt} //the value attribute connects the input to the state
            onChange={handleLetGoPrompt}
            placeholder="Your thoughts here..."
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save your entry
        </Button>
      </Form>

      {successMessage && <div className="successMessage">{successMessage}</div>}

      {error && <div className="errorMessage">{error}</div>}
    </Container>
  );
};

export default PromptInput;
