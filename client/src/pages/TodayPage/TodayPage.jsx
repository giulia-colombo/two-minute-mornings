import PromptInput from '../../components/PromptInput/PromptInput';
import { format } from 'date-fns';

function TodayPage() {
  const today = format(new Date(), 'PPPP');

  return (
    <div>
      <h5> 📅 Today is {today}</h5>
      <PromptInput />
    </div>
  );
}

export default TodayPage;
