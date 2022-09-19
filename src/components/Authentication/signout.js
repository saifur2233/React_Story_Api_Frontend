import Cookies from 'js-cookie';
const signout = () => {
  Cookies.remove('macaron');
  window.location.href = '/';
  return;
};

export default signout;
