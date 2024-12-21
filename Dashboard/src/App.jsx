import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword';
import ManageSkill from './pages/ManageSkill'
import ManageTimeline from './pages/ManageTimeline'
import ManageProject from './pages/ManageProject'
import ViewProject from './pages/ViewProject'
import UpdateProject from './pages/UpdateProject'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './slices/userSlice';
import { getAllMessages } from './slices/messageSlice';
import { getAllTimeline } from './slices/timelineSlice';
import { getAllSkills } from './slices/skillSlice';
import { getAllApplication } from './slices/applicationSlice';
import { getAllProject } from './slices/projectSlice';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
    dispatch(getAllMessages())
    dispatch(getAllTimeline())
    dispatch(getAllSkills())
    dispatch(getAllApplication())
    dispatch(getAllProject())
  }, [dispatch])
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/manage/skill" element={<ManageSkill />} />
          <Route path="/manage/timeline" element={<ManageTimeline />} />
          <Route path="/manage/project" element={<ManageProject />} />
          <Route path="/view/project/:id" element={<ViewProject />} />
          <Route path="/update/project/:id" element={<UpdateProject />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        theme='dark'
      />

    </div>
  );
};

export default App;
