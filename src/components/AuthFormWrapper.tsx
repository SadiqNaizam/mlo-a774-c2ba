import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthFormWrapperProps {
  title: string;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  logo?: React.ReactNode;
  description?: string;
  className?: string; // Allow additional styling for the card
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  title,
  children,
  footerContent,
  logo,
  description,
  className,
}) => {
  console.log('AuthFormWrapper loaded for title:', title);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-stone-200 dark:from-slate-900 dark:to-stone-800 py-8 px-4 sm:px-6 lg:px-8">
      <Card className={`w-full max-w-md shadow-xl overflow-hidden ${className}`}>
        <CardHeader className="text-center p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/50">
          {logo && (
            <div className="mb-4 flex justify-center items-center h-12">
              {logo}
            </div>
          )}
          <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="p-6 sm:p-8 space-y-6">
          {children}
        </CardContent>
        {footerContent && (
          <CardFooter className="flex flex-col items-center justify-center p-4 sm:p-6 border-t bg-slate-50 dark:bg-slate-800/50 text-sm text-gray-600 dark:text-gray-400">
            {footerContent}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AuthFormWrapper;