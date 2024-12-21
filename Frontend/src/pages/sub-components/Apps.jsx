import { useEffect, useState } from "react";
import axios from "axios";

const Apps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchAppsData = async () => {
      try {
        const { data } = await axios.get("https://myportfolio-1gyr.onrender.com/api/v1/softwareapplication/getall", {
          withCredentials: true
        });
        setApps(data.applications);
      } catch (error) {
        console.error("Error fetching application data:", error);
      }
    };
    fetchAppsData();
  }, []);

  return (
    <div className="w-full  bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
          Applications I Use
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {apps.map((app) => (
            <div key={app._id} className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={app.svg.url}
                alt={app.name}
                className="w-16 h-16 md:w-24 md:h-24 object-contain mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold">{app.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apps;
