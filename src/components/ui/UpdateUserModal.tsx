import React, { useState } from 'react';
import { Role, UserAccount } from '../../types/UserAccount';
import { updateUser } from '../../api/UserAccount.api';

interface UpdateUserProps {
  user: UserAccount;
  onClose: () => void;
}

export const UpdateUserModal: React.FC<UpdateUserProps> = ({
  user: initialUser,
  onClose,
}) => {
  const [user, setUser] = useState<Partial<UserAccount>>(initialUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(user);
      onClose();
    } catch (error) {
      setError('Failed to update user');
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Update User</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Email</label>
            <input
              type="email"
              className="input input-bordered"
              value={user.email || ''}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div className="form-control">
            <label>First Name</label>
            <input
              type="text"
              className="input input-bordered"
              value={user.first_name || ''}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              required
            />
          </div>
          <div className="form-control">
            <label>Last Name</label>
            <input
              type="text"
              className="input input-bordered"
              value={user.last_name || ''}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              required
            />
          </div>
          <div className="form-control">
            <label>Role</label>
            <select
              className="select select-bordered"
              value={user.role || ''}
              onChange={(e) =>
                setUser({ ...user, role: e.target.value as Role })
              }
            >
              {Object.values(Role).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          {error && <div className="alert alert-error mt-4">{error}</div>}
          <div className="modal-action">
            <button
              className={`btn btn-primary ${loading ? 'loading' : ''}`}
              type="submit"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
