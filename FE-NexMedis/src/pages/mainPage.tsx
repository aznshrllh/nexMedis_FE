import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function MainPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
