import { Search, User, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="navbar bg-base-100 border-b px-4">
      <div className="flex-1">
        <h1 className="text-xl font-bold text-brand">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-40 md:w-64"
          />
        </div>
        <div className="avatar">
          <div className="w-10 rounded-full ">
            <User size={34}/>
          </div>
        </div>
      </div>
    </header>
  );
}
