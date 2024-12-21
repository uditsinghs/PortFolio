import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectView from './pages/ProjectView'
import Footer from './pages/Footer'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/project/:id' element={<ProjectView />} />

        </Routes>
        <Footer />
        <ToastContainer />
      </Router>
    </div>
  )
}

export default App