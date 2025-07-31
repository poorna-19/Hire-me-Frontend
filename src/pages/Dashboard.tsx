import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";
import { toast } from "sonner";
import { createPost, getDashboard } from "@/connecting";
import Logout from "@/components/logout";
import { useSelector } from "react-redux";
import Image from "@/components/image.png";

export default function Dashboard() {
  const role = useSelector((state: any) => state.auth.userData.role);
  const [jobPost, setJobPost] = useState({
    title: "",
    content: "",
    wantedLocation: "",
    wantedDate: "",
  });

  const [data, setData] = useState<{ email: string; name: string; bio: string } | null>();

  useEffect(() => {
    const fetchDetails = async () => {
      await getDashboard()
        .then((response) => setData(response.data))
        .catch(() => toast.error("Failed to fetch dashboard data."));
    };
    fetchDetails();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost(jobPost)
        .then(() => {
          toast.success("Job posted successfully!");
          setJobPost({ title: "", content: "", wantedLocation: "", wantedDate: "" });
        })
        .catch(() => toast.error("Failed to post job. Please try again."));
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="border-b bg-white/90 backdrop-blur shadow-sm">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-2 text-orange-600">
            <BriefcaseBusiness className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">Hire Me</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link to="/jobs">
              <Button
                variant="ghost"
                className="text-orange-600 hover:bg-orange-100"
              >
                Browse Jobs
              </Button>
            </Link>
            <Logout />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 md:px-10 py-10 max-w-4xl mx-auto space-y-12">
        {/* Profile Card */}
        <Card className="shadow border-orange-100 rounded-xl bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <img
                src={Image}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover mb-3 shadow-sm"
              />
              <h2 className="text-xl font-semibold text-orange-700">{data?.name}</h2>
              <p className="text-sm text-gray-500">{data?.email}</p>
              <p className="mt-3 text-gray-600 text-sm italic">{data?.bio}</p>
            </div>
          </CardContent>
        </Card>

        {/* Job Posting Form (only for employers) */}
        {role !== "worker" && (
          <Card className="shadow border-orange-100 rounded-xl bg-white">
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-orange-700 mb-2">
                  Post a New Job Opportunity
                </h2>
                <p className="text-sm text-gray-600">
                  Reach thousands of potential candidates instantly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-gray-700">
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    className="mt-1"
                    value={jobPost.title}
                    onChange={(e) => setJobPost({ ...jobPost, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content" className="text-gray-700">
                    Job Description
                  </Label>
                  <Textarea
                    id="content"
                    className="mt-1"
                    rows={4}
                    value={jobPost.content}
                    onChange={(e) => setJobPost({ ...jobPost, content: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-gray-700">
                    Preferred Location
                  </Label>
                  <Input
                    id="location"
                    className="mt-1"
                    value={jobPost.wantedLocation}
                    onChange={(e) => setJobPost({ ...jobPost, wantedLocation: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="date" className="text-gray-700">
                    Deadline Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    className="mt-1"
                    value={jobPost.wantedDate}
                    onChange={(e) => setJobPost({ ...jobPost, wantedDate: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold"
                >
                  Post Job
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
