const quickLinks = [
  { name: "Browse Artwork", href: "#artwork" },
  { name: "About Us", href: "#about" },
  { name: "Our Mission", href: "#mission" },
  { name: "Get Involved", href: "#involved" },
];

const supportLinks = [
  { name: "FAQs", href: "#faq" },
  { name: "Contact Us", href: "#contact" },
  { name: "Support", href: "#support" },
];
export const Footer = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">ArtBehindBars</h3>
          <p className="text-gray-400 leading-relaxed">
            Transforming lives through art and supporting incarcerated artists
            on their journey to rehabilitation.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Navigation</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-[#FFA66A] transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Information</h3>
          <ul className="space-y-2">
            {supportLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-[#FFA66A] transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Contact Us</h3>
          <div className="text-gray-400 space-y-2">
            <p>info@artbehindbars.com</p>
            <p>(555) 123-4567</p>
            <p>123 Reform Street</p>
            <p>New York, NY 10001</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">
          © 2026 ArtBehindBars. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="#privacy"
            className="text-gray-400 hover:text-[#FFA66A] text-sm transition-colors"
          >
            Privacy Policy
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="#terms"
            className="text-gray-400 hover:text-[#FFA66A] text-sm transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};
