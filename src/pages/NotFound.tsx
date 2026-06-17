import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-32 text-center">
      <div className="text-6xl font-black text-ink-200">404</div>
      <h1 className="mt-4 text-2xl font-bold text-ink-900">Page not found</h1>
      <p className="mt-2 text-ink-500">That route doesn't exist in the viewer.</p>
      <Link to="/" className="btn-primary mt-6">
        <Home size={18} /> Back to the method
      </Link>
    </div>
  );
}
