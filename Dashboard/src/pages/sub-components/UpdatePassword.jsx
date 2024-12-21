import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearAllErrors, getUser, resetProfile, updatePassword } from "../../slices/userSlice"
import { toast } from "react-toastify"

const UpdatePassword = () => {
  const dispatch = useDispatch()
  const { error, message, isUpdated } = useSelector((state) => state.user)

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const handleChangePassword = () => {
    dispatch(updatePassword(password, newPassword, confirmNewPassword))
    dispatch(clearAllErrors())
    setConfirmNewPassword("")
    setNewPassword('')
    setPassword('')
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllErrors())
    }
    if (isUpdated) {
      dispatch(getUser())
      dispatch(resetProfile())
    }
    if (message) {
      toast.success(message)
    }
  }, [error, message, isUpdated, dispatch])

  return (
    <div className=" flex bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Password</h1>

        <div className="flex flex-col gap-4">
          {/* Current Password */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="border border-gray-300 rounded-md p-2 text-gray-900 outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="border border-gray-300 rounded-md p-2 text-gray-900 outline-none focus:border-blue-500"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="border border-gray-300 rounded-md p-2 text-gray-900 outline-none focus:border-blue-500"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              value={confirmNewPassword}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleChangePassword}
            className="bg-blue-500 text-white rounded-md py-2 px-4 font-semibold hover:bg-blue-600 transition duration-300"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdatePassword
