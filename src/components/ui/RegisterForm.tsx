import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAccount, Role } from '../../types/UserAccount';
import { registerUser } from '../../api/userAccount.api';

const RegisterForm = ({ adminForm }: { adminForm?: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    repeat_password: '',
    role: Role.CLIENT,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.repeat_password) {
      setError('Passwords do not match!');
      return;
    }

    const userAccount: UserAccount = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    setIsLoading(true);

    try {
      await registerUser(userAccount);
      setIsLoading(false);
      navigate('/login');
    } catch (err) {
      setIsLoading(false);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        repeat_password: '',
        role: Role.CLIENT,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">First name:</span>
        </label>
        <input
          type="text"
          placeholder="First name..."
          className="input input-bordered"
          required
          value={formData.first_name}
          name="first_name"
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Last name:</span>
        </label>
        <input
          type="text"
          placeholder="Last name..."
          className="input input-bordered"
          required
          value={formData.last_name}
          name="last_name"
          onChange={handleChange}
        />
      </div>
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
      <div className="form-control">
        <label className="label">
          <span className="label-text">Repeat password:</span>
        </label>
        <input
          type="password"
          placeholder="Password again..."
          className="input input-bordered"
          required
          value={formData.repeat_password}
          name="repeat_password"
          onChange={handleChange}
        />
      </div>
      {adminForm && (
        <div className="form-control">
          <label className="label">
            <span className="label-text">Role:</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={formData.role}
            name="role"
            onChange={handleChange}
          >
            <option value="CLIENT">Client</option>
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
            <option value="ADMINISTRATOR">Administrator</option>
          </select>
        </div>
      )}
      <div className="form-control mt-6">
        <label className="label">
          <Link to="/login" className="label-text-alt link link-hover">
            Already have an account? Login
          </Link>
        </label>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Register'}
        </button>
      </div>
      {error && <div className="alert alert-error mt-5">{error}</div>}
    </form>
  );
};

export default RegisterForm;
