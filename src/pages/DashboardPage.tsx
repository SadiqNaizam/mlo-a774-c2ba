import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label'; // For Textarea
import { LogOut } from 'lucide-react';

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd also clear auth tokens, etc.
    console.log('User logging out...');
    navigate('/'); // Navigate to LoginPage as per App.tsx
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Welcome to Your Dashboard!
            </CardTitle>
            <CardDescription className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              You have successfully logged in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-gray-700 dark:text-gray-300">
              <p>This is your personal dashboard area. More features will be added soon!</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="userNotes" className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Notes</Label>
              <Textarea
                id="userNotes"
                placeholder="Jot down anything important..."
                className="min-h-[100px] resize-none bg-white dark:bg-slate-800 dark:text-gray-50"
              />
            </div>

            <Button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;