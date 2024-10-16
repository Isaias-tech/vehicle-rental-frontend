import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';
import ContactUs from '../../components/ui/ContactUs';
import { getUserProfile } from '../../api/userAccount.api';

export const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get('accessToken');
      if (token) {
        try {
          await getUserProfile();
          navigate('/home');
        } catch (error) {
          console.error('Invalid token, staying on landing page');
        }
      }
    };

    checkToken();
  }, [navigate]);

  return (
    <>
      <Navbar>
        <a href="#home-section" className="btn btn-ghost">
          Home
        </a>
        <a href="#about-section" className="btn btn-ghost">
          About
        </a>
        <a href="#contact-section" className="btn btn-ghost">
          Contact
        </a>
        <Link to="/register" className="btn btn-outline btn-neutral text-white">
          Register
        </Link>
        <Link to="/login" className="btn btn-neutral">
          Login
        </Link>
      </Navbar>
      <main className="w-full flex flex-col justify-center items-center scroll-smooth">
        <section
          id="home-section"
          className="w-full h-screen flex flex-col justify-center items-center"
        >
          <h1 className="text-4xl mb-8">Welcome to AI Vehicle Rental</h1>
        </section>
        <section
          id="about-section"
          className="w-full h-screen flex flex-col justify-center items-center"
        >
          <h2 className="text-3xl mb-8">About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada, libero nec malesuada tincidunt, nunc elit ultricies
          </p>
        </section>
        <ContactUs />
      </main>
      <Footer />
    </>
  );
};
