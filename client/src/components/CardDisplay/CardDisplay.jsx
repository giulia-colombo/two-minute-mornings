import Card from 'react-bootstrap/Card';

function CardDisplay({ cardTitle, content, author, error }) {
  return (
    <>
      {content && (
        <Card className="col-6 my-3 p-3 bg-primary bg-opacity-10 border rounded-4 border-2">
          <Card.Title>{cardTitle}</Card.Title>
          <Card.Body>{content}</Card.Body>

          {author && <Card.Footer className="text-muted">{author}</Card.Footer>}
        </Card>
      )}

      {error && <p>{error}</p>}
    </>
  );
}

export default CardDisplay;
