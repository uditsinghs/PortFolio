import { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("https://myportfolio-1gyr.onrender.com/api/v1/user/me/portfolio", {
          withCredentials: true
        });
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="w-full  bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Section Title with Border */}
        <div className="col-span-2 flex justify-center md:mb-5 relative">
          <div className="absolute inset-0 w-full h-12 bg-teal-500 -z-10 transform -rotate-2 rounded-md"></div>
          <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold">
            <span className="text-white">About </span>
            <span className="text-teal-500 animate-pulse">me</span>
          </h2>
        </div>

        {/* User Image */}
        <div className="flex justify-center">
          <img
            src={user?.avatar?.url || "https://via.placeholder.com/300"}
            alt="User Profile"
            className="rounded-lg shadow-lg w-full md:h-auto max-w-xs md:max-w-sm lg:max-w-md object-contain"
          />
        </div>

        {/* About Me Text */}
        <div className="text-left">
          <p className="text-lg md:text-xl text-gray-300">
            {user.aboutMe ||
              "Hi, I'm Udit Singh, a passionate MERN Developer with a knack for creating responsive and interactive web applications. My journey in tech has been focused on building projects that solve real-world problems, and I have honed my skills across the MERN stack, UI/UX design, and more."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
