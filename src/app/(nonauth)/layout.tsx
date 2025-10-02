import ModernNavbar from "@/components/Modern-Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="absolute top-0 w-full z-20">
        <ModernNavbar/>
      </header>
      <main className="-mt-5">{children}</main>
    </>
  );
};

export default layout;
