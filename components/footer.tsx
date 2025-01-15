import { GithubIcon } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <div className="text-center text-xs flex items-center justify-center gap-2 p-4">
      <span>Crafted with 💚 by Vinicius {'->'} </span>
      <a href="https://github.com/vinismachadoo">
        <GithubIcon className="w-4 h-4" />
      </a>
    </div>
  );
};

export default Footer;
