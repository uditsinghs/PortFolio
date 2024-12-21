import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { clearAllErrors, getAllProject, resetProject, getSingleProject } from "../slices/projectSlice"
import { toast } from 'react-toastify'
import SpecialLoadingButton from './sub-components/SpecialLoadingButton'
import { updateProject } from '../slices/projectSlice';
import { useParams, useNavigate } from 'react-router-dom'
const UpdateProject = () => {


  const dispatch = useDispatch()
  const { error, message, loading, singleProject } = useSelector((state) => state.project)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getSingleProject(id))
  }, [dispatch, id])




  const [projectData, setProjectData] = useState({
    title: singleProject.title,
    description: singleProject.description,
    ProjectLink: singleProject.ProjectLink,
    gitRepoLink: singleProject.gitRepoLink,
    stack: singleProject.stack,
    technologies: singleProject.technologies,
    deployed: singleProject.deployed,
    projectBanner: singleProject.projectBanner,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleFileChange = (e) => {
    setProjectData((prevData) => ({ ...prevData, projectBanner: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in projectData) {
      formData.append(key, projectData[key]);
    }
    dispatch(updateProject(formData, id))
  };


  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllErrors())
    }
    if (message) {
      toast.success(message)
      dispatch(getAllProject())
      dispatch(resetProject())
      navigate('/')
    }
  }, [error, message, dispatch, navigate])

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Update Project</h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={projectData.title}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="e.g. Todo"
        
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={projectData.description}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="feature1,feature2,feature3"
      
        />
      </div>

      <div>
        <label htmlFor="ProjectLink" className="block text-sm font-medium text-gray-700">Project Link</label>
        <input
          type="url"
          name="ProjectLink"
          value={projectData.ProjectLink}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Project link if deployed"

        />
      </div>

      <div>
        <label htmlFor="gitRepoLink" className="block text-sm font-medium text-gray-700">Git Repository Link</label>
        <input
          type="url"
          name="gitRepoLink"
          value={projectData.gitRepoLink}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="http://githubrepolink"

        />
      </div>

      <div>
        <label htmlFor="stack" className="block text-sm font-medium text-gray-700">Stack</label>
        <input
          type="text"
          name="stack"
          value={projectData.stack}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="e.g. MERN"
      
        />
      </div>

      <div>
        <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">Technologies</label>
        <input
          type="text"
          name="technologies"
          value={projectData.technologies}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="e.g. HTML, JS"
        
        />
      </div>

      <div>
        <label htmlFor="deployed" className="block text-sm font-medium text-gray-700">Deployed</label>
        <select
          name="deployed"
          value={projectData.deployed}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div>
        <label htmlFor="projectBanner" className="block text-sm font-medium text-gray-700">Project Banner</label>
        <input
          type="file"
          name="projectBanner"
          onChange={handleFileChange}
          accept=".webp,.png,.jpg,.jpeg"
          className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
      >
        {loading ? <SpecialLoadingButton content={"updating.."} /> : "Update"}
      </button>
    </form>
  );
};

export default UpdateProject;
