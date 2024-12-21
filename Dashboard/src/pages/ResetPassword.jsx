import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllForgotPasswordError, resetPassword } from "../slices/forgotResetPasswordSlice";
import { useNavigate, useParams } from 'react-router-dom';
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { error, loading, message } = useSelector((state) => state.forgotPassword);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams()

  const handleResetPassword = () => {
    if (newPassword.trim() === "") {
      toast.error("Please enter a valid newPassword address.");
      return;
    } if (confirmNewPassword.trim() === "") {
      toast.error("Please enter a valid Confirm address.");
    }
    dispatch(resetPassword(token,newPassword, confirmNewPassword));
      navigate('/login')
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
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </label>


      <button
        className="py-2 bg-red-600 rounded-md text-white px-5"
        onClick={handleResetPassword}
        disabled={loading}
      >
        {loading ? <SpecialLoadingButton content={"reseting..."} /> : "Reset Password"}
      </button>

    </div >
  );
};

export default ResetPassword;
