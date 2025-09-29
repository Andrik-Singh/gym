import ModernNavbar from "@/components/Modern-Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <ModernNavbar/>
      </header>
      <main>{children}</main>
    </>
  );
};

export default layout;
