import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
const axios = require('axios').default;
import { useAuth } from './AuthContext';

const profile = () => {
  const myStyle = {
    backgroundColor: 'lightGray',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
  };
  const userImg = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
  };
  const imgDiv = {
    width: '150px',
    height: '150px',
    background: `linear-gradient(to bottom, #003366 0%, #0099cc 100%)`,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
  };

  const titleStyle = {
    backgroundColor: '#0d6efd',
    color: 'white',
    textAlign: 'center',
  };

  const auth = useAuth();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateShow, setUpdateShow] = useState(false);
  const handleUpdateClose = () => setUpdateShow(false);
  const handleUpdateShow = () => setUpdateShow(true);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');

  const [userData, setUserData] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // show the user profile data
  const getUserData = async () => {
    axios
      .get('http://localhost:3001/api/v1/users/' + auth.user)
      .then(function (response) {
        setUserData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //user create a post
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios({
      method: 'post',
      url: 'http://localhost:3001/api/v1/posts',
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
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  //update user info
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    await axios({
      method: 'put',
      url: 'http://localhost:3001/api/v1/users/' + auth.user,
      data: {
        name: fullname,
        email: email,
      },
      // headers: {
      //   Authorization: 'Bearer ' + mycookie,
      // },
    })
      .then(function () {
        alert('Successfully User Info updated');
        setUpdateShow(false);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const handleSignout = () => {
    auth.logout();
    navigate('/');
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div style={myStyle}>
        {auth.user ? (
          <Card style={{ width: '35rem' }}>
            <Card.Body>
              <div style={userImg}>
                <div style={imgDiv}>
                  <h1>SR</h1>
                </div>
              </div>
              <h4>Full Name: {userData.name}</h4>
              <h5>Username : {userData.username}</h5>
              <h5>Email: {userData.email}</h5>
              <h5>Profile Created At: {userData.createdAt}</h5>
              <h5>Profile Updated At: {userData.updatedAt}</h5>
            </Card.Body>
            <Card.Footer>
              <Button variant="outline-primary" onClick={handleUpdateShow}>
                Update
              </Button>{' '}
              <Button variant="outline-warning" onClick={handleShow}>
                Create Posts
              </Button>{' '}
              <Button style={{ float: 'right' }} variant="outline-danger">
                Delete
              </Button>{' '}
              <Button
                style={{ float: 'right' }}
                onClick={handleSignout}
                variant="outline-danger"
              >
                Sign Out
              </Button>{' '}
            </Card.Footer>
          </Card>
        ) : (
          <Card style={{ width: '40rem' }}>
            <Card.Body>
              <h1>You Have Not Logged!</h1>
            </Card.Body>
          </Card>
        )}
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

        <div>
          <Modal show={updateShow} onHide={handleUpdateClose}>
            <Modal.Header closeButton style={titleStyle}>
              <Modal.Title>Update Profile Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleUpdateSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Fullname"
                    id="fullname"
                    onChange={(e) => setFullname(e.target.value)}
                    value={fullname}
                    autoFocus
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    autoFocus
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
                <Button variant="danger" onClick={handleUpdateClose}>
                  Close
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default profile;
