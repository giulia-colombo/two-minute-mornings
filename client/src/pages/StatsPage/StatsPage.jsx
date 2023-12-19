import { useState, useEffect } from 'react';
import SingleMetric from '../../components/SingleMetric/SingleMetric';
import entryService from '../../services/entry.service';

function StatsPage() {
  const [metric, setMetric] = useState(null);
  const [error, setError] = useState(null);

  const getSingleMetric = async () => {
    try {
      const response = await entryService.getStats();
      setMetric(response);
    } catch (err) {
      console.log('Error displaying the metric: ', err);
      setError('Failed to display the metric. Please try again later.');
    }
  };

  useEffect(() => {
    getSingleMetric();
  }, []);

  return (
    <>
      <div className="errorMessage">{error && error.message}</div>

      <div>
        <h1>Stats page</h1>

        <SingleMetric
          metricValue={metric && metric.monthWithMostEntriesEver}
          metricName="Month with Most Entries Ever"
        />
        <SingleMetric
          metricValue={metric && metric.totalDaysJournaled}
          metricName="Total Days Journaled"
        />
        <SingleMetric
          metricValue={metric && metric.longestPromptOnAvg}
          metricName="Longest Prompt on Average"
        />
      </div>
    </>
  );
}

export default StatsPage;
