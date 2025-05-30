import { Search, UserCircle } from "lucide-react";

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
          <div className="w-10 rounded-full ring ring-brand ring-offset-base-100 ring-offset-2">
            <img src="/images/user-placeholder.jpg" alt="User" />
          </div>
        </div>
      </div>
    </header>
  );
}
