import RegisterForm from '../../../components/ui/RegisterForm';

export const RegisterPage = () => {
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="font-bold text-2xl">Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
};
