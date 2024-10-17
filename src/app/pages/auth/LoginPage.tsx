import { useEffect } from 'react';
import LoginForm from '../../../components/ui/LoginForm';
import { getUser } from '../../../api/UserAccount.api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const LoginPage = () => {
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
        <h2 className="font-bold text-2xl">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};
