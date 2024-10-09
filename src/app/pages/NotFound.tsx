import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-6xl font-bold text-red-600 mb-4">404</h2>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button className="btn btn-neutral" onClick={goToHome}>
        Return to Home
      </button>
    </div>
  );
};
