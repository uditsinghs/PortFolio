import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllForgotPasswordError, forgotPassword } from "../slices/forgotResetPasswordSlice";
import { useNavigate, Link } from 'react-router-dom';
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { error, loading, message } = useSelector((state) => state.forgotPassword);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    if (email.trim() === "") {
      toast.error("Please enter a valid email address.");
      return;
    }
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordError());
    }
    if (isAuthenticated) {
      navigate('/');
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, isAuthenticated, message, navigate]);

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-5">
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="email"
          className="grow"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <div className="flex justify-between items-center gap-8">
        <button
          className="py-2 bg-red-600 rounded-md text-white px-5"
          onClick={handleForgotPassword}
          disabled={loading}
        >
          {loading ? <SpecialLoadingButton content={"Requesting..."} /> : "Request for reset password"}
        </button>
        <Link to="/login" className="text-blue-500 border-b border-blue-600">
          Remember Password
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
