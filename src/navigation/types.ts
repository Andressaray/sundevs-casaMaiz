import { NavigationProp } from '@react-navigation/native';
import { type RouteValue } from './index';

export type RootNavigationProp = NavigationProp<
  Record<RouteValue, undefined>,
  RouteValue
>;
