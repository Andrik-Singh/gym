import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <main className="w-full h-auto bg-zinc-100">
        <AppSidebar/>
        <SidebarTrigger/>
        {children}
       </main>
    </SidebarProvider>
  );
};

export default layout;
