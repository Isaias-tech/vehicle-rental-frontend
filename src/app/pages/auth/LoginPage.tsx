import LoginForm from "../../../components/ui/LoginForm";

export const LoginPage = () => {
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="font-bold text-2xl">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};
