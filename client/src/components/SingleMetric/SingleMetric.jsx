const SingleMetric = ({ metricName, metricValue }) => {
  return (
    <div className="SingleMetric">
      <h2>{metricName}</h2>
      <p> {metricValue}</p>
    </div>
  );
};

export default SingleMetric;
