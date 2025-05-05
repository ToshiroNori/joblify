import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout/employer/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  BriefcaseBusiness,
  MapPin,
  MailOpen,
  HandCoins,
  Search,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useAuthGuard } from "@/hooks/authGuard";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Label } from "../ui/label";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useAuthGuard();
  const [otp, setOtp] = useState("");

  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://jsonfakery.com/jobs/random/5", {
        withCredentials: false,
      });
      setJobs(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (isAuthenticated && !loading) {
      fetchJobs();
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    console.log("Jobs fetched:", jobs);
    console.log("User data:", user);
  }, [jobs, otp]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="px-4 space-y-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Welcome back {user?.name}</CardTitle>
              <CardDescription>
                {user.isActivated
                  ? "Feel free to browse through the job listings and find the perfect match for you."
                  : "Activate your account first to browse through the job listings and find the perfect match for you."}
              </CardDescription>
              {!user.isActivated && (
                <CardContent className="space-y-4 mt-5">
                  <Label>One-Time Password</Label>
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>

                  <Button>Submit</Button>
                </CardContent>
              )}
            </CardHeader>
          </Card>
        </div>
        {user.isActivated && (
          <div className="relative">
            <Input className="px-8" placeholder="Search here..." />
            <Search
              color="#2c2c2c"
              className=" absolute top-0 left-0 translate-y-1.5 translate-x-2"
            />
          </div>
        )}

        <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-4">
          {jobs.map((job, index) => (
            <div key={index} className="cursor-pointer">
              <Card>
                <CardHeader className="space-y-3">
                  <CardTitle className="text-2xl ">{job.title}</CardTitle>
                  <CardDescription className="">
                    {job.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <BriefcaseBusiness className="shrink-0 w-5" />
                      <span className="line-clamp-1">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="shrink-0 w-5" />
                      <span className="line-clamp-1">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MailOpen className="shrink-0 w-5" />
                      <span className="line-clamp-1">{job.job_category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HandCoins className="shrink-0 w-5" />
                      <span className="font-semibold">
                        $ {job.salary_from} - {job.salary_to}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link">
                        <span className="underline cursor-pointer">
                          View more
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{job.title}</DialogTitle>
                        <DialogDescription>{job.description}</DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
