import React from "react";
import { Button } from "./ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog";

export default function JobCard({ jobs, user }) {
  return (
    <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-4">
      {jobs.map((job, index) => (
        <div key={index} className="cursor-pointer">
          <Card>
            <CardHeader className="space-y-3">
              <CardTitle className="text-2xl ">{job.title}</CardTitle>
              <CardDescription className="">{job.description}</CardDescription>
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
                    <span className="underline cursor-pointer">View more</span>
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
  );
}
