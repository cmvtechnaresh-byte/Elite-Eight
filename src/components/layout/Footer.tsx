import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/elite-eight-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Elite Eight" className="h-10 w-auto brightness-0 invert" />
            <p className="text-sm opacity-80">
              Empowering organizations through strategic training, compliance, and talent solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Home</Link></li>
              <li><Link to="/about" className="text-sm opacity-80 hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/services" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Services</Link></li>
              <li><Link to="/blog" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Resources</Link></li>
              <li><Link to="/contact" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-sm opacity-80">Corporate Training</li>
              <li className="text-sm opacity-80">Compliance Training</li>
              <li className="text-sm opacity-80">Recruitment</li>
              <li className="text-sm opacity-80">Organizational Development</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm opacity-80">
                <Mail className="h-4 w-4" />
                Connect@eliteeight.in
              </li>
              <li className="flex items-center gap-2 text-sm opacity-80">
                <Phone className="h-4 w-4" />
                +91 9971359352
              </li>
              <li className="flex items-center gap-2 text-sm opacity-80">
                <MapPin className="h-4 w-4" />
                Mumbai & New Delhi, India
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Elite Eight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
