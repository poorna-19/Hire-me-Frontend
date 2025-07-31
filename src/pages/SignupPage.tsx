import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BriefcaseBusiness } from "lucide-react";
import { toast } from "sonner";
import { signup } from "@/connecting/index";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    bio: "",
    role: "worker",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData)
        .then(() => {
          toast.success("Account created successfully!");
        })
        .catch((error) => {
          toast.error(error);
        });
      navigate("/login");
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-50 to-white px-4 py-10">
      <Card className="w-full max-w-md shadow-lg border border-orange-100 bg-white">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4 text-orange-700">
            <BriefcaseBusiness className="h-6 w-6" />
            <span className="text-2xl font-bold">Hire Me</span>
          </div>
          <CardTitle className="text-xl text-center text-orange-700 font-semibold">
            Create an account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700">
                Location
              </Label>
              <Input
                id="location"
                placeholder="Enter your location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-700">
                Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                required
              />
            </div>

            {/* User Type Radio Buttons */}
            <div className="space-y-2">
              <Label className="text-gray-700">User Type</Label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="worker"
                    checked={formData.role === "worker"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="accent-orange-600"
                  />
                  <span className="text-sm text-gray-700">Worker</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="contractor"
                    checked={formData.role === "contractor"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="accent-orange-600"
                  />
                  <span className="text-sm text-gray-700">Contractor</span>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium"
            >
              Sign Up
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 hover:underline font-semibold">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
