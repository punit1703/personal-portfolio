'use client';

import Link from "next/link";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-border">
        <div>
          <h3 className="text-2xl font-bold">Punit Patel</h3>
          <p className="text-muted-foreground mt-2 mb-4">
            Python & Backend Developer | Building Smart Solutions with Code
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-3">Contact Me</h4>
          <div className="flex items-center text-muted-foreground gap-2 mb-2">
            <Mail className="w-5 h-5" />
            <span>punitr2006@gmail.com</span>
          </div>
          <div className="flex items-center text-muted-foreground gap-2">
            <MapPin className="w-5 h-5" />
            <span>Gandhinagar, Gujarat, India</span>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-3">Portfolio</h4>
          <p className="text-muted-foreground text-sm">
            Designed & coded with ❤️ using Next.js, Tailwind CSS & Formspree.
          </p>
        </div>
      </div>

      <div className="text-center pt-6 text-muted-foreground text-sm">
        © {new Date().getFullYear()} <span className="text-foreground">Punit Patel</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
