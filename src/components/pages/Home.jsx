import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout/employer/Layout";
import { useSelector } from "react-redux";
import JobCard from "../job-card";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useAuthGuard } from "@/hooks/authGuard";
import OtpForm from "../otp-form";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const { user, isAuthenticated, loading, error } = useAuthGuard();
  const [jobLoading, setJobLoading] = useState(true);
  const { loading: otp_loading, verify_success } = useSelector(
    (state) => state.otp
  );
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "https://jsonfakery.com/jobs/random/50",
        {
          withCredentials: false,
        }
      );
      setJobs(response.data);
      setJobLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (isAuthenticated && !loading) {
      fetchJobs();
    }
  }, [isAuthenticated, loading]);

  useEffect(() => {
    if (verify_success) {
      fetchJobs().then(() => setSearchTerm("")); // clear search input
    }
    console.log(verify_success);
  }, [verify_success]);

  if (jobLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          {/* Modern Spinner */}
          <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          {/* Loading Text */}
          <p className="text-lg font-semibold text-gray-600">
            Jobs is loading...
          </p>
        </div>
      </div>
    );
  }

  const filteredJobs = jobs.filter((job) => {
    return job.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Layout>
      <div className="px-4 space-y-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Welcome back {user?.name}</CardTitle>
              <CardDescription>
                {user?.isActivated || verify_success
                  ? "Feel free to browse through the job listings and find the perfect match for you."
                  : "Activate your account first to browse through the job listings and find the perfect match for you."}
              </CardDescription>
              {!user?.isActivated && !verify_success && (
                <OtpForm
                  verify_success={verify_success}
                  otp_loading={otp_loading}
                />
              )}
            </CardHeader>
          </Card>
        </div>
        {(user?.isActivated || verify_success) && (
          <div className="relative">
            <Input
              onChange={handleSearch}
              className="px-8"
              placeholder="Search here..."
            />
            <Search
              color="#2c2c2c"
              className=" absolute top-0 left-0 translate-y-1.5 translate-x-2"
            />
          </div>
        )}

        {(user?.isActivated || verify_success) && (
          <JobCard jobs={filteredJobs} user={user} />
        )}
      </div>
    </Layout>
  );
}
