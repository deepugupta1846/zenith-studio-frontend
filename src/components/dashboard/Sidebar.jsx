import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, List } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  return (
    <aside className="bg-white border-r w-64 h-screen p-4 flex flex-col">
      {/* Top: Logo + Menu */}
      <div className="flex-grow">
        <h2 className="text-2xl font-bold mb-8 text-brand">Zenith Studio</h2>
        <ul className="menu space-y-2">
          <li>
            <Link to="/dashboard/orders" className="flex items-center gap-2">
              <List size={18} />
              All Orders
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom: Profile + Logout */}
      <div className="space-y-2 border-t pt-4">
        <Link to="/dashboard/profile" className="flex items-center gap-2">
          <User size={18} />
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
