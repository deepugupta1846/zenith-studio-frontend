import Header from "./Header";
import Sidebar from "./Sidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-auto">
        {/* Top navbar */}
        <Header />

        {/* Page content */}
        <main className="p-6 bg-base-200 h-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
