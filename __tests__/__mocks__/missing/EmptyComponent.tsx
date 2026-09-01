import React from "react";
import { Pressable, Text, View } from "react-native";

export interface EmptyComponentProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  showBorder?: boolean;
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  showBorder,
}) => (
  <View
    testID="empty-component"
    accessibilityState={{ selected: !!showBorder }}
  >
    {icon ? <View testID="empty-component-icon">{icon}</View> : null}
    <Text testID="empty-component-title">{title}</Text>
    {description ? (
      <Text testID="empty-component-description">{description}</Text>
    ) : null}
    {actionLabel ? (
      <Pressable testID="empty-component-action" onPress={onAction}>
        <Text>{actionLabel}</Text>
      </Pressable>
    ) : null}
  </View>
);

export default EmptyComponent;
