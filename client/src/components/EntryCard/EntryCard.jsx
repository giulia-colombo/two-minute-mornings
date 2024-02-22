import Card from 'react-bootstrap/Card';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import { format } from 'date-fns';

function EntryCard({ entry }) {
  const { focusPrompt, gratefulPrompt, letGoPrompt, createdAt } = entry;
  const { user } = useContext(AuthContext);

  const dateObj = new Date(Date.parse(createdAt));
  const readableDate = format(dateObj, 'EEEE, do MMMM yyyy');

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
      <Card.Footer className="text-muted">by {user.name} </Card.Footer>
    </Card>
  );
}

export default EntryCard;
