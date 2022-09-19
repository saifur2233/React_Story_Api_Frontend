import React from 'react';
import backgroundImg from '../../assets/images/error/404.jpeg';
const error = () => {
  const myStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
  };

  return (
    <div style={myStyle}>
      <div style={{ textAlign: 'center' }}>
        <img src={backgroundImg} width="600px" height="400px" alt=""></img>
        <h1>404 page not found</h1>
      </div>
    </div>
  );
};

export default error;
