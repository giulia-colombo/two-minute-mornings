import Container from 'react-bootstrap/esm/Container';

const SingleMetric = ({ metricName, metricValue }) => {
  return (
    <Container>
      <h4 className="my-2 py-2">{metricName}</h4>
      <p className="my-2 py-2 text-center "> {metricValue}</p>
    </Container>
  );
};

export default SingleMetric;
