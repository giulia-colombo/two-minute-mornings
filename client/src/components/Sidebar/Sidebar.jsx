import Nav from 'react-bootstrap/Nav';

const Sidebar = () => {
  return (
    <Nav className="sidebar" variant="tabs ">
      <Nav.Item>
        <Nav.Link href="/diary">Your diary</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href="/today">Today</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/stats">Your stats</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
