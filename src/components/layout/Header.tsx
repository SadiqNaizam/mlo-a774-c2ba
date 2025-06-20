import React from 'react';
import { Link } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Auth Header loaded');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-start">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-primary hover:text-primary/90">
          <LockKeyhole className="h-6 w-6" />
          <span>AuthFlow</span>
        </Link>
        {/* This header is minimalistic for authentication pages and does not contain extensive navigation links */}
      </div>
    </header>
  );
};

export default Header;