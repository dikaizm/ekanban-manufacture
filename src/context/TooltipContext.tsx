import { ReactNode, useReducer } from "react";
import { TooltipContext } from "./utils/tooltipContext";

interface TooltipContextProviderStateType {
  photoelectric: boolean;
  camera: boolean;
  conveyor: boolean;
}

export function TooltipContextProvider({ children }: { children: ReactNode }) {

  const initialState: TooltipContextProviderStateType = {
    photoelectric: false,
    camera: false,
    conveyor: false
  };

  const [tooltipState, tooltipDispatch] = useReducer(sensorClickReducer, initialState);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function sensorClickReducer(state: TooltipContextProviderStateType, action: any) {
    switch (action.type) {
      case "CLICK_conveyor":
        return { conveyor: !state.conveyor, photoelectric: false, camera: false };
      case "CLICK_photoelectric":
        return { photoelectric: !state.photoelectric, conveyor: false, camera: false };
      case "CLICK_camera":
        return { camera: !state.camera, conveyor: false, photoelectric: false };
      default:
        return state;
    }
  }

  return (
    <TooltipContext.Provider value={{ tooltipState, tooltipDispatch }} >
      {children}
    </TooltipContext.Provider>
  );
}
