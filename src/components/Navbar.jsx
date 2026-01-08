import { User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-end px-6">
      <div className="flex items-center gap-2 text-sm">
        <User size={18} />
        Admin
      </div>
    </header>
  );
}
