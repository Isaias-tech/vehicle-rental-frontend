import { useState, useEffect } from 'react';
import { AddUserModal } from '../../../../components/ui/AddUserModal';
import { UpdateUserModal } from '../../../../components/ui/UpdateUserModal';
import { UserAccount, Role } from '../../../../types/UserAccount';
import { deleteUser, getUsers, getUser } from '../../../../api/UserAccount.api';

export const UserManagement = () => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  const fetchCurrentUser = async () => {
    try {
      const user = await getUser();
      setCurrentUserRole(user.role);
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      setError('Failed to fetch current user.');
    }
  };

  const fetchUsers = async (page: number = 1) => {
    setLoading(true);
    try {
      const { results, next, previous, count } = await getUsers(page);
      setUsers(results);
      setNextPage(next);
      setPrevPage(previous);

      const pageSize = 10;
      setTotalPages(Math.ceil(count / pageSize));
      setCurrentPage(page);
    } catch (err: any) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setIsDeleteModalOpen(false);
      fetchUsers(currentPage);
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

  const handleNextPage = () => {
    if (nextPage) {
      fetchUsers(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchUsers(currentPage - 1);
    }
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
                  <td>
                    {user.date_joined &&
                      new Date(user.date_joined).toLocaleDateString()}
                  </td>
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

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              className="btn btn-secondary"
              onClick={handlePrevPage}
              disabled={!prevPage}
            >
              Previous
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-secondary"
              onClick={handleNextPage}
              disabled={!nextPage}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Add User Modal */}
      {isAddModalOpen && (
        <AddUserModal
          onClose={() => {
            setIsAddModalOpen(false);
            fetchUsers(currentPage);
          }}
        />
      )}

      {/* Update User Modal */}
      {isUpdateModalOpen && selectedUser && currentUserRole && (
        <UpdateUserModal
          user={selectedUser}
          currentUserRole={currentUserRole}
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
