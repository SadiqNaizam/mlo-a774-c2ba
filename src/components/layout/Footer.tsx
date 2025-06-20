import React from 'react';

const Footer: React.FC = () => {
  console.log('Auth Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p className="mb-4 md:mb-0 text-center md:text-left">
          &copy; {currentYear} AuthFlow. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          {/* Placeholder links; these routes are not defined in App.tsx */}
          <a href="/terms" className="hover:text-primary transition-colors">
            Terms
          </a>
          <a href="/privacy" className="hover:text-primary transition-colors">
            Privacy
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;