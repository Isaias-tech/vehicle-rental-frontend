import { useState } from 'react';
import { register } from '../../api/userAccount.api';

const SignUpModalForm = ({
  manageModal,
}: {
  manageModal: (modalId: string, action: 'open' | 'close') => Promise<void>;
}) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatpassword, setRepeatPassword] = useState('');
  const [role, setRole] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetValues = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
    setRole('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== repeatpassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        email,
        password,
        first_name,
        last_name,
        role,
      });
      manageModal('user-register-modal', 'close');
      resetValues();
    } catch (e: any) {
      if (e?.errors) {
        const errorDetail = e.errors[0].detail;
        setError(`${e.type}: ${errorDetail}`);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="actions">
      <button
        className="btn btn-primary"
        onClick={() => manageModal('user-register-modal', 'open')}
      >
        Add user
      </button>
      <dialog id="user-register-modal" className="modal">
        <div className="modal-box">
          <h2 className="text-2xl font-bold ml-3">Register a new account:</h2>
          <div className="flex flex-col justify-center items-center mt-5">
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">First Name:</span>
                </label>
                <input
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Last Name:</span>
                </label>
                <input
                  type="text"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email:</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Password:</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Repeat Password:</span>
                </label>
                <input
                  type="password"
                  value={repeatpassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Role: </span>
                </label>
                <select
                  className="input input-bordered w-full"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Client">Client</option>
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>

              <div className="form-control flex flex-row justify-between items-center">
                <button
                  type="button"
                  className="btn btn-outline btn-error w-[30%]"
                  onClick={() => {
                    resetValues();
                    manageModal('user-register-modal', 'close');
                  }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary w-[30%]`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
            {error && (
              <div role="alert" className="alert alert-error mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SignUpModalForm;
