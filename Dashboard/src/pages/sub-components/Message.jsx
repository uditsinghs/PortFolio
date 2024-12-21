
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { clearMessageErrors, deleteMessage, getAllMessages, resetMessageSlice } from '../../slices/messageSlice';
import SpecialLoadingButton from './SpecialLoadingButton';

const Message = () => {

  const dispatch = useDispatch();
  const { message, error, loading, messages } = useSelector((state) => state.messages);

  const [deletingId, setDeletingId] = useState(null);



  const handleDelete = (id) => {
    setDeletingId(id);
    dispatch(deleteMessage(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessageSlice());
      dispatch(getAllMessages())
      setDeletingId(null);
    }
  }, [dispatch, error, message]);

  return (
    <div className="min-h-screen p-4 bg-gray-100">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && deletingId === null && (
          <div className="text-center col-span-full">
            <p className="text-blue-600 text-lg font-semibold">Loading messages...</p>
          </div>
        )}

        {messages && messages.length > 0 ? (
          messages.map((m) => (
            <div key={m._id} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-bold text-xl mb-2 text-blue-800">Sender: {m.senderName}</h2>
              <h3 className="font-semibold text-md mb-1 text-gray-700">Subject: {m.subject}</h3>
              <p className="text-gray-600 text-sm">{m.message}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(m._id)}
                  className="mt-2 py-1 px-2 bg-red-500 rounded-md hover:bg-red-700 duration-300 text-white"
                  disabled={deletingId === m._id}
                >
                  {deletingId === m._id ? (
                    <SpecialLoadingButton content="Deleting..." />
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">
            <p className="text-gray-500 text-lg">No Messages to show</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
