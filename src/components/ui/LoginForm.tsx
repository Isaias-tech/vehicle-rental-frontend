import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAccount } from '../../types/UserAccount';
import { login } from '../../api/UserAccount.api';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userAccount: Partial<UserAccount> = {
      email: formData.email,
      password: formData.password,
    };

    setIsLoading(true);

    try {
      await login(userAccount);
      setIsLoading(false);
      navigate('/home/search');
    } catch (err) {
      setIsLoading(false);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
      setFormData({
        email: '',
        password: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email:</span>
        </label>
        <input
          type="email"
          placeholder="example@example.com"
          className="input input-bordered"
          required
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password:</span>
        </label>
        <input
          type="password"
          placeholder="Password..."
          className="input input-bordered"
          required
          value={formData.password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className="form-control mt-6">
        <label className="label">
          <Link to="/register" className="label-text-alt link link-hover">
            Don't have an account? Register here.
          </Link>
        </label>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </div>
      {error && <div className="alert alert-error mt-5">{error}</div>}
    </form>
  );
};

export default LoginForm;
