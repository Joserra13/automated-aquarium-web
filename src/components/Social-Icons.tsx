import { FaGithub, FaLinkedin } from "react-icons/fa";

// Define the SocialIcons component
export function SocialIcons() {
    return (
      <div className="flex gap-x-4">
        {/* LinkedIn icon */}
        <a
          href="https://www.linkedin.com/in/jos%C3%A9-ram%C3%B3n-h-572a86234/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-white hover:text-cyan-500" />
        </a>
        {/* GitHub icon */}
        <a
          href="https://github.com/Joserra13/automated-aquarium"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-white hover:text-cyan-500" />
        </a>
        {/* Add more social media icons as needed */}
      </div>
    );
  }
  