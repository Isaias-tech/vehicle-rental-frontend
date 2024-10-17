import RegisterForm from '../../../components/ui/RegisterForm';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { getUser } from '../../../api/userAccount.api';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const checkAccessToken = async () => {
    const token = Cookies.get('access');
    if (token) {
      try {
        await getUser();
        navigate('/home/search');
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    return false;
  };

  useEffect(() => {
    checkAccessToken();
  }, []);

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="font-bold text-2xl">Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
};
