import { AppSidebar } from "@/components/app-sidebar";
import { MobileSideBarTrigger, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
export const metadata:Metadata={
  title:"Home Page",
  description:"This is home page for gym ai website"
}
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Toaster></Toaster>
      <main className="w-full h-full min-h-screen bg-blue-100  dark:bg-violet-900">
        <AppSidebar/>
        <MobileSideBarTrigger className="md:hidden block ml-5 mb-5 fixed z-10 top-5 right-5"/>
        {children}
       </main>
    </SidebarProvider>
  );
};

export default layout;
