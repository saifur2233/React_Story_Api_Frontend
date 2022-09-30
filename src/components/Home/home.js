import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
const axios = require('axios').default;
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

const ControlledCarousel = () => {
  const backgroundColor = {
    backgroundColor: '#DCDCDC',
    padding: '20px',
  };

  const paginationStyle = {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const navigate = useNavigate();

  const [myblog, setMyBlog] = useState(null);
  const [isLoding, setIsLoding] = useState(true);
  const [error, setError] = useState(null);

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
  useEffect(() => {
    getData();
  }, []);

  const hnadlePagination = async () => {
    console.log('Clicked Pagination');
  };

  return (
    <>
      <div style={backgroundColor}>
        <Container className="py-5">
          {isLoding && <h2>Please wait, Blog is Loading...</h2>}
          {error && <h2>{error}</h2>}

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
                        Last updated {blog.createdAt}
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
          </Row>
          <div style={paginationStyle}>
            <br />
            <Pagination size="lg" onClick={hnadlePagination}>
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>
            </Pagination>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ControlledCarousel;
