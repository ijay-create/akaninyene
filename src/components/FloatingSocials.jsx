import {
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const FloatingSocials = () => {
  return (
    <div className="floating-socials">

      {/* LinkedIn */}
      <a
        href="https://linkedin.com/in/akaninyeneudohspecial040289"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin />
      </a>

      {/* Email */}
      <a href="mailto:akaninyeneini.udoh@gmail.com">
        <FaEnvelope />
      </a>

      {/* Phone */}
      <a href="tel:+2348161112846">
        <FaPhone />
      </a>

    </div>
  );
};

export default FloatingSocials;