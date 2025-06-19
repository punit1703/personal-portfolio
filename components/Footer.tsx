import { Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--card)] text-[var(--card-foreground)] py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-[var(--muted)]">
        {/* Section 1: Brand and Bio */}
        <div>
          <h3 className="text-2xl font-bold">Punit Patel</h3>
          <p className="text-[var(--muted-foreground)] mt-2 mb-4">
            Python & Backend Developer | Building Smart Solutions with Code
          </p>
          <div className="flex gap-4 text-[var(--muted-foreground)]">
            <a href="https://github.com/punit1703" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 hover:text-[var(--foreground)] transition" />
            </a>
            <a href="https://www.linkedin.com/in/punit-patel-665ba8358" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 hover:text-[var(--foreground)] transition" />
            </a>
            <a href="https://instagram.com/punit_1703" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 hover:text-[var(--foreground)] transition" />
            </a>
          </div>
        </div>

        {/* Section 2: Navigation */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-[var(--muted-foreground)]">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Section 3: Contact */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Contact Me</h4>
          <div className="flex items-center gap-2 text-[var(--muted-foreground)] mb-2">
            <Mail className="w-5 h-5" />
            <span>punitr2006@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
            <MapPin className="w-5 h-5" />
            <span>Gandhinagar, Gujarat, India</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center pt-6 text-[var(--muted-foreground)] text-sm">
        © {new Date().getFullYear()} <span className="text-[var(--foreground)]">Punit Patel</span>. All rights reserved.
      </div>
    </footer>
  );
}
