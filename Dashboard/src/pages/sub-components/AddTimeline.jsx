import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton'
import { addTimeline, clearAllErrors, getAllTimeline, resetTimeline } from '../../slices/timelineSlice';
// Assuming you have an action to add a timeline
// import { addTimeline } from '../../slices/timelineSlice';

const AddTimeline = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.timeline)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    from: '',
    to: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, from, to } = formData;

    if (!title || !description || !from || !to) {
      toast.error("All fields are required!");
      return;
    }

    dispatch(addTimeline(formData));
    setFormData({
      title: '',
      description: '',
      from: '',
      to: '',
    });
  };
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllErrors())
    }
    if (message) {
      toast.success(message)
      dispatch(resetTimeline())
      dispatch(getAllTimeline())
    }
  }, [error])

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Timeline</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-semibold text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-semibold text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter description"
              rows="4"
            ></textarea>
          </div>

          {/* From */}
          <div>
            <label htmlFor="from" className="block font-semibold text-gray-700">From</label>
            <input
              type="number"
              id="from"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 outline-none"
              placeholder="2022"
            />
          </div>

          {/* To */}
          <div>
            <label htmlFor="to" className="block font-semibold text-gray-700">To</label>
            <input
              type="number"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 outline-none"
              placeholder="2025"
            />
          </div>

          {/* Submit Button */}
          {loading ? <SpecialLoadingButton content={"adding.."} /> :
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Timeline
            </button>}

        </form>
      </div>
    </div>
  );
};

export default AddTimeline;
