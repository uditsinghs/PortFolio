/* eslint-disable no-undef */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProject } from '../slices/projectSlice'
import { useParams, Link } from 'react-router-dom'

const ViewProject = () => {
  const { singleProject } = useSelector((state) => state.project)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSingleProject(id))
  }, [dispatch, id])

  const descriptionList = singleProject?.description ? singleProject.description.split('. ') : []
  const technologiesList = singleProject?.technologies ? singleProject.technologies.split(',') : []

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row w-full justify-between h-20 bg-slate-100 items-center px-4">
        <h1 className="text-lg font-bold text-gray-700">Manage Project</h1>
        <Link
          to="/manage/project"
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 text-center mt-2 md:mt-0"
        >
          Return To Back
        </Link>
      </div>

      <div className="container mx-auto p-4">
        {/* Project Banner */}
        <div className="w-full shadow-lg h-64 lg:h-96 bg-gray-200 rounded-lg overflow-hidden transition transform hover:scale-105 hover:opacity-80 duration-300">
          <Link to={singleProject?.projectBanner?.url} target="_blank">
            <img
              src={singleProject?.projectBanner?.url}
              alt={singleProject?.title}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>

        {/* Project Details */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 capitalize">{singleProject?.title}</h1>

          {/* Description List */}
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 capitalize">
            {descriptionList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {/* Project Links */}
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            {singleProject?.gitRepoLink && (
              <a
                href={singleProject.gitRepoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                View GitHub Repository
              </a>
            )}
            {singleProject?.deployed === 'yes' ? (
              <a
                href={singleProject.ProjectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700"
              >
                Visit Live Project
              </a>
            ) : (
              <p className="text-red-600 font-semibold">Not Deployed Yet</p>
            )}
          </div>

          {/* Stack & Technologies */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Stack</h2>
              <p className="text-gray-700">{singleProject?.stack}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Technologies</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 uppercase">
                {technologiesList.map((tech, index) => (
                  <li key={index}>{tech.trim()}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Deployment Status */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Deployment Status</h2>
            <p className={`text-lg ${singleProject?.deployed === 'yes' ? 'text-green-600' : 'text-red-600'}`}>
              {singleProject?.deployed === 'yes' ? 'Deployed' : 'Not Deployed'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewProject
