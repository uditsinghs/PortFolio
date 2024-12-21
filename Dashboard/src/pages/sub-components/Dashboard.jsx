import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearAllErrors, deleteApplication, getAllApplication, resetApplication } from '../../slices/applicationSlice'
import { toast } from 'react-toastify'
import SpecialLoadingButton from './SpecialLoadingButton'

const Dashboard = () => {
  const { user } = useSelector((state) => state.user)
  const { skill } = useSelector((state) => state.skill)
  const { project } = useSelector((state) => state.project)
  const { application, message, error, loading } = useSelector((state) => state.application)
  const { timeline } = useSelector((state) => state.timeline)
  const [appId, setAppId] = useState(null)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    setAppId(id)
    dispatch(deleteApplication(id))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllErrors())
    }
    if (message) {
      toast.success(message)
      dispatch(resetApplication())
      dispatch(getAllApplication())
      setAppId(null)
    }
  }, [message, error, dispatch])
  return (
    <div className="p-4 bg-gray-50">
      <h1 className="text-gray-800 font-bold text-xl">Dashboard</h1>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full md:h-[150px] h-[350px] mb-6">
        <div className="shadow-lg bg-white flex flex-col items-center justify-center border-t-4 border-blue-400">
          <h1 className="font-extrabold text-2xl text-gray-900">About Me<br />
          </h1>
          <span className="text-center text-blue-600 capitalize">
            {user && user.aboutMe}
          </span>
        </div>

        <div className="shadow-lg bg-white flex flex-col items-center justify-center border-t-4 border-green-400">
          <h1 className="text-2xl p-2 text-center mt-3 font-semibold text-gray-900">Projects Completed<br />
            <span className="text-6xl text-green-500">{project && project.length}</span>
          </h1>
          <Link className="py-2 px-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 duration-300" to="manage/project">Manage Project</Link>
        </div>

        <div className="shadow-lg bg-white flex flex-col items-center justify-center border-t-4 border-yellow-400">
          <h1 className="text-2xl p-2 text-center mt-3 font-semibold text-gray-900">Skills<br />
            <span className="text-6xl text-yellow-500">{skill && skill.length}</span>
          </h1>
          <Link to="/manage/skill" className="py-2 px-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 duration-300">Manage Skill</Link>
        </div>
      </div>

      {/* Responsive Projects Table */}
      <div className="overflow-x-auto">
        <h1 className="text-gray-800 font-bold text-xl mb-4">Projects</h1>
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left hidden md:table-cell">Deployed</th>
              <th className="py-3 px-6 text-left hidden md:table-cell">Stack</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {project && project.length > 0 ? project.map((proj) => (
              <tr key={proj._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{proj.title}</td>
                <td className="py-3 px-6 text-left hidden md:table-cell uppercase">{proj.deployed}</td>
                <td className="py-3 px-6 text-left hidden md:table-cell uppercase">{proj.stack}</td>
                <td className="py-3 px-6 text-center flex justify-center gap-5">
                  <Link to={`/update/project/${proj._id}`} className="bg-yellow-500 rounded-md text-white font-semibold hover:bg-yellow-600 py-2 px-2">Update</Link>
                  <Link to={proj && proj.ProjectLink} target='_blank' className="bg-green-500 rounded-md text-white font-semibold hover:bg-green-600 py-2 px-4">Visit</Link>
                </td>
              </tr>
            )) : (
              <span className="text-center font-bold text-3xl">No Projects to Show</span>
            )}
          </tbody>
        </table>
      </div>

      {/* Responsive Skills Section */}
      <div className="p-4">
        <h1 className="text-gray-800 font-bold text-xl mb-4">Skills</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skill && skill.length > 0 ? skill.map((s) => (
            <div key={s._id} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border-t-4 border-blue-400">
              <h1 className="text-lg font-semibold text-gray-800 mb-2">{s.title}</h1>
              <progress className="progress progress-info w-full" value={s.proficiency} max="100"></progress>
              <span className="font-bold text-blue-500">{s.proficiency}%</span>
            </div>
          )) : (
            <span className="text-center font-bold text-3xl">No Skills to Show</span>
          )}
        </div>
      </div>

      {/* Applications Table */}
      <div className="grid gap-3">
        <div>
          <h1 className="text-gray-800 font-bold text-xl mb-4">Applications</h1>
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left md:table-cell">Icon</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {application && application.length > 0 ? application.map((app) => (
                <tr key={app._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{app.name}</td>
                  <td className="py-3 px-6 text-left">
                    <img className="w-[40px] object-contain" src={app?.svg?.url} alt="app_name" />
                  </td>
                  <td className="py-3 px-6 text-center flex justify-center gap-5">
                    <button onClick={() => handleDelete(app._id)} className="bg-red-500 rounded-md text-white font-semibold hover:bg-red-600 py-2 px-2">
                      {loading && app._id === appId ? <SpecialLoadingButton content={"deleting..."} /> : "DELETE"}
                    </button>
                  </td>
                </tr>
              )) : (
                <span className="text-center font-bold text-3xl">No Applications to Show</span>
              )}
            </tbody>
          </table>
        </div>

        <div>
          <div className="flex justify-end ">
            <Link to="/manage/timeline" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 duration-300 rounded-md text-white">Manage Timeline</Link>
          </div>
          <h1 className="text-gray-800 font-bold text-xl mb-4">Timeline</h1>
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left md:table-cell">From</th>
                <th className="py-3 px-6 text-left md:table-cell">To</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {timeline && timeline.length > 0 ? timeline.map((tl) => (
                <tr key={tl._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{tl.title}</td>
                  <td className="py-3 px-6 text-left">{tl.timeline.from}</td>
                  <td className="py-3 px-6 text-left">{tl.timeline.to}</td>
                </tr>
              )) : (
                <span className="text-center font-bold text-3xl">No Timeline to Show</span>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
