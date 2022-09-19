import React, { useContext, useEffect, useState } from 'react';
const AuthContext = React.createContext();
const axios = require('axios').default;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(
      'http://localhost:3001/api/v1/verifyuser/',
      { withCredentials: true }
    );
    //console.log(response.data);
    if (response.data.myusername) setUser(response.data.myusername);
    else setUser('');
  };
  useEffect(() => {
    fetchData();
  });

  const login = async (username, password) => {
    //console.log(username, password);
    await axios
      .post(
        'http://localhost:3001/api/v1/signin/',
        { username, password },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        //console.log(response.data);
        setUser(response.data.myusername);
        setLoggedIn(true);
      })
      .catch((err) => {
        //console.log(err);
        setUser(null);
        setLoggedIn(false);
      });
  };

  const emptyCookie = async () => {
    console.log('logout 3');
    await axios.post('http://localhost:3001/api/v1/signout/', {
      withCredentials: true,
    });
  };
  const logout = async () => {
    console.log('logout 2');
    emptyCookie();
    console.log('logout 4');
    setUser(null);
  };

  const registration = async (name, username, email, password) => {
    //console.log(username, password);
    await axios
      .post(
        'http://localhost:3001/api/v1/signup/',
        { name, username, email, password },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        //console.log(response.data);
        const currentUser = response.data.myusername;
        setUser({ ...currentUser });
        setLoggedIn(true);
      })
      .catch((err) => {
        //console.log(err);
        setUser(null);
        setLoggedIn(false);
      });
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
