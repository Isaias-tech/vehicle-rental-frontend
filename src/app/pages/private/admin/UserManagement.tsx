import { useState, useEffect } from 'react';
import { AddUserModal } from '../../../../components/ui/AddUserModal';
import { UpdateUserModal } from '../../../../components/ui/UpdateUserModal';
import { UserAccount } from '../../../../types/UserAccount';
import { deleteUser, getUser } from '../../../../api/UserAccount.api';

export const UserManagement = () => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const user = await getUser();
      setUsers([user]);
    } catch (err: any) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setIsDeleteModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user.');
    }
  };

  const handleUpdate = (user: UserAccount) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const confirmDelete = (user: UserAccount) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="w-full max-h-full p-6">
      <div className="w-full px-5 flex flex-row justify-between">
        <h1 className="text-xl font-bold mb-4">User Management</h1>

        <div className="mb-4">
          <button
            className="btn btn-primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New User
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : (
        <>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Date Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.role}</td>
                  <td>{user.date_joined}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mr-2"
                      onClick={() => handleUpdate(user)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => confirmDelete(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Add User Modal */}
      {isAddModalOpen && (
        <AddUserModal
          onClose={() => {
            setIsAddModalOpen(false);
            fetchUsers();
          }}
        />
      )}

      {/* Update User Modal */}
      {isUpdateModalOpen && selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => {
            setIsUpdateModalOpen(false);
            fetchUsers(); 
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p>Are you sure you want to delete {selectedUser.first_name}?</p>
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => handleDelete(selectedUser.id!)}
              >
                Delete
              </button>
              <button
                className="btn"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
