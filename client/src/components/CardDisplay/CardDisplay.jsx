import Card from 'react-bootstrap/Card';

function CardDisplay({ content, author, error }) {
  return (
    <>
      {content && (
        <Card className="my-4">
          <Card.Body>{content}</Card.Body>

          {author && <Card.Footer className="text-muted">{author}</Card.Footer>}
        </Card>
      )}

      {error && <p>{error}</p>}
    </>
  );
}

export default CardDisplay;
