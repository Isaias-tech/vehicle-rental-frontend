import React, { useState } from 'react';
import { Role, UserAccount } from '../../types/UserAccount';
import { updateUserById } from '../../api/userAccount.api';

interface UpdateUserProps {
  user: UserAccount;
  currentUserRole: Role; // Pass the role of the logged-in user
  onClose: () => void;
}

export const UpdateUserModal: React.FC<UpdateUserProps> = ({
  user: initialUser,
  currentUserRole,
  onClose,
}) => {
  const [user, setUser] = useState<Partial<UserAccount>>(initialUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAvailableRoles = (): Role[] => {
    if (currentUserRole === Role.ADMINISTRATOR) {
      return Object.values(Role);
    } else if (currentUserRole === Role.MANAGER) {
      return [Role.EMPLOYEE, Role.CLIENT];
    }
    return [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserById(user.id!, user);
      onClose();
    } catch (error: any) {
      if (error.response.status === 403) {
        setError('You are not authorized to update this user.');
      } else {
        setError(
          error?.response?.data?.detail ||
            'Failed to update user. Please try again.'
        );
      }
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
              disabled={loading} // Disable input when loading
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
              disabled={loading} // Disable input when loading
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
              disabled={loading} // Disable input when loading
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
              disabled={loading} // Disable input when loading
            >
              {getAvailableRoles().map((role) => (
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
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
            <button
              className="btn"
              onClick={onClose}
              disabled={loading} // Disable button when loading
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
