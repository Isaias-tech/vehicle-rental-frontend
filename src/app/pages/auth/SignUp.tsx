import Navbar from '../../../components/layout/Navbar';
import { Link } from 'react-router-dom';
import SignUpForm from '../../../components/ui/SignUpForm';

export const SignUp = () => {
  return (
    <>
      <Navbar>
        <div className="w-full flex justify-end">
          <Link
            to="/register"
            className="btn btn-outline btn-neutral text-white mr-4"
          >
            Register
          </Link>
          <Link to="/login" className="btn btn-neutral">
            Login
          </Link>
        </div>
      </Navbar>
      <main className="w-full h-[90vh] flex  justify-center items-center">
        <div className="card bg-base-100 w-96 shadow-xl border-slate-200 border-2">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            <SignUpForm />
          </div>
        </div>
      </main>
    </>
  );
};
