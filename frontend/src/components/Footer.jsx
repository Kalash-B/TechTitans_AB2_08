import { FaFacebook, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">QUICK LINKS</h3>
            <ul>
              {["Home", "Buyer", "Seller", "Contact Us"].map((link) => (
                <li key={link} className="mb-2">
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-bold mb-4">ABOUT US</h3>
            <ul>
              {["Purpose", "Vision & Mission", "Partners", "Impact"].map(
                (item) => (
                  <li key={item} className="mb-2">
                    <a href="#">{item}</a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-bold mb-4">DOWNLOAD APP</h3>
            <p className="mb-2">For Buyer</p>
            <a href="#">
              <img
                src="https://storage.googleapis.com/a1aa/image/odaoj2kamDjIipDUKYejM6g-Ee5LLSBvt3FhCbXfyAU.jpg"
                alt="Google Play Store"
                width="150"
                height="50"
              />
            </a>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center">
            <img
              src="https://storage.googleapis.com/a1aa/image/foqHcDjYfb8CPH53Z9pVpGR7jfXmCQ0nc1wV3aDb7qA.jpg"
              alt="go4fresh logo"
              className="mb-4"
              width="100"
              height="100"
            />
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, index) => (
                <a key={index} className="text-2xl" href="#">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-10 border-t border-white pt-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-7">
            {[
              {
                icon: FaMapMarkerAlt,
                title: "Find Us",
                content: `Pimpri chinchwad College of Engineering & Research , Ravet.35 , Sector 30(A), Pune, Maharashtra, India - 411035.`,
              },
              {
                icon: FaPhoneAlt,
                title: "Call Us",
                content: "022-3457645876",
              },
              {
                icon: FaEnvelope,
                title: "Email Us",
                content: "contact@farm2home.in",
              },
            ].map(({ icon: Icon, title, content }, index) => (
              <div key={index} className="flex items-center">
                <Icon className="text-green-500 text-2xl mr-4" />
                <div>
                  <p className="font-bold">{title}</p>
                  <p>{content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-sm">
          <p>
            © Farm2Home 2021. All Rights Reserved. |{" "}
            {["FAQ's", "Disclaimer", "Terms & Conditions", "Sitemap", "Privacy Policy"].map((text, index) => (
              <span key={index}>
                <a href="#">{text}</a>
                {index < 4 && " | "}
              </span>
            ))}
          </p>
          <p>Designed & Developed by Pccoer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
