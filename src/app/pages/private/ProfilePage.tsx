import { deleteUser } from '../../../api/UserAccount.api';
import { ProfileUserDetailsForm } from '../../../components/ui/ProfileUserDetailsForm';
import { ProfileUserForm } from '../../../components/ui/ProfileUserForm';

export const ProfilePage = () => {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your account?')) {
      return;
    }

    try {
      await deleteUser();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="card bg-base-100 w-96 shadow-xl mb-10">
        <div className="card-body">
          <h2 className="card-title text-2xl">User data:</h2>
          <ProfileUserForm />
        </div>
      </div>
      <div className="card bg-base-100 w-96 shadow-xl mb-10">
        <div className="card-body">
          <h2 className="card-title text-2xl">Profile data:</h2>
          <ProfileUserDetailsForm />
        </div>
      </div>
      <div className="card bg-base-100 w-96 shadow-xl mb-10">
        <div className="card-body">
          <h2 className="card-title text-2xl text-error w-full">Danger</h2>
          <button className="btn btn-error" onClick={handleDelete}>
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
};
