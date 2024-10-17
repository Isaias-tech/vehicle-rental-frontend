import { useEffect, useState } from 'react';
import { UserAccount } from '../../../types/User.interface';
import { getUsersList } from '../../../api/userAccount.api';
import SignUpModalForm from '../../../components/ui/SignUpModalForm';

export const UsersManagement = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Users, setUsers] = useState<UserAccount[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsersList();
      setUsers(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const manageModal = async (modalId: string, action: 'open' | 'close') => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;

    if (modal) {
      if (action === 'open') {
        modal.showModal();
      } else if (action === 'close') {
        setError(null);
        modal.close();
        await fetchUsers();
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="container w-full h-full flex flex-col overflow-y-auto">
      <div className="w-full flex flex-row justify-between">
        <h2 className="text-2xl font-bold">Users Management</h2>
        <SignUpModalForm manageModal={manageModal} />
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>First name: </th>
                <th>Last name:</th>
                <th>Email: </th>
                <th>Role: </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={4}>Loading...</td>
                </tr>
              )}
              {error && <tr>{error}</tr>}
              {Users &&
                Users.map((user) => (
                  <tr key={user.email}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
