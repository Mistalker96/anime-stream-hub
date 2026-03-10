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
        className="fixed top-20 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-background/40 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
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
