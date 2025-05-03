import { useState } from "react";
import { countries } from "../lib/country";
import { Eye, EyeOff, Send } from "lucide-react";
import { registerUser } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { toast } from "sonner";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    contact: "",
    company: "",
    company_size: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        name,
        contact,
        email,
        company,
        company_size,
        password,
        confirmPassword,
        role,
        location,
      } = formData;

      // Basic validation
      if (
        !name ||
        !email ||
        !contact ||
        !password ||
        !confirmPassword ||
        !role ||
        !location
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      // If role is 'employer', ensure company and company_size are filled out
      if (role === "employer" && (!company || !company_size)) {
        toast.error("Please complete all employer-specific fields.");
        return;
      }

      // Create the payload for registration
      let payload = { ...formData };

      // Remove company and company_size fields for candidates
      if (role === "candidate") {
        delete payload.company;
        delete payload.company_size;
      }

      // Dispatch the registration action with the correct payload
      await dispatch(registerUser(payload)).unwrap();
      toast.success("Registration successful!");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl text-center">JobLify</h1>
          </CardTitle>
          <CardDescription>
            <h2 className="text-center">Sign up to find work you love</h2>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label>Full name</Label>
                <Input
                  name="name"
                  placeholder="John"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Contact</Label>
                <Input
                  name="contact"
                  placeholder="ex. 0912542545"
                  value={formData.contact}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Choose your role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candidate">Candidate</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.role === "employer" && (
                <>
                  <div className="grid gap-2">
                    <Label>Company name</Label>
                    <Input
                      name="company"
                      placeholder="Enter your company name"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Company size</Label>
                    <Select
                      value={formData.company_size}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          company_size: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1–10 employees</SelectItem>
                        <SelectItem value="11-50">11–50 employees</SelectItem>
                        <SelectItem value="51-200">51–200 employees</SelectItem>
                        <SelectItem value="201-500">
                          201–500 employees
                        </SelectItem>
                        <SelectItem value="501+">501+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="grid gap-2">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    name="password"
                    type={isShowPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="*******"
                  />
                  {isShowPassword ? (
                    <Eye
                      className="absolute top-0 right-0 translate-y-1.5 -translate-x-2 cursor-pointer"
                      onClick={() => setIsShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <EyeOff
                      className="absolute top-0 right-0 translate-y-1.5 -translate-x-2 cursor-pointer"
                      onClick={() => setIsShowPassword((prev) => !prev)}
                    />
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Confirm password</Label>
                <div className="relative">
                  <Input
                    name="confirmPassword"
                    type={isShowPassword2 ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="*******"
                  />
                  {isShowPassword2 ? (
                    <Eye
                      className="absolute top-0 right-0 translate-y-1.5 -translate-x-2 cursor-pointer"
                      onClick={() => setIsShowPassword2((prev) => !prev)}
                    />
                  ) : (
                    <EyeOff
                      className="absolute top-0 right-0 translate-y-1.5 -translate-x-2 cursor-pointer"
                      onClick={() => setIsShowPassword2((prev) => !prev)}
                    />
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Choose your location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, location: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your location" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((location, index) => (
                      <SelectItem key={index} value={location.name}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full mt-4">
                Register <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
