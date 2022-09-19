import React from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import contactImg from '../../assets/images/contact/bgcontact1.png'

const contact = () => {
  return (
    <div>
        <Container>
            <div className='row p-5'>
                <div className='col-md-6'>
                <img src={contactImg} alt='contact' width='100%' height='400px'></img>
                </div>
                <div className='col-md-1'></div>
                <div className='col-md-5'>
                    <h2>We Would Love To Hear From You.</h2>
                    <p>Fill the form and submit for contact with us.</p>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>Full Name</Form.Label>
                     <Form.Control type="text" placeholder="John" />
                     </Form.Group>
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control type="email" placeholder="name@example.com" />
                     </Form.Group>
                     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                     <Form.Label>Your Comment</Form.Label>
                     <Form.Control as="textarea" rows={3} />
                     </Form.Group>
                     <div className="d-grid gap-2">
                      <Button variant="outline-info" size="md" type="submit">Send Message</Button>{' '}
                     </div>
                     </Form>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default contact