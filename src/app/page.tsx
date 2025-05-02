import Navbar from "@/component/Navbar";

export default function page() {
  return (
    <div className="w-full h-screen">
      <Navbar />
      {/* Main content */}
      <div className="w-full h-full flex items-center justify-center max-h-[calc(100vh_-_64px)]">
        <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      </div>
    </div>
  );
}
