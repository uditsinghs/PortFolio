import { useDispatch, useSelector } from 'react-redux'
import { clearAllErrors, deleteProject, getAllProject, resetProject } from '../slices/projectSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import SpecialLoadingButton from './sub-components/SpecialLoadingButton'

const ManageProject = () => {
  const { project, error, message, loading } = useSelector((state) => state.project)
  const [pId, setPid] = useState(null)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    setPid(id)
    dispatch(deleteProject(id))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllErrors())
    }
    if (message) {
      toast.success(message)
      dispatch(resetProject())
      dispatch(getAllProject())
      setPid(null)
    }
  }, [error, message, dispatch])

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row w-full justify-between h-20 bg-slate-100 items-center px-4">
        <h1 className="text-lg font-bold text-gray-700">Manage Project</h1>
        <Link to="/" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 text-center mt-2 md:mt-0">
          Return To Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {project && project.length > 0 ? project.map((proj) => (
          <div key={proj._id} className="bg-white rounded-lg shadow-lg p-4 relative">
            <img className="w-full h-48 object-cover rounded-t-lg" src={proj && proj.projectBanner && proj.projectBanner.url} alt={proj.title} />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{proj.title}</h2>
              <p className="text-gray-700">{proj.description}</p>
              <p className="text-gray-600 mt-2 text-sm">Technologies: {proj.technologies}</p>
            </div>
            <div className='flex justify-around'>
              <button
                onClick={() => handleDelete(proj._id)}
                className="right-2 bg-red-500 text-white rounded-full px-4 py-2 text-sm hover:bg-red-600"
              >
                {loading && pId === proj._id ? <SpecialLoadingButton content={"deleting.."} /> : 'Delete'}
              </button>
              <Link to={`/view/project/${proj._id}`} className='right-2 bg-green-500 text-white rounded-full px-4 py-2 text-sm hover:bg-red-600"'>
                View
              </Link>
            </div>
          </div>
        )) : (
          <p className="text-center text-lg font-semibold">No projects to show</p>
        )}
      </div>
    </div>
  )
}

export default ManageProject
