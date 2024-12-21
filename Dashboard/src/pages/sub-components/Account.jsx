import { useState } from "react"
// import { Link } from 'react-router-dom'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'
import UpdatePassword from './UpdatePassword'
const Account = () => {
  const [selected, setSelected] = useState("Profile")
  return (
    <div className="grid grid-cols-[30%,70%] gap-9">
      <div className="flex flex-col gap-2 items-center pt-5">
        <button onClick={() => setSelected("Profile")} className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 duration-300 ">Profile</button>
        <button onClick={() => setSelected("updateProfile")} className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 duration-300 ">Update Profile</button>
        <button onClick={() => setSelected("updatePasswod")} className="py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-700 duration-300 ">Update Password</button>
      </div>
      <div className="">  
        {selected === "Profile" && <Profile />}
        {selected === "updatePasswod" && <UpdatePassword />}
        {selected === "updateProfile" && <UpdateProfile />}
      </div>

    </div>
  )
}

export default Account