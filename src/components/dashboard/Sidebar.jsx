import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, List, DockIcon, Timer } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "../../store/reducers/authSlice";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {user} = useSelector((state)=> state.auth)

  console.log(user)

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  useEffect(()=>{
    dispatch(getUserDetails())
  },[])

  return (
    <aside className="bg-white border-r w-64 h-screen p-4 flex flex-col">
      {/* Top: Logo + Menu */}
      <div className="flex-grow">
        <h2 className="text-2xl font-bold mb-8 text-brand">Zenith Studio</h2>
        <ul className="menu space-y-2">
          <li>
            <Link to="/dashboard/order-list/" className="flex items-center gap-2">
              <List size={18} />
              All Orders
            </Link>
          </li>
        </ul>
        {user && user.userType == "admin" && <ul className="menu space-y-2">
          <li>
            <Link to="/dashboard/pricing/" className="flex items-center gap-2">
              <FaRupeeSign size={18} />
              Pricing
            </Link>
          </li>
        </ul>}
        <ul className="menu space-y-2">
          <li>
            <Link to="/dashboard/pricing/" className="flex items-center gap-2">
              <DockIcon size={18} />
              Status
            </Link>
          </li>
        </ul>
        <ul className="menu space-y-2">
          <li>
            <Link to="/dashboard/pricing/" className="flex items-center gap-2">
              <Timer size={18} />
              History
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
