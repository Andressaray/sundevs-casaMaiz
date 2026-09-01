import BootstrapContext, {
  BootstrapContextType,
} from "@/context/BootstrapContext";
import { useContext } from "react";

const useBootstrap = (): BootstrapContextType => {
  const context = useContext(BootstrapContext);

  if (context === undefined) {
    throw new Error("useBootstrap must be used within a BootstrapProvider");
  }

  return context;
};

export default useBootstrap;
