import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  floating?: boolean;
}

const BackButton = ({ floating = false }: BackButtonProps) => {
  const navigate = useNavigate();

  if (floating) {
    return (
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Quay lại</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group mb-4"
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-medium">Quay lại</span>
    </button>
  );
};

export default BackButton;
