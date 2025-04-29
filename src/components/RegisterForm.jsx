import React, { useState } from "react";
import { countries } from "../lib/country";
import { Eye, EyeOff, Send } from "lucide-react";
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
  const [userRole, setUserRole] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [companySize, setCompanySize] = useState("");
  const [country, setCountry] = useState("");
  const [isMatch, setIsMatch] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setIsShowPassword((prevState) => !prevState);
  };
  const handlePassword2VisibilityToggle = () => {
    setIsShowPassword2((prevState) => !prevState);
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
          <form>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <div className="grid gap-2">
                  <Label>First name</Label>
                  <Input placeholder="John" />
                </div>
                <div className="grid gap-2">
                  <Label>Last name</Label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Choose your role</Label>
                <Select
                  id="role"
                  value={userRole}
                  onValueChange={(value) => {
                    setUserRole(value);
                    console.log(value);
                  }}
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
              {userRole === "employer" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="companyName">Company name</Label>
                    <Input
                      id="companyName"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="compSize">Company size</Label>
                    <Select
                      value={companySize}
                      onValueChange={(value) => setCompanySize(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">
                          201-500 employees
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
                    type={isShowPassword ? "text" : "password"} // Toggle password visibility
                    placeholder="*******"
                  />
                  {isShowPassword ? (
                    <Eye
                      className="absolute top-0 right-0 translate-y-1.5 -translate-x-2 cursor-pointer"
                      onClick={handlePasswordVisibilityToggle} // Toggle password visibility
                    />
                  ) : (
                    <EyeOff
                      className="absolute top-0 right-0 translate-y-1.5 -translate-x-2 cursor-pointer"
                      onClick={handlePasswordVisibilityToggle} // Toggle password visibility
                    />
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Confirm password</Label>
                <div className="relative">
                  <Input
                    type={isShowPassword2 ? "text" : "password"} // Toggle password visibility
                    placeholder="*******"
                  />
                  {isShowPassword2 ? (
                    <Eye
                      className="absolute top-0 right-0 translate-y-1.5 -translate-x-2 cursor-pointer"
                      onClick={handlePassword2VisibilityToggle} // Toggle password visibility
                    />
                  ) : (
                    <EyeOff
                      className="absolute top-0 right-0 translate-y-1.5 -translate-x-2 cursor-pointer"
                      onClick={handlePassword2VisibilityToggle} // Toggle password visibility
                    />
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Choose your country</Label>
                <Select
                  value={country}
                  onValueChange={(value) => setCountry(value)}
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
