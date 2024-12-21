import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("https://myportfolio-1gyr.onrender.com/api/v1/project/getall", {
          withCredentials: true
        });
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleToggle = () => {
    setShowMore(!showMore);
    setVisibleProjects(showMore ? 3 : projects.length);
  };

  return (
    <div className="w-full  bg-gray-900 text-white py-16" id="projects">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, visibleProjects).map((project) => (
            <div key={project._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <img
                src={project.projectBanner.url}
                alt={project.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-300">{project.description.slice(0, 100)}...</p>
              <div className="flex justify-between">
                <a href={project.gitRepoLink} target="_blank" rel="noopener noreferrer" className="text-teal-500 mt-2 inline-block">
                  View Repository
                </a>
                <Link to={`/project/${project._id}`}
                  className=" mt-2 inline-block py-2 px-3 bg-teal-500">see detail</Link>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleToggle}
          className="mt-8 py-2 px-4 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 transition duration-300"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default Portfolio;
