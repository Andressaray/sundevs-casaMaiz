import React from "react";

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
  component: React.ReactNode;
}

const Loading = ({ isLoading, children, component }: Props) => {
  return isLoading ? component : children;
};

export default Loading;
