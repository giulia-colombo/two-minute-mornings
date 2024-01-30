import SingleMetric from '../../components/SingleMetric/SingleMetric';

function StatsPage() {
  return (
    <div className="container">
      <SingleMetric
        metricName={'Your month with the most entries ever'}
        metricValue={'January 2022'}
      ></SingleMetric>
      <SingleMetric
        metricName={'Total days you journaled'}
        metricValue={'240'}
      ></SingleMetric>
      <SingleMetric
        metricName={'Your longest prompt on average'}
        metricValue={"Today I'm grateful for..."}
      ></SingleMetric>
    </div>
  );
}

export default StatsPage;
