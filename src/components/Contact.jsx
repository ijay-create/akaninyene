import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import "../styles/contact.css";

const Contact = () => {
  const form = useRef();

  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    setLoading(true);

      emailjs
        .sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
      .then(
        () => {
          alert("Message Sent Successfully");
          setLoading(false);
          form.current.reset();
        },
        () => {
          alert("Something went wrong");
          setLoading(false);
        }
      );
  };

  return (
    <section id="contact">
      <div className="container">

        <h2 className="section-title">
          Contact Me
        </h2>

        <div className="contact-wrapper">

          <div className="contact-info glass">

            <h3>
              Available for leadership,
              consulting, and enterprise
              reliability opportunities.
            </h3>

            <div className="info-item">
              <span>Email</span>
              <p>akaninyeneini.udoh@gmail.com</p>
            </div>

            <div className="info-item">
              <span>LinkedIn</span>
               <a
                    href="https://linkedin.com/in/akaninyeneudohspecial040289"
                    target="_blank"
                    rel="noreferrer"
                    className="linkedin-btn"
                >
                    Connect on LinkedIn
                </a>
            </div>

            

            <div className="info-item">
              <span>Phone</span>
              <p>+234 816 111 2846</p>
            </div>

            <div className="info-item">
              <span>Location</span>
              <p>Lagos, Nigeria</p>
            </div>

          </div>

          <form
            ref={form}
            onSubmit={sendEmail}
            className="contact-form glass"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="7"
              required
            ></textarea>

            <button type="submit">
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
};

export default Contact;