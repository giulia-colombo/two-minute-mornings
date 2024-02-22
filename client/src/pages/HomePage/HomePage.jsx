import './HomePage.css';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

function HomePage() {
  return (
    <div className="d-flex justify-content-center">
      <ListGroup as="ol" className="col-md-8">
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start m-4 bg-primary bg-opacity-10 border rounded-4 border-2"
        >
          <div className="ms-2 me-auto p-3">
            <h5 className="fw-bold m-2">Two Minute Mornings</h5>
            <p>
              Welcome to Two Minute Mornings, inspired by the transformative
              two-minute morning practice highlighted by Neil Pasricha.{' '}
            </p>
            <p>
              This simple yet powerful tool is designed to enhance your daily
              well-being through a focused and reflective journaling experience.
              By dedicating just a few minutes each day to this practice after
              you wake up, you can start your day with clarity, gratitude, and a
              positive mindset.
            </p>
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start m-4 bg-primary bg-opacity-10 border rounded-4 border-2"
        >
          <div className="ms-2 me-auto p-3 justify-text">
            <h5 className="fw-bold m-2">The Power of Journaling </h5>
            <p>
              Research has consistently shown the profound impact that
              journaling can have on both mental and physical health.
            </p>
            <p>
              The act of writing down your thoughts and feelings helps in
              processing emotions, reducing stress, and even improving cognitive
              function. Regular journaling can rewire your brain, allowing you
              to focus on your goals, acknowledge and appreciate what you're
              grateful for, and let go of any negativity that holds you back.
            </p>
            <p>
              It's not just about documenting your day; it's about setting the
              tone for the kind of life you want to lead.
            </p>
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start m-4 bg-primary bg-opacity-10 border rounded-4 border-2"
        >
          <div className="ms-2 me-auto p-3">
            <h5 className="fw-bold m-2">How to Use This App</h5>
            <p>
              Our app is designed to integrate seamlessly into your daily
              routine, encouraging consistency without the pressure of writing
              extensive entries. Each day, you'll receive three simple prompts:
              what you'll focus on, what you're grateful for, and what you'll
              let go of.
            </p>
            <p>
              These prompts are designed to be brief but impactful, ensuring
              that even on your busiest days, you can maintain this positive
              practice. There's no minimum text requirement; the key is regular
              engagement to foster mindfulness and self-improvement.
            </p>
            <p>
              To support your journey, the app will send you a gentle email
              reminder at 8 pm if you haven't had the chance to journal that
              day. This nudge isn't meant to be a chore but a kind invitation to
              take a moment for yourself, to reflect and reset. By making
              journaling a consistent part of your day, you embark on a journey
              of self-discovery and growth.
            </p>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default HomePage;
