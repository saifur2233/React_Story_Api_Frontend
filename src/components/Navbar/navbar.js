import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const axios = require('axios').default;
import { useAuth } from '../Authentication/AuthContext';

const navbar = () => {
  const navBarStyle = {
    background: `linear-gradient(to bottom, #003366 0%, #0099cc 100%)`,
    color: 'white',
  };

  const titleStyle = {
    backgroundColor: '#0d6efd',
    color: 'white',
    textAlign: 'center',
  };
  const itemColor = { color: 'white' };

  const auth = useAuth();
  const navigate = useNavigate();
  //console.log(myDecodedToken.username);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(title, auth.user, description);
    await axios({
      method: 'post',
      url: 'http://localhost:3001/api/v1/posts/',
      data: {
        title: title,
        username: auth.user,
        description: description,
      },
      withCredentials: true,
    })
      .then(function (response) {
        alert('Successfully blog created');
        handleClose();
        const blogid = response.data.id;
        navigate(`/blog/${blogid}`);

        //window.location.reload();
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  return (
    <div>
      {['md'].map((expand) => (
        <Navbar key={expand} style={navBarStyle} expand={expand}>
          <Container>
            <Navbar.Brand onClick={() => navigate('/')} style={itemColor}>
              <b>Blog Zone</b>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link
                    onClick={() => navigate('/')}
                    style={{ marginLeft: '5rem', color: 'white' }}
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => navigate('/blogs')}
                    style={itemColor}
                  >
                    Blogs
                  </Nav.Link>
                  {auth.user && (
                    <Nav.Link onClick={handleShow} style={itemColor}>
                      Create Blog
                    </Nav.Link>
                  )}
                  <Nav.Link
                    onClick={() => navigate('/about')}
                    style={itemColor}
                  >
                    About Us
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => navigate('/contact')}
                    style={itemColor}
                  >
                    Contact
                  </Nav.Link>
                  {auth.user && (
                    <Nav.Link
                      onClick={() => navigate('/profile')}
                      style={itemColor}
                    >
                      {auth.user}
                    </Nav.Link>
                  )}
                  {auth.user ? (
                    <Nav.Link
                      onClick={() => {
                        console.log('logout 1');
                        auth.logout();
                        navigate('/');
                      }}
                      style={itemColor}
                    >
                      Sign Out
                    </Nav.Link>
                  ) : (
                    <Nav.Link
                      onClick={() => navigate('/signin')}
                      style={itemColor}
                    >
                      Sign In
                    </Nav.Link>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton style={titleStyle}>
            <Modal.Title>Publish Your Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Blog Title"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  autoFocus
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  rows={3}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default navbar;
