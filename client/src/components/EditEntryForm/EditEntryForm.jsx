import { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';

const EditEntryForm = ({ entry, handleEditSubmit, handleEditCancel }) => {
  // we receive the prompts that the user has filled in previously, via props.entry. We display the previous prompts in the edit form being shown to the user.
  const [focusPrompt, setFocusPrompt] = useState(entry.focusPrompt);
  const [gratefulPrompt, setGratefulPrompt] = useState(entry.gratefulPrompt);
  const [letGoPrompt, setLetGoPrompt] = useState(entry.letGoPrompt);

  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleFocusPrompt = e => setFocusPrompt(e.target.value);
  const handleGratefulPrompt = e => setGratefulPrompt(e.target.value);
  const handleLetGoPromo = e => setLetGoPrompt(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    handleEditSubmit(entry._id, { focusPrompt, gratefulPrompt, letGoPrompt });
  };

  return (
    <Container className="col-9">
      <Form onSubmit={onSubmit}>
        <Form.Group className="my-2 py-3" controlId="focusPrompt">
          <Form.Label className="fw-bold">Today I will focus on:</Form.Label>
          <Form.Control
            as="textarea"
            name="focusPrompt"
            value={focusPrompt} //the value attribute connects the input to the state
            onChange={handleFocusPrompt}
          />
        </Form.Group>

        <Form.Group className="my-2 py-3" controlId="gratefulPrompt">
          <Form.Label className="fw-bold">Today I am grateful for:</Form.Label>
          <Form.Control
            as="textarea"
            name="gratefulPrompt"
            value={gratefulPrompt} //the value attribute connects the input to the state
            onChange={handleGratefulPrompt}
          />
        </Form.Group>

        <Form.Group className="my-2 py-3" controlId="letGoPrompt">
          <Form.Label className="fw-bold">Today I let go of:</Form.Label>
          <Form.Control
            as="textarea"
            name="letGoPrompt"
            value={letGoPrompt} //the value attribute connects the input to the state
            onChange={handleLetGoPromo}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save your edits
        </Button>

        <Button
          variant="secondary"
          type="button"
          onClick={() => handleEditCancel()}
        >
          Cancel edits
        </Button>
      </Form>

      {successMessage && (
        <div className="successMessage">
          <span> {successMessage}</span>
        </div>
      )}

      {error && (
        <div>
          <span className="errorMessage">{error}</span>
        </div>
      )}
    </Container>
  );
};

export default EditEntryForm;
