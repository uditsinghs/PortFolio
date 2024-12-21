import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearAllErrors, deleteTimeline, getAllTimeline, resetTimeline } from "../slices/timelineSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const ManageTimeline = () => {
  const [timelineId, setTimelineId] = useState(null);

  const { timeline, error, message, loading } = useSelector((state) => state.timeline);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    setTimelineId(id);
    dispatch(deleteTimeline(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimeline());
      dispatch(getAllTimeline());
      setTimelineId(null);
    }
  }, [error, message, dispatch]);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row w-full justify-between h-20 bg-slate-100 items-center px-4">
        <h1 className="text-lg font-bold text-gray-700">Manage Timeline</h1>
        <Link to="/" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 text-center mt-2 md:mt-0">
          Return To Dashboard
        </Link>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left hidden md:table-cell">Description</th>
                <th className="py-3 px-6 text-left hidden md:table-cell">From</th>
                <th className="py-3 px-6 text-left hidden md:table-cell">To</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {timeline && timeline.length > 0 ? (
                timeline.map((tl) => (
                  <tr key={tl._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{tl.title}</td>
                    <td className="py-3 px-6 text-left hidden md:table-cell">{tl.description}</td>
                    <td className="py-3 px-6 text-left hidden md:table-cell">{tl.timeline.from}</td>
                    <td className="py-3 px-6 text-left hidden md:table-cell">{tl.timeline.to}</td>
                    <td className="py-3 px-6 text-center flex flex-col md:flex-row justify-center gap-2">
                      <button
                        onClick={() => handleDelete(tl._id)}
                        className="bg-red-500 rounded-md text-white font-semibold hover:bg-red-600 py-2 px-4"
                      >
                        {loading && tl._id === timelineId ? (
                          <SpecialLoadingButton content={"deleting..."} />
                        ) : (
                          "DELETE"
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center font-bold text-3xl py-8">
                    No Timeline to Show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageTimeline;
