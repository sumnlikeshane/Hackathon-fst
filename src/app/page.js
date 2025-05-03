'use client';

import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="card max-w-2xl w-full p-8 space-y-6">
          {currentUser ? (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">
                  Welcome, <span className="text-accent">{currentUser.email.split('@')[0]}</span>
                </h1>
                <p className="text-gray-400 max-w-md mx-auto">
                  Your account has been successfully created. This is a placeholder for your dashboard content.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="card p-6 hover:border-accent/50 transition-colors">
                  <h3 className="text-lg font-medium mb-2">Account Overview</h3>
                  <p className="text-gray-400 text-sm">View and manage your account settings and preferences</p>
                </div>
                
                <div className="card p-6 hover:border-accent/50 transition-colors">
                  <h3 className="text-lg font-medium mb-2">Activity Dashboard</h3>
                  <p className="text-gray-400 text-sm">Track your recent activity and engagement</p>
                </div>
                
                <div className="card p-6 hover:border-accent/50 transition-colors">
                  <h3 className="text-lg font-medium mb-2">Notifications</h3>
                  <p className="text-gray-400 text-sm">Manage your notification preferences and alerts</p>
                </div>
                
                <div className="card p-6 hover:border-accent/50 transition-colors">
                  <h3 className="text-lg font-medium mb-2">Help & Support</h3>
                  <p className="text-gray-400 text-sm">Get help with any issues or questions you may have</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-center">Welcome to FST<span className="text-accent">App</span></h1>
              <p className="text-gray-400 text-center max-w-md mx-auto">
                Please sign up or log in to access your personalized dashboard and features.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                <Link
                  href="/login"
                  className="w-full sm:w-auto py-2 px-6 flex justify-center items-center rounded-md text-white bg-transparent hover:bg-primary/20 border border-primary/50 transition-colors"
                >
                  Log In
                </Link>
                
                <Link
                  href="/signup"
                  className="w-full sm:w-auto py-2 px-6 flex justify-center items-center rounded-md text-white bg-primary hover:bg-primary-hover transition-colors"
                >
                  Sign Up
                </Link>
              </div>
              
              <div className="mt-8 border-t border-border pt-6">
                <h3 className="text-xl font-semibold mb-4 text-center">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-accent">✓</div>
                    <div>
                      <h4 className="font-medium">Secure Authentication</h4>
                      <p className="text-sm text-gray-400">Safe and secure login powered by Firebase</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-accent">✓</div>
                    <div>
                      <h4 className="font-medium">Modern UI</h4>
                      <p className="text-sm text-gray-400">Beautiful dark theme interface</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} FSTApp. All rights reserved.
      </footer>
    </div>
  );
}
