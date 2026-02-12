
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="HyperPlott Universal Logo"
  >
    <rect width="40" height="40" rx="10" fill="#2563EB" />
    <path
      d="M10 28V12M10 28H15M10 28L22 16M30 12V28M30 12H25M30 12L18 24"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="20" cy="20" r="3" fill="white" className="animate-pulse" />
  </svg>
);

export default Logo;
