import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  BriefcaseBusiness,
  MapPinIcon,
  LightbulbIcon,
} from "lucide-react";
import { applyForPost, getAllPosts } from "@/connecting";
import Logout from "@/components/logout";

interface JobPost {
  _id: string;
  title: string;
  content: string;
  wantedLocation: string;
  wantedDate: string;
}

export default function MainPage() {
  const [posts, setPosts] = useState<JobPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      await getAllPosts()
        .then((response) => {
          setPosts(response.data);
        })
        .catch(() => {
          console.error("Failed to fetch posts.");
        });
    };
    fetchPosts();
  }, []);

  const apply = async (postId: string) => {
    try {
      await applyForPost(postId);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Failed to apply for post:", error);
      alert(error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur shadow-sm">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-2 text-orange-600">
            <BriefcaseBusiness className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">Hire Me</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-orange-600 hover:bg-orange-100">
                Dashboard
              </Button>
            </Link>
            <Logout />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 md:px-10 py-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 w-full">
          {/* Main jobs column */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-7 text-orange-700">Available Jobs</h1>
            <div className="grid gap-7 md:grid-cols-2">
              {posts?.length === 0 && (
                <span className="text-gray-500 text-lg">No job postings available right now.</span>
              )}
              {posts?.map((post) => (
                <Card key={post._id} className="rounded-2xl shadow-md border-orange-100 bg-white transition-all hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-orange-700">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">{post.content}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2 text-orange-400" />
                        {post.wantedLocation}
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-orange-400" />
                        {new Date(post.wantedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="mt-5">
                      <Button
                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold"
                        onClick={() => apply(post._id)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar: Application Tips */}
          <aside className="w-full md:w-80 flex-shrink-0">
            <div className="p-6 bg-orange-50 border-l-4 border-orange-400 rounded-2xl shadow">
              <div className="flex items-center mb-3">
                <LightbulbIcon className="h-6 w-6 text-orange-400 mr-2" />
                <span className="text-lg font-bold text-orange-700">Tips for Applicants</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Tailor your resume to each job for better results.</li>
                <li>• Write a concise, friendly cover letter.</li>
                <li>• Double-check application details before submitting.</li>
                <li>• Follow up after applying for important positions.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
