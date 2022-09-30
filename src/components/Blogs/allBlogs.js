import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const axios = require('axios').default;

const allBlogs = () => {
  const backgroundColor = {
    backgroundColor: '#DCDCDC',
  };

  const navigate = useNavigate();
  const [myblog, setMyBlog] = useState(null);
  const [isLoding, setIsLoding] = useState(true);
  const [error, setError] = useState(null);

  const [searchAuthor, setSearchAuthor] = useState('');

  const getData = async () => {
    await axios
      .get('http://localhost:3001/api/v1/stories')
      .then(function (response) {
        setMyBlog(response.data);
      })
      .catch(function (error) {
        setError(error.message);
      })
      .then(function () {
        setIsLoding(false);
      });
  };

  const searchAuthorBlogs = async (e) => {
    e.preventDefault();

    setMyBlog('');
    await axios
      .get('http://localhost:3001/api/v1/stories/' + searchAuthor)
      .then(function (response) {
        setMyBlog(response.data);
      })
      .catch(function (error) {
        setError(error.message);
      })
      .then(function () {
        setIsLoding(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={backgroundColor}>
      <Container className="py-5">
        {isLoding && <h2>Please wait, Blog is Loading...</h2>}
        {error && <h2>{error}</h2>}

        <div className="row my-4">
          <div className="col-md-12">
            <Form onSubmit={searchAuthorBlogs}>
              <InputGroup size="lg" className="mb-3">
                <Form.Control
                  placeholder="Author Email"
                  type="text"
                  id="searchAuthor"
                  autoComplete="off"
                  onChange={(e) => setSearchAuthor(e.target.value)}
                  value={searchAuthor}
                  required
                />
                <Button type="submit" variant="primary">
                  Search Author
                </Button>
              </InputGroup>
            </Form>
          </div>
        </div>
        <Row xs={1} md={3} className="g-4">
          {myblog &&
            myblog.map((blog) => (
              <Col>
                <Card key={blog.id} border="info" style={{ height: '21rem' }}>
                  <Card.Body>
                    <Card.Title>
                      {blog.title.length < 30
                        ? `${blog.title}`
                        : `${blog.title.substring(0, 28)}`}
                      ...
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <i>Author: {blog.authorEmail}</i>
                    </Card.Subtitle>
                    <Card.Text>
                      {blog.description.length < 235
                        ? `${blog.description}`
                        : `${blog.description.substring(0, 235)}`}
                      .....
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        navigate(`/blog/${blog.id}`);
                      }}
                    >
                      Read More
                    </Button>{' '}
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Created At: {blog.createdAt}
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default allBlogs;
