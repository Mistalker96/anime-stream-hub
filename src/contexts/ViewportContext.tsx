import { createContext, useContext, useState, ReactNode } from "react";

export type DeviceMode = "desktop" | "tablet" | "mobile";

interface ViewportContextType {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
}

const ViewportContext = createContext<ViewportContextType>({
  deviceMode: "desktop",
  setDeviceMode: () => {},
});

export const useViewportMode = () => useContext(ViewportContext);

export const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");

  return (
    <ViewportContext.Provider value={{ deviceMode, setDeviceMode }}>
      {children}
    </ViewportContext.Provider>
  );
};
