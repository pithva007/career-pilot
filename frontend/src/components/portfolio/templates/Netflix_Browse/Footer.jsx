import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, HelpCircle } from 'lucide-react';

export default function Footer({ socials, email }) {
  const [serviceCode, setServiceCode] = useState('Service Code');

  const handleServiceCodeClick = () => {
    if (serviceCode === 'Service Code') {
      setServiceCode('DEV-PORTFOLIO-4K-2026');
      setTimeout(() => {
        setServiceCode('Service Code');
      }, 5000);
    }
  };

  return (
    <footer className="w-full bg-[#141414] text-zinc-500 text-xs py-12 md:py-16 mt-12 select-none border-t border-zinc-900">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-6">
        
        {/* Social Icons Row */}
        <div className="flex items-center gap-6 text-white mb-2">
          {socials?.github && (
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {socials?.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {socials?.twitter && (
            <a
              href={socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
              title="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="hover:text-red-500 transition-colors"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Link Grid Column Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-6 font-medium">
          <div className="flex flex-col gap-3">
            <a href="#hero" className="hover:underline">Home (Feature)</a>
            <a href="#projects" className="hover:underline">Trending Projects</a>
            <a href="#skills" className="hover:underline">Core Skills</a>
            <a href="#experience" className="hover:underline">Career Episodes</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#testimonials" className="hover:underline">Critique & Reviews</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">System Status</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">API Reference</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Code Audits</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Help Center</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms of Use</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Statement</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Cookie Preferences</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Media Center</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Corporate Information</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Contact Production</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Investor Relations</a>
          </div>
        </div>

        {/* Service Code Button */}
        <div>
          <button
            onClick={handleServiceCodeClick}
            className="px-3 py-1.5 border border-zinc-600 hover:text-white hover:border-white transition-colors uppercase font-mono text-[10px] tracking-widest cursor-pointer select-none rounded bg-transparent"
          >
            {serviceCode}
          </button>
        </div>

        {/* Legal Text & Copyright credit */}
        <div className="flex flex-col gap-1 text-[10px] tracking-wide mt-2">
          <p className="font-semibold select-text">
            © 1997-2026 Devflix, Inc. (Powered by CareerPilot & React Engines).
          </p>
          <p className="text-zinc-600 select-text">
            This site is a custom cinematic portfolio built to satisfy GitHub issue #2005. All codebases are fully audited.
          </p>
        </div>

      </div>
    </footer>
  );
}
