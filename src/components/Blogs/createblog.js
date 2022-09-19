import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import background from '../../assets/images/blog/blog.jpg'

const createblog = () => {
  const myStyle = {
    backgroundImage: `url(${background})`,
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height:'100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  const titleStyle = {
    backgroundColor: '#0d6efd',
    color: 'white',
    textAlign:'center'
  }

  return (
    <div style={myStyle}>
        <Card style={{ width: '30rem' }}>
  <Card.Header style={titleStyle}><h4>Publish a Blog</h4></Card.Header>
  <Card.Body>
  <Form>
  <Form.Group className="mb-3" controlId="formBasicTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Title" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows={5} />
  </Form.Group>
  <div className="d-grid gap-2">
  <Button variant="outline-primary" size="md" type="submit">Publish</Button>{' '}
  </div>
</Form>
  </Card.Body>
</Card>
    </div>
  )
}

export default createblog