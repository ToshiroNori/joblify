import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout/employer/Layout";
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

export default function Home() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get("https://jsonfakery.com/jobs/random/20");
      setJobs(response.data);
    };
    fetchJobs();
  }, []);
  useEffect(() => {
    console.log(jobs);
  }, [jobs]);
  return (
    <Layout>
      <div className="px-4 space-y-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Welcome back Daryl Sabado!</CardTitle>
              <CardDescription>
                Feel free to browse through the job listings and find the
                perfect match for you.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="relative">
          <Input className="px-8" placeholder="Search here..." />
          <Search
            color="#2c2c2c"
            className=" absolute top-0 left-0 translate-y-1.5 translate-x-2"
          />
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-4">
          {jobs.map((job, index) => (
            <div key={index} className="cursor-pointer">
              <Card>
                <CardHeader className="space-y-3">
                  <CardTitle className="text-2x1 ">{job.title}</CardTitle>
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
