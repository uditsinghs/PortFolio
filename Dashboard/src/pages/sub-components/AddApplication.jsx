import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';
import { addApplication, clearAllErrors, getAllApplication, resetApplication } from '../../slices/applicationSlice';

const AddApplication = () => {
  const [name, setName] = useState('');
  const [svg, setSvg] = useState(null);
  
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.application);

  const handleFileChange = (e) => {
    setSvg(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!svg) {
      toast.error("Please select an SVG file");
      return;
    }
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('svg', svg);
    
    dispatch(addApplication(formData));
    setName('');
    setSvg(null); // Optionally reset file input
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplication());
      dispatch(getAllApplication());
    }
  }, [error, message, dispatch]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Application</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Application Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="e.g. React"
          required
        />
      </div>
      <div>
        <label htmlFor="svg" className="block text-sm font-medium text-gray-700">SVG File</label>
        <input
          type="file"
          id="svg"
          onChange={handleFileChange}
          accept="*/image" 
          className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? <SpecialLoadingButton content={"Adding..."} /> : "Add Application"}
      </button>
    </form>
  );
};

export default AddApplication;
