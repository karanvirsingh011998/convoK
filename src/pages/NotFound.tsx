// src/pages/NotFound.js
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button
        className="mt-6"
        onClick={() => navigate("/")}
      >
        Go to Homepage
      </Button>
    </div>
  );
}
