import { useState, useEffect } from 'react';
import { UserAccount } from '../../types/UserAccount';
import { updateUser, getUser } from '../../api/userAccount.api';

export const ProfileUserForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<UserAccount | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const userAccount = await getUser();
    setFormData({
      first_name: userAccount.first_name,
      last_name: userAccount.last_name,
    });
    setUserData(userAccount);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setError('');

    const updatedForm = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedForm);

    if (
      userData &&
      (updatedForm.first_name !== userData.first_name ||
        updatedForm.last_name !== userData.last_name)
    ) {
      setFormChanged(true);
    } else {
      setFormChanged(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userAccount: Partial<UserAccount> = {
      first_name: formData.first_name,
      last_name: formData.last_name,
    };

    setIsLoading(true);

    try {
      await updateUser(userAccount);
      setIsLoading(false);
      setFormChanged(false);
      loadData();
    } catch (err) {
      setIsLoading(false);
      setError('Update failed. Please try again.');
    } finally {
      setIsLoading(false);
      setFormChanged(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row justify-between items-center">
        <label className="label">
          <span className="label-text">Email:</span>
        </label>
        <p>{userData?.email}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <label className="label">
          <span className="label-text">Member since:</span>
        </label>
        <p>
          {userData?.date_joined &&
            new Date(userData.date_joined).toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <label className="label">
          <span className="label-text">Role:</span>
        </label>
        <p>{userData?.role}</p>
      </div>
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

      {formChanged && (
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Save'}
          </button>
        </div>
      )}

      {error && <div className="alert alert-error mt-5">{error}</div>}
    </form>
  );
};
