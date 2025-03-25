// import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router";

export default function MainPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <Toaster /> */}
    </div>
  );
}
