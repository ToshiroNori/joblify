import { useState, useEffect } from "react";
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

export default function RegisterForm() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    contact: "",
    companyName: "",
    companySize: "",
    country: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const {
      name,
      email,
      contact,
      password,
      confirmPassword,
      role,
      companyName,
      companySize,
      country,
    } = formData;
    if (
      !name ||
      !email ||
      !contact ||
      !password ||
      !confirmPassword ||
      !role ||
      !country
    ) {
      setError("Please fill in all fields");
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }
    if (role === "employer" && (!companyName || !companySize)) {
      setError("Please fill in all fields");
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handlePassword2VisibilityToggle = () => {
    setIsShowPassword2((prev) => !prev);
  };

  useEffect(() => {
    console.log("Form data:", formData);
  }, [formData]);

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
          <form>
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
                    <Label htmlFor="companyName">Company name</Label>
                    <Input
                      name="companyName"
                      placeholder="Enter your company name"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="companySize">Company size</Label>
                    <Select
                      value={formData.companySize}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, companySize: value }))
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
                    value={formData.password}
                    onChange={handleInputChange}
                    type={isShowPassword ? "text" : "password"}
                    placeholder="*******"
                  />
                  {isShowPassword ? (
                    <Eye
                      className="absolute top-0 right-0 translate-y-1.5 -translate-x-2 cursor-pointer"
                      onClick={handlePasswordVisibilityToggle}
                    />
                  ) : (
                    <EyeOff
                      className="absolute top-0 right-0 translate-y-1.5 -translate-x-2 cursor-pointer"
                      onClick={handlePasswordVisibilityToggle}
                    />
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Confirm password</Label>
                <div className="relative">
                  <Input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    type={isShowPassword2 ? "text" : "password"}
                    placeholder="*******"
                  />
                  {isShowPassword2 ? (
                    <Eye
                      className="absolute top-0 right-0 translate-y-1.5 -translate-x-2 cursor-pointer"
                      onClick={handlePassword2VisibilityToggle}
                    />
                  ) : (
                    <EyeOff
                      className="absolute top-0 right-0 translate-y-1.5 -translate-x-2 cursor-pointer"
                      onClick={handlePassword2VisibilityToggle}
                    />
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Choose your country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, country: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country, index) => (
                      <SelectItem key={index} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full mt-4">
                Register <Send />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
