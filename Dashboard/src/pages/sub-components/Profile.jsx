
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center"> Profile</h2>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <img
          src={user?.avatar?.url || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-40 h-40 object-contain"
        />
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Full Name:</label>
        <p className="text-lg text-gray-700">{user?.fullName || "N/A"}</p>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Email:</label>
        <p className="text-lg text-gray-700">{user?.email || "N/A"}</p>
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Phone:</label>
        <p className="text-lg text-gray-700">{user?.phone || "N/A"}</p>
      </div>

      {/* About Me */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">About Me:</label>
        <p className="text-lg text-gray-700">{user?.aboutMe || "N/A"}</p>
      </div>

      {/* Social Media Links */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-1">GitHub:</label>
          <a
            href={user?.githubURL || "#"}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user?.githubURL || "Not provided"}
          </a>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Instagram:</label>
          <a
            href={user?.instagramURL || "#"}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user?.instagramURL || "Not provided"}
          </a>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Facebook:</label>
          <a
            href={user?.facebookURL || "#"}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user?.facebookURL || "Not provided"}
          </a>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Twitter:</label>
          <a
            href={user?.twitterURL || "#"}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user?.twitterURL || "Not provided"}
          </a>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">LinkedIn:</label>
          <a
            href={user?.linkdinURL || "#"}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user?.linkdinURL || "Not provided"}
          </a>
        </div>
      </div>

      {/* Resume */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Resume:</label>
        {user?.resume?.url ? (
          <a
            href={user.resume.url}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        ) : (
          <p className="text-lg text-gray-700">Resume not uploaded</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
