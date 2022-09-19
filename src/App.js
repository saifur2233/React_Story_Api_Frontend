import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/navbar';
import Home from './components/Home/home';
import Contact from './components/Contact/contact';
import Error from './components/Error/error';
import About from './components/About/about';
import AllBlogs from './components/Blogs/allBlogs';
import CreateBlog from './components/Blogs/createblog';
import SignIn from './components/Authentication/signin';
import SignUp from './components/Authentication/signup';
import SignOut from './components/Authentication/signout';
import Profile from './components/Authentication/profile';
import ViewFullBlog from './components/Blogs/viewFullBlog';
import Footer from './components/Footer/footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Authentication/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/post" element={<CreateBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/error" element={<Error />} />
          <Route path="/blog/:blogId" element={<ViewFullBlog />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
