const SingleMetric = ({ metricValue, metricName }) => {
  return (
    <div className="SingleMetric">
      <h2>{metricName}</h2>
      <p>The metric is {metricValue}</p>
    </div>
  );
};

export default SingleMetric;
