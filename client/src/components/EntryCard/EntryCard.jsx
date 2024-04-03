import Card from 'react-bootstrap/Card';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import { format } from 'date-fns';
import Button from 'react-bootstrap/Button';
import EditEntryForm from '../EditEntryForm/EditEntryForm';

function EntryCard({
  entry,
  toggleEditingEntryId,
  editingEntryId,
  onDelete,
  handleEditSubmit,
  handleEditCancel,
}) {
  const { focusPrompt, gratefulPrompt, letGoPrompt, createdAt } = entry;
  const { user } = useContext(AuthContext);
  console.log('CURRENT USER: ', user);

  const dateObj = new Date(Date.parse(createdAt));
  const readableDate = format(dateObj, 'EEEE, do MMMM yyyy');

  const confirmAndDeleteEntry = () => {
    if (
      window.confirm(
        'Are you sure you want to delete this entry? This action is irreversible.'
      )
    ) {
      onDelete(entry._id);
    }
  };

  if (editingEntryId === entry._id) {
    return (
      <EditEntryForm
        entry={entry}
        toggleEditingEntryId={toggleEditingEntryId}
        handleEditSubmit={handleEditSubmit}
        handleEditCancel={handleEditCancel}
      ></EditEntryForm>
    );
  }

  return (
    <Card style={{ width: '18rem' }} className="m-3">
      <Card.Body>
        <Card.Title>{readableDate}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Today I will focus on:
        </Card.Subtitle>
        <Card.Text className="text-center">{focusPrompt}</Card.Text>

        <Card.Subtitle className="mb-2 text-muted">
          Today I am grateful for:
        </Card.Subtitle>
        <Card.Text className="text-center">{gratefulPrompt}</Card.Text>

        <Card.Subtitle className="mb-2 text-muted">
          Today I will let go of:
        </Card.Subtitle>
        <Card.Text className="text-center">{letGoPrompt}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">by {user.payload.name} </Card.Footer>

      <div className="my-3">
        <Button
          className="me-1"
          onClick={() => {
            toggleEditingEntryId(entry._id);
          }}
        >
          Edit{' '}
        </Button>

        <Button
          className="ms-1"
          variant="danger"
          onClick={() => confirmAndDeleteEntry(entry._id)}
        >
          Delete{' '}
        </Button>
      </div>
    </Card>
  );
}

export default EntryCard;
