import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { clearAllErrors, deleteSkill, getAllSkills, resetSkill, updateSkill } from '../slices/skillSlice';
import { useEffect, useState } from "react";

const ManageSkill = () => {
  const [skillId, setSkillId] = useState(null);
  const [proficiency, setProficiency] = useState('');
  const { skill, error, loading, message } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteSkill(id));
    setSkillId(id);
  };

  const handleUpdate = (id) => {
    dispatch(updateSkill({ proficiency }, id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkill());
      dispatch(getAllSkills());
      setSkillId(null);
      setProficiency('');
    }
  }, [dispatch, message, error]);

  return (
    <div>

      {/* Header */}
      <div className="flex flex-col md:flex-row w-full justify-between h-20 bg-slate-100 items-center px-4">
        <h1 className="text-lg font-bold text-gray-700">Manage Skill</h1>
        <Link to="/" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 text-center mt-2 md:mt-0">
          Return To Dashboard
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-wrap justify-center gap-6 py-8">
        {skill && skill.length > 0 ? (
          skill.map((s) => (
            <div key={s._id} className="bg-white shadow-lg rounded-lg w-full sm:w-[300px] p-4 border">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{s.title}</h3>
                <img className="w-[40px] object-contain" src={s.svg.url} alt={s.title} />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Proficiency</label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={s._id === skillId ? proficiency : s.proficiency}
                  onChange={(e) => {
                    setProficiency(e.target.value);
                    setSkillId(s._id);
                  }}
                  placeholder="Enter proficiency"
                />
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-500 rounded-md text-white font-semibold hover:bg-red-600 py-2 px-4"
                >
                  {loading && s._id === skillId ? <SpecialLoadingButton content={"Deleting..."} /> : "DELETE"}
                </button>
                <button
                  onClick={() => handleUpdate(s._id)}
                  className="bg-green-500 rounded-md text-white font-semibold hover:bg-green-600 py-2 px-4"
                >
                  {loading && s._id === skillId ? <SpecialLoadingButton content={"Updating..."} /> : "UPDATE"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <span className="text-center font-bold text-3xl">No Skill to Show</span>
        )}
      </div>
    </div>
  );
};

export default ManageSkill;
