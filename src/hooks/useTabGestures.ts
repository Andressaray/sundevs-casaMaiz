import { useRef } from "react";
import {
  PanResponder,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from "react-native";
import {
  useNavigation,
  useNavigationState,
  type ParamListBase,
} from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type UseTabGesturesOptions = {
  threshold?: number;
  velocity?: number;
  onSwipe?: (_direction: "left" | "right") => void;
};

const ACTIVATION_DISTANCE = 12;
const DIRECTION_RATIO = 1.5;
const EDGE_DEAD_ZONE = 25;

export function useTabGestures({
  threshold = 50,
  velocity = 0.35,
  onSwipe,
}: UseTabGesturesOptions = {}) {
  const navigation = useNavigation<BottomTabNavigationProp<ParamListBase>>();

  const index = useNavigationState((state) => state.index);
  const routeNames = useNavigationState((state) => state.routeNames);
  const nestedDepth = useNavigationState(
    (state) => state.routes[state.index]?.state?.index ?? 0,
  );

  const latest = useRef({
    navigation,
    index,
    routeNames,
    nestedDepth,
    threshold,
    velocity,
    onSwipe,
  });
  latest.current = {
    navigation,
    index,
    routeNames,
    nestedDepth,
    threshold,
    velocity,
    onSwipe,
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,

      onMoveShouldSetPanResponder: (
        _event: GestureResponderEvent,
        gesture: PanResponderGestureState,
      ) => {
        if (latest.current.nestedDepth > 0) {
          return false;
        }

        const startX = gesture.moveX - gesture.dx;
        if (startX < EDGE_DEAD_ZONE && gesture.dx > 0) {
          return false;
        }

        return (
          Math.abs(gesture.dx) > ACTIVATION_DISTANCE &&
          Math.abs(gesture.dx) > Math.abs(gesture.dy) * DIRECTION_RATIO
        );
      },

      onPanResponderRelease: (
        _event: GestureResponderEvent,
        gesture: PanResponderGestureState,
      ) => {
        const current = latest.current;
        const confirmed =
          Math.abs(gesture.dx) > current.threshold ||
          Math.abs(gesture.vx) > current.velocity;

        if (!confirmed) {
          return;
        }

        const step = gesture.dx < 0 ? 1 : -1;
        const target = current.index + step;

        if (target < 0 || target >= current.routeNames.length) {
          return;
        }

        current.navigation.jumpTo(current.routeNames[target]);
        current.onSwipe?.(step === 1 ? "left" : "right");
      },
    }),
  ).current;

  return panResponder.panHandlers;
}

export default useTabGestures;
