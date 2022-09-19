import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import background from '../../assets/images/login/login2.jpg';
import { useAuth } from './AuthContext';

const signup = () => {
  const myStyle = {
    backgroundImage: `url(${background})`,
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '120vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
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
  const cardStyle = {
    width: '30rem',
  };

  const auth = useAuth();
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pwd !== confirmPwd) {
      return setErrMsg("Password don't match!");
    }
    try {
      setErrMsg('');
      await auth.registration(fullname, username, email, pwd);
      navigate('/');
    } catch (error) {
      setErrMsg(error);
    }
  };

  return (
    <>
      <div style={myStyle}>
        <Card style={cardStyle}>
          <Card.Header style={titleStyle}>
            <h4>Sign Up</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Name"
                  id="fullname"
                  autoComplete="off"
                  onChange={(e) => setFullname(e.target.value)}
                  value={fullname}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Username"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your Email"
                  id="email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your Password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  id="confirm_pwd"
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  value={confirmPwd}
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="md" type="submit">
                  Submit
                </Button>{' '}
              </div>
              {errMsg && (
                <div className="form-group mt-2">
                  <div className="alert alert-danger text-center" role="alert">
                    {errMsg}
                  </div>
                </div>
              )}
            </Form>
          </Card.Body>
          <Card.Footer style={footerStyle}>
            <p>
              Already have an account?
              <Card.Link href="/signin"> Sign In</Card.Link>
            </p>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default signup;
