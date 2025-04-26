import React, { Children } from "react";
import { SidebarProvider, SidebarTrigger } from "../../ui/sidebar";
import AppSidebar from "../../AppSidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <main className="w-full">
        <div className="flex p-4">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
