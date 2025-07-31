import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="bg-white/90 shadow-sm backdrop-blur border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-2 text-orange-600">
            <BriefcaseBusiness className="h-6 w-6" />
            <span className="text-2xl font-bold tracking-tight">Hire Me</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-sm font-medium text-orange-600 hover:bg-orange-100">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="px-6 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Find The Right Job<br />Faster Than Ever
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join a trusted platform built for job seekers. Build your profile, explore roles that match your dream, and grow your career.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white text-base px-6 py-2">
                Get Started
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50 text-base px-6 py-2">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>

        {/* How It Works Section */}
        <section className="mt-24 max-w-4xl mx-auto text-center space-y-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-700">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm">
              <h3 className="text-lg font-semibold text-orange-600 mb-2">1. Create an Account</h3>
              <p className="text-sm text-gray-600">
                Sign up in minutes to start building your profile and get noticed by top employers.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm">
              <h3 className="text-lg font-semibold text-orange-600 mb-2">2. Build Your Profile</h3>
              <p className="text-sm text-gray-600">
                Showcase your experience, projects, and achievements to stand out in the crowd.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm">
              <h3 className="text-lg font-semibold text-orange-600 mb-2">3. Apply & Connect</h3>
              <p className="text-sm text-gray-600">
                Apply to curated jobs and connect with companies actively hiring your skills.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
