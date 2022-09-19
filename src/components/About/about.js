import React from 'react'
import { Container } from 'react-bootstrap';
import aboutImg from '../../assets/images/about/saifur.jpg'
import * as Icon from 'react-bootstrap-icons';
const about = () => {
  return (
    <div>
        <Container>
            <div className='row'>
                <div className='col-md-5 p-5'>
                    <img className="w-100" src={aboutImg} alt='aboutimage' width='300px' height='400px'></img>
                </div>
                <div className='col-md-7 p-5'>
                    <h1 style={{color:'royalblue'}}>Convinced yet? Let's make something great together.</h1>
                    <div className='row mt-4'>
                        <div className='col-md-2'>
                        <Icon.GeoAlt color="royalblue" size={25} />
                        </div>
                        <div className='col-md-10'><h5>Address</h5></div>
                        <div className='col-md-2'>
                        </div>
                        <div className='col-md-10'><p>Moonshine St. 14/05 Light City, London, United Kingdom</p></div>
                    </div>
                    <div className='row'>
                        <div className='col-md-2'>
                        <Icon.TelephoneForward color="royalblue" size={25} />
                        </div>
                        <div className='col-md-10'><h5>Phone</h5></div>
                        <div className='col-md-2'>
                        </div>
                        <div className='col-md-10'>
                            <p>+8801309080748, +8801838082983</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-2'>
                        <Icon.Envelope color="royalblue" size={25} />
                        </div>
                        <div className='col-md-10'><h5>Eamil</h5></div>
                        <div className='col-md-2'>
                        </div>
                        <div className='col-md-10'>
                            <p>saifur.rahman@cefalo.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default about