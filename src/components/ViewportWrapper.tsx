import { ReactNode } from "react";
import { useViewportMode } from "@/contexts/ViewportContext";

const viewportStyles: Record<string, { maxWidth: string; className: string }> = {
  desktop: { maxWidth: "100%", className: "" },
  tablet: { maxWidth: "768px", className: "shadow-2xl border-x border-border" },
  mobile: { maxWidth: "390px", className: "shadow-2xl border-x border-border" },
};

const ViewportWrapper = ({ children }: { children: ReactNode }) => {
  const { deviceMode } = useViewportMode();
  const style = viewportStyles[deviceMode];

  if (deviceMode === "desktop") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-muted/30 flex justify-center">
      <div
        className={`relative bg-background min-h-screen overflow-x-hidden overflow-y-auto w-full ${style.className}`}
        style={{ maxWidth: style.maxWidth }}
      >
        {children}
      </div>
    </div>
  );
};

export default ViewportWrapper;
