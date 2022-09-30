import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
const axios = require('axios').default;
import { useAuth } from '../Authentication/AuthContext';

const viewFullBlog = () => {
  const mainDiv = {
    backgroundColor: 'lightGray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px',
  };

  const titleStyle = {
    backgroundColor: '#0d6efd',
    color: 'white',
    textAlign: 'center',
  };

  const auth = useAuth();
  const navigate = useNavigate();

  const { blogId } = useParams();
  const [blog, setBlog] = useState('');
  const [err, setError] = useState('');

  const [updateShow, setUpdateShow] = useState(false);
  const [updated, setUpdated] = useState(false);
  const handleUpdateClose = () => setUpdateShow(false);
  const handleUpdateShow = () => setUpdateShow(true);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogDescription, setBlogDescription] = useState('');

  const [deleteshow, setDeleteShow] = useState(false);

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);

  const viewBlogData = async () => {
    await axios
      .get(`http://localhost:3001/api/v1/stories/search/${blogId}`)
      .then(function (response) {
        setBlog(response.data);
        setBlogTitle(response.data.title);
        setBlogDescription(response.data.description);
      })
      .catch(function (error) {
        setError(error.message);
      });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    await axios({
      method: 'put',
      url: 'http://localhost:3001/api/v1/stories/' + blogId,
      data: {
        title: blogTitle,
        description: blogDescription,
      },
      withCredentials: true,
    })
      .then(function () {
        alert('Successfully Blog Info updated');
        setUpdateShow(false);
        const blogid = blogId;
        setUpdated(!updated);
        navigate(`/blog/${blogid}`);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const handleBlogDelete = async (e) => {
    e.preventDefault();

    await axios({
      method: 'delete',
      url: 'http://localhost:3001/api/v1/stories/' + blogId,
      withCredentials: true,
    })
      .then(function () {
        navigate('/blogs');
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  useEffect(() => {
    viewBlogData();
  }, [blogId, updated]);

  return (
    <div style={mainDiv}>
      {err && <h2>{err}</h2>}
      <Card border="warning" style={{ width: '50rem' }}>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Author: {blog.authorEmail}
          </Card.Subtitle>
          <Card.Text>{blog.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated {blog.createdAt}</small>

          {auth.user == blog.authorEmail && (
            <Button
              variant="primary"
              onClick={handleUpdateShow}
              style={{ float: 'right' }}
            >
              Update
            </Button>
          )}

          {auth.user == blog.authorEmail && (
            <Button
              variant="danger"
              style={{ float: 'right', marginRight: '5px' }}
              onClick={handleDeleteShow}
            >
              Delete
            </Button>
          )}
        </Card.Footer>
      </Card>
      <div>
        <Modal show={updateShow} onHide={handleUpdateClose}>
          <Modal.Header closeButton style={titleStyle}>
            <Modal.Title>Update Blog Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Blog Title"
                  id="blogTitle"
                  onChange={(e) => setBlogTitle(e.target.value)}
                  value={blogTitle}
                  autoFocus
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Blog Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Blog Description"
                  id="blogDescription"
                  onChange={(e) => setBlogDescription(e.target.value)}
                  value={blogDescription}
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
      <div>
        <Modal show={deleteshow} onHide={handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>Do you want to Delete the blog?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              style={{ float: 'right' }}
              variant="success"
              className="me-3"
              onClick={handleDeleteClose}
            >
              No
            </Button>
            <Button
              style={{ float: 'right' }}
              variant="danger"
              className="me-3"
              onClick={handleBlogDelete}
            >
              Yes
            </Button>
          </Modal.Body>
        </Modal>
      </div>
      <div id="modal"></div>
    </div>
  );
};

export default viewFullBlog;
