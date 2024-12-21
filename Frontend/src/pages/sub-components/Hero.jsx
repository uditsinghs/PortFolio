import { useEffect, useState } from "react";
import axios from 'axios';
import Typewriter from "./TypeWriter";
import { Link } from 'react-router-dom'
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";




const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get("https://myportfolio-1gyr.onrender.com/api/v1/user/me/portfolio", {
          withCredentials: true
        });
        setUser(data.user);
      } catch (error) {
        (error);
      }
    };
    getMyProfile();
  }, []);

  return (
    <div className="w-full text-white flex pt-24">
      <div className="max-w-4xl mx-auto text-center p-8">
        <h1 className="text-4xl md:text-6xl font-bold">Hello, I&apos;m {user.fullName || "Hello, I'm Udit Singh"}</h1>
        <Typewriter />
        {/* apps link */}
        <div className="flex justify-center md:justify-start ">
          <div className="bg-white md:w-[140px] w-[130px] md:h-[20px] h-[17px] rounded-3xl flex items-center text-xl justify-around gap-2">
            <span>
              <Link to={user && user.instagramURL} target="_blank">
                <IoLogoInstagram className="text-red-600" />
              </Link>
            </span>
            <span>
              <Link to={user && user.linkdinURL} target="_blank">
                <IoLogoLinkedin className="text-blue-600" />
              </Link>
            </span>
            <span>
              <Link to={user && user.facebookURL} target="_blank">
                <FaFacebook className="text-blue-600" />
              </Link>
            </span>

            <span>
              <Link to={user && user.twitterURL} target="_blank">
                <FaXTwitter className="text-black" />
              </Link>
            </span>
          </div>
        </div>
        <div className="flex items-center md:justify-start justify-center pt-4 gap-2">
          <div className="bg-white w-[80px] h-[25px] rounded-3xl flex items-center text-xl justify-center gap-2">
            <span className="flex justify-center items-center text-black gap-1 cursor-pointer">
              Github
              <Link to={user && user.githubURL} target="_blank">
                <IoLogoGithub className="text-black" />
              </Link>
            </span>
          </div>
          <div className="bg-white w-[80px] h-[25px] rounded-3xl flex items-center text-xl justify-center gap-2">
            <span className="flex justify-center items-center gap-1 text-black cursor-pointer">
              Resume
              <Link to={user && user.resume && user.resume.url} target="_blank">
                <FaExternalLinkAlt className="text-black" />
              </Link>
            </span>
          </div>
        </div>


        <div className="flex md:text-xl text-sm leading-tight md:pt-2 pt-3 text-pretty">
          <p>{user.aboutMe}</p>
        </div>
        {/* CTA Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <a href="#projects" className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-md shadow-md">
            View My Work
          </a>
          <a href="#contact" className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white py-3 px-6 rounded-md shadow-md">
            Get In Touch
          </a>
        </div>
      </div>
      <br />
    </div >

  );
};

export default Hero;
