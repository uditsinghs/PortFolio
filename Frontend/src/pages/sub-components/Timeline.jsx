import { useEffect, useState } from "react";
import axios from 'axios'
const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  useEffect(() => {
    const getTimeline = async () => {
      try {
        const { data } = await axios.get("https://myportfolio-1gyr.onrender.com/api/v1/timeline/getalltimeline", {
          withCredentials: true
        });
        setTimeline(data.allTimelines);
      } catch (error) {
        (error);
      }
    };
    getTimeline();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-500 mb-8">My Timeline</h2>
      <div className="relative border-l border-teal-500">
        {timeline.map((item) => (
          <div key={item._id} className="mb-10 ml-6">
            <span className="absolute -left-3.5 w-7 h-7 bg-teal-500 rounded-full border-4 border-gray-900" />
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-gray-400">{`${item.timeline.from} - ${item.timeline.to}`}</p>
              </div>
              <div className="mt-2 md:mt-0 md:ml-4">
                <p className="text-gray-300">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline