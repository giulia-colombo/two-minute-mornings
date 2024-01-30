import './Navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function NavigationBar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  // return (
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Two Minute Mornings</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>

            {isLoggedIn && (
              <Container>
                <Row>
                  {' '}
                  <Col>
                    {' '}
                    <Button onClick={logOutUser}>Logout </Button>
                  </Col>
                  <Col>
                    {' '}
                    <Nav.Link href="/profile">Profile</Nav.Link>
                  </Col>
                </Row>
              </Container>
            )}

            {isLoggedIn && (
              <Container>
                <Row>
                  <Col>
                    <Image
                      src="https://picsum.photos/id/402/200/300"
                      rounded
                    ></Image>
                  </Col>
                  <Col>
                    <p>Hello, {user && user.name}! 🙂</p>
                  </Col>
                </Row>
              </Container>
            )}

            {!isLoggedIn && (
              <Container>
                <Nav.Link href="/signup">Signup</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Container>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  //   <nav className="navbar">
  //     <Link to="/">
  //       <button>Home</button>
  //     </Link>

  //     {isLoggedIn && (
  //       <>
  //         <button onClick={logOutUser}>Logout</button>

  //         <Link to="/profile">
  //           <button>Profile</button>
  //           <img
  //             src="https://picsum.photos/id/402/200/300"
  //             style={{ width: 50, height: 50, borderRadius: 25 }}
  //             alt="profile"
  //           />
  //         </Link>

  //         <span>{user && user.name}</span>
  //       </>
  //     )}

  //     {!isLoggedIn && (
  //       <>
  //         <Link to="/signup">
  //           {' '}
  //           <button>Sign Up</button>{' '}
  //         </Link>
  //         <Link to="/login">
  //           {' '}
  //           <button>Login</button>{' '}
  //         </Link>
  //       </>
  //     )}
  //   </nav>
  // );
}

export default NavigationBar;
