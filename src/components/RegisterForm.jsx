import React from "react";
import { countries } from "../lib/country";
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
import { Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";

export default function RegisterForm() {
  return (
    <div>
      <Card className="">
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
            <div className=" flex flex-col gap-4">
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
                <Label>Password</Label>
                <Input type="password" placeholder="*******" />
              </div>
              <div className="grid gap-2">
                <Label>Confirm password</Label>
                <Input type="password" placeholder="*******" />
              </div>
              <Select>
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
              <Button className="">
                Register
                <Send />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
