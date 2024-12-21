import { useEffect, useState } from "react";
import axios from "axios";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const { data } = await axios.get("https://myportfolio-1gyr.onrender.com/api/v1/skill/getall", {
          withCredentials: true
        });
        setSkills(data.skills);
      } catch (error) {
        console.error("Error fetching skill data:", error);
      }
    };
    fetchSkillsData();
  }, []);

  return (
    <div className="w-full bg-gray-900 text-white py-16">
      <div className="container  mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-8">
          <span className="text-white">My </span>
          <span className="text-teal-500">Skills</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div key={skill._id} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              {/* Skill Icon */}
              <img
                src={skill.svg.url}
                alt={skill.title}
                className="w-16 h-16 mx-auto mb-4"
              />

              {/* Skill Title */}
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>

              {/* Proficiency Bar */}
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-teal-500 h-4 rounded-full"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-400">{skill.proficiency}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
