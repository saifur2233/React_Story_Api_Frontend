import React, { useContext, useEffect, useState } from 'react';
const AuthContext = React.createContext();
const axios = require('axios').default;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(
      'http://localhost:3001/api/v1/verifyuser',
      { withCredentials: true }
    );

    if (response.data) setUser(response.data);
    else setUser('');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const login = async (email, password) => {
    await axios
      .post(
        'http://localhost:3001/api/v1/signin',
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setUser(response.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        setUser(null);
        setLoggedIn(false);
      });
  };

  const registration = async (name, email, password, phoneNumber) => {
    await axios({
      method: 'post',
      url: 'http://localhost:3001/api/v1/signup',
      data: {
        name: name,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      },
      withCredentials: true,
    })
      .then((response) => {
        setUser(response.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        setUser(null);
        setLoggedIn(false);
      });
  };

  const logout = async () => {
    await axios
      .post('http://localhost:3001/api/v1/signout', {
        withCredentials: true,
      })
      .then(() => {
        setUser(null);
      })
      .catch((err) => {});
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, login, logout, registration }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
