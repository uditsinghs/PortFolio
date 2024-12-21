import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "../../slices/userSlice";
import SpecialLoadingButton from './SpecialLoadingButton';


const UpdateProfile = () => {
  const { user, error, message, loading, isUpdated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    aboutMe: user?.aboutMe || "",
    githubURL: user?.githubURL || "",
    instagramURL: user?.instagramURL || "",
    facebookURL: user?.facebookURL || "",
    twitterURL: user?.twitterURL || "",
    linkdinURL: user?.linkdinURL || "",
  });

  const [avatar, setAvatar] = useState(null);
  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    Object.keys(formData).forEach((key) => {
      updatedData.append(key, formData[key]);
    });

    if (avatar) updatedData.append("avatar", avatar);
    if (resume) updatedData.append("resume", resume);

    dispatch(updateProfile(updatedData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllErrors());
    }
    if (isUpdated) {
      dispatch(resetProfile());
      dispatch(getUser());
    }
    if (message) toast.success(message);
  }, [dispatch, error, isUpdated, message]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Update Your Profile</h2>

      {/* Form Fields */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* about me */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">About Me</label>
        <textarea
        rows={5}
          type="text"
          name="aboutMe"
          value={formData.aboutMe}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Social Media URLs */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">GitHub URL</label>
        <input
          type="url"
          name="githubURL"
          value={formData.githubURL}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">LinkedIn URL</label>
        <input
          type="url"
          name="linkdinURL"
          value={formData.linkdinURL}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Facebook URL</label>
        <input
          type="url"
          name="facebookURL"
          value={formData.facebookURL}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Twitter URL</label>
        <input
          type="url"
          name="twitterURL"
          value={formData.twitterURL}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Instagram URL</label>
        <input
          type="url"
          name="instagramURL"
          value={formData.instagramURL}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Avatar & Resume */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Avatar</label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Resume</label>
        <input
          type="file"
          name="resume"
          accept="image/*"
          onChange={handleResumeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {loading ? <SpecialLoadingButton content={"Updating..."} /> : "Update Profile"}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
