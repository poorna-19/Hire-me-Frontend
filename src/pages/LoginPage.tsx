import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BriefcaseBusiness } from "lucide-react";
import { toast } from "sonner";
import { login } from "@/connecting/index";
import { login as authLogin } from "@/store/authSlice";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData)
        .then((response) => {
          toast.success("Logged in successfully!");
          dispatch(authLogin(response.data));
          navigate("/jobs");
        })
        .catch((error) => {
          toast.error(error);
        });
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-50 to-white px-4">
      <Card className="w-full max-w-md shadow-lg border border-orange-100 bg-white">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center space-x-2 mb-4 text-orange-700">
            <BriefcaseBusiness className="h-6 w-6" />
            <span className="text-2xl font-bold">Hire Me</span>
          </div>
          <CardTitle className="text-xl text-center text-orange-700 font-semibold">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium"
            >
              Sign In
            </Button>
          </form>
          <div className="mt-5 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-600 hover:underline font-semibold">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
