import React from "react";
import { PlusCircleIcon, MailIcon, FilePlus2 } from "lucide-react";
import { Input } from "./ui/input";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "./ui/textarea";

export default function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <SidebarMenuButton
                  tooltip="Quick Create"
                  className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                >
                  <PlusCircleIcon />
                  <span>Quick Create</span>
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create new job listing</DialogTitle>
                  <DialogDescription>
                    Please fill out the form to create a new job
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <form className="space-y-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="job-title">Job title</Label>
                      <Input
                        id="job-title"
                        type="text"
                        placeholder="ex. Software Engineer"
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="job-description">Job description</Label>
                      <Input
                        id="job-description"
                        type="text"
                        placeholder="Enter here a brief job description"
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="job-category">Job category</Label>
                      <Input
                        id="job-category"
                        type="text"
                        placeholder="ex. Software development"
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="job-location">Location</Label>
                      <Input
                        id="job-location"
                        type="text"
                        placeholder="ex. San Francisco, CA"
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="job-overview">Job overview</Label>
                      <Textarea placeholder="Type your message here." />
                      <p className="text-sm text-muted-foreground">
                        Your message will be copied to the support team.
                      </p>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="job-salary">Job salary</Label>
                      <Input
                        id="job-salary"
                        type="number"
                        placeholder="ex. $ 14,000"
                      />
                    </div>
                    <Button className="w-full mt-2">
                      Create job
                      <FilePlus2 />
                    </Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <Button
                  size="icon"
                  className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
                  variant="outline"
                >
                  <MailIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
