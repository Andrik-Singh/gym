import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <main>
        <AppSidebar/>
        <SidebarTrigger/>
        {children}
       </main>
    </SidebarProvider>
  );
};

export default layout;
