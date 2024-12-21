const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} Udit Singh. All Rights Reserved.</p>
        </div>
        <div className="flex space-x-4">
          {/* Social Media Links */}
          <a
            href="https://github.com/uditsinghs" // Update with your GitHub link
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-500 transition duration-300"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/your-profile/" // Update with your LinkedIn link
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-500 transition duration-300"
          >
            LinkedIn
          </a>
          <a
            href="mailto:your-email@example.com" // Update with your email
            className="text-gray-400 hover:text-teal-500 transition duration-300"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
