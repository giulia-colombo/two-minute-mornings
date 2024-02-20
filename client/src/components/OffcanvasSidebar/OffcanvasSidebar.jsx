import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffcanvasSidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex justify-content-start">
        <Button
          className="my-2"
          style={{ fontSize: '1.2rem' }}
          variant="light"
          onClick={handleShow}
        >
          Menu
        </Button>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div class="list-group">
            <a
              href="/today"
              class="list-group-item list-group-item-action"
              aria-current="true"
            >
              Today 📅
            </a>
            <a href="/diary" class="list-group-item list-group-item-action">
              Your journal 📔
            </a>
            <a href="/stats" class="list-group-item list-group-item-action">
              Your stats 📈
            </a>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffcanvasSidebar;
