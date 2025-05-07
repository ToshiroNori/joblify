import React, { useState, useEffect } from "react";
import { sendOTP, verifyOTP } from "@/features/auth/OTP/otpSlice";
import axios from "axios";
import Layout from "../layout/employer/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, AlertCircle, Check } from "lucide-react";

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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { toast } from "sonner";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useAuthGuard();
  const {
    loading: otp_loading,
    error: otp_error,
    success,
    verify_success,
  } = useSelector((state) => state.otp);
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
    if (verify_success) {
      navigate(0);
    }
  }, [verify_success, navigate]);

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
                {user?.isActivated
                  ? "Feel free to browse through the job listings and find the perfect match for you."
                  : "Activate your account first to browse through the job listings and find the perfect match for you."}
              </CardDescription>
              {!user?.isActivated && !verify_success && (
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
                  <CardDescription>
                    Didn't receive the OTP?
                    <Button
                      variant="link"
                      className="text-blue-500 cursor-pointer"
                      onClick={() => {
                        dispatch(sendOTP());
                      }}
                    >
                      Resend
                    </Button>
                  </CardDescription>

                  <Button
                    disabled={verify_success}
                    onClick={() => {
                      if (otp.length !== 6)
                        return toast.error("OTP must be exactly 6 digits");
                      if (/[A-Za-z]/.test(otp))
                        return toast.error(
                          "OTP must contain only digits (0–9)"
                        );
                      if (!otp_loading || !success) dispatch(verifyOTP(otp));
                    }}
                  >
                    {verify_success ? "Verified" : "Verify"}
                    <Check />
                  </Button>
                </CardContent>
              )}
            </CardHeader>
          </Card>
        </div>
        {user?.isActivated && (
          <div className="relative">
            <Input className="px-8" placeholder="Search here..." />
            <Search
              color="#2c2c2c"
              className=" absolute top-0 left-0 translate-y-1.5 translate-x-2"
            />
          </div>
        )}

        {user?.isActivated && (
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
                          <DialogDescription>
                            {job.description}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
