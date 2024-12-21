
import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    senderName: "",
    subject: "",
    message: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://myportfolio-1gyr.onrender.com/api/v1/message/sendmessage", formData, {
        withCredentials: true
      });
      setSuccessMessage("Message sent successfully!");
      setFormData({ senderName: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="w-full  bg-gray-900 text-white py-16" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="senderName" className="block text-gray-300 mb-2">Your Name</label>
            <input
              type="text"
              id="senderName"
              name="senderName"
              placeholder="Udit singh"
              value={formData.senderName}
              onChange={handleChange}
              className="w-full p-2 border text-black text-xl border-gray-600 rounded focus:outline-none focus:ring focus:ring-teal-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Project"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 border text-black text-xl border-gray-600 rounded focus:outline-none focus:ring focus:ring-teal-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Want to discuss with you related to a project"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border text-black text-xl border-gray-600 rounded focus:outline-none focus:ring focus:ring-teal-500"
              rows="4"
              required
            ></textarea>
          </div>
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            type="submit"
            className="py-2 px-4 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
