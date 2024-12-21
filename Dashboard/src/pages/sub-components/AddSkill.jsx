
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addSkill, clearAllErrors, getAllSkills, resetSkill } from '../../slices/skillSlice';
import { toast } from 'react-toastify'
import  SpecialLoadingButton  from './SpecialLoadingButton'

const AddSkill = () => {
  const [title, setTitle] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [svg, setSvg] = useState(null);
  const handleFileChange = (e) => {
    setSvg(e.target.files[0]);
  };

  const dispatch = useDispatch()
  const { message, error, loading } = useSelector((state)=>state.skill)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('proficiency', proficiency);
    formData.append('svg', svg);
    dispatch(addSkill(formData))
    setTitle('');
    setProficiency('');
    setSvg(null);
  };

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllErrors());
    }
    if (message) {
      toast.success(message)
      dispatch(resetSkill())
      dispatch(getAllSkills())
    }
  }, [error, message, dispatch])


  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Skill</h2>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Skill Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="e.g. React"
          required
        />
      </div>

      <div>
        <label htmlFor="proficiency" className="block text-sm font-medium text-gray-700">Proficiency</label>
        <input
          type="text"
          id="proficiency"
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="e.g. 80%"
          required
        />
      </div>

      <div>
        <label htmlFor="svg" className="block text-sm font-medium text-gray-700">SVG File</label>
        <input
          type="file"
          id="svg"
          onChange={handleFileChange}
          accept=".svg, .png"
          className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
      >
        {loading ? <SpecialLoadingButton content={"adding.."} /> : "Add Skill"}
      </button>
    </form>
  );
};

export default AddSkill;
