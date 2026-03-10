import { Monitor, Tablet } from "lucide-react";
import { useViewportMode, DeviceMode } from "@/contexts/ViewportContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const devices: { mode: DeviceMode; icon: typeof Monitor; label: string }[] = [
  { mode: "desktop", icon: Monitor, label: "PC" },
  { mode: "tablet", icon: Tablet, label: "Mobile" },
];

const DeviceSwitcher = () => {
  const { deviceMode, setDeviceMode } = useViewportMode();

  return (
    <div className="flex items-center gap-0.5 bg-secondary/50 rounded-full p-1 border border-border">
      {devices.map(({ mode, icon: Icon, label }) => (
        <Tooltip key={mode}>
          <TooltipTrigger asChild>
            <button
              onClick={() => setDeviceMode(mode)}
              className={`p-1.5 rounded-full transition-all duration-200 ${
                deviceMode === mode
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            {label}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default DeviceSwitcher;
