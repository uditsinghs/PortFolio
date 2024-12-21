import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectView = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getSingleProject = async () => {
      try {
        const { data } = await axios.get(`https://myportfolio-1gyr.onrender.com/api/v1/project/get/${id}`, {
          withCredentials: true
        });
        setProject(data.singleProject);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    getSingleProject();
  }, [id]);

  if (!project) return <p>Loading project details...</p>;

  // Convert the description into an array (splitting by line breaks)
  const descriptionLines = project.description.split('\r\n');
  // Convert technologies into an array (splitting by commas)
  const technologiesArray = project.technologies.split(',').map(tech => tech.trim());

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Project Banner */}
        <div className="flex justify-center mb-8">
          <img
            src={project.projectBanner?.url || "https://via.placeholder.com/800"}
            alt={project.title}
            className="rounded-lg shadow-lg w-full max-w-2xl object-contain"
          />
        </div>

        {/* Project Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">{project.title}</h2>

        {/* Project Description */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Description:</h3>
          <ul className="list-disc list-inside">
            {descriptionLines.map((line, index) => (
              <li key={index} className="text-lg md:text-xl text-gray-300">{line}</li>
            ))}
          </ul>
        </div>

        {/* Technologies Used */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Technologies Used:</h3>
          <ul className="list-disc list-inside">
            {technologiesArray.map((tech, index) => (
              <li key={index} className="text-lg md:text-xl text-gray-300">{tech}</li>
            ))}
          </ul>
        </div>

        {/* Project Links */}
        <div className="flex justify-center space-x-4">
          {project.gitRepoLink && (
            <a
              href={project.gitRepoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 transition duration-300"
            >
              View GitHub Repository
            </a>
          )}
          {project.ProjectLink && (
            <a
              href={project.ProjectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 transition duration-300"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
