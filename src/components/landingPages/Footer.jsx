export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content px-4 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">Zenith Studio</h2>
          <p className="mt-2 text-sm">
            Capturing timeless memories with artistry and precision. Specializing in weddings, portraits, and events.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/order" className="hover:underline">Order</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Get in Touch</h3>
          <p className="text-sm">Email: <a href="mailto:info@zenithstudio.com" className="underline">info@zenithstudio.com</a></p>
          <p className="text-sm">Phone: +91 98765 43210</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-brand">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-brand">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-brand">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Zenith Studio. All rights reserved.
      </div>
    </footer>
  );
}
