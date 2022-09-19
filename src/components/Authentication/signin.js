import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from './AuthContext';

import background from '../../assets/images/login/login3.jpg';
const signin = () => {
  const myStyle = {
    backgroundImage: `url(${background})`,
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
  };
  const titleStyle = {
    backgroundColor: '#0d6efd',
    color: 'white',
    textAlign: 'center',
  };
  const footerStyle = {
    textAlign: 'center',
    color: '#999999',
  };

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(user, pwd);
    try {
      auth.login(user, pwd);
      navigate('/');
    } catch (error) {
      setErrMsg(error);
    }
  };

  return (
    <>
      <div style={myStyle}>
        <Card style={{ width: '30rem' }}>
          <Card.Header style={titleStyle}>
            <h4>Sign In</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  id="user"
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  id="pwd"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="outline-info" size="md" type="submit">
                  Submit
                </Button>{' '}
              </div>

              {errMsg && (
                <div className="form-group mt-2">
                  <div className="alert alert-danger text-center" role="alert">
                    {'Unauthorized Access'}
                  </div>
                </div>
              )}
            </Form>
          </Card.Body>
          <Card.Footer style={footerStyle}>
            <p>
              Don't have a account?
              <Card.Link href="/signup"> Sign Up</Card.Link>
            </p>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default signin;
