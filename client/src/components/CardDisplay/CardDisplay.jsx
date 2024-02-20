import Card from 'react-bootstrap/Card';

function CardDisplay({ content, error }) {
  return (
    <>
      {content && (
        <Card className="my-4">
          <Card.Body>{content}</Card.Body>
        </Card>
      )}

      {error && <p>{error}</p>}
    </>
  );
}

export default CardDisplay;
