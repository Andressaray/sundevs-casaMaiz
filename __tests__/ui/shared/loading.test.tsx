import React from "react";
import { Text } from "react-native";
import { render, screen } from "@testing-library/react-native";
import Loading from "@/ui/shared/loading";

const children = <Text>contenido real</Text>;
const placeholder = <Text>cargando</Text>;

describe("ui/shared / Loading", () => {
  it("muestra el componente de carga cuando isLoading es true", () => {
    render(
      <Loading isLoading component={placeholder}>
        {children}
      </Loading>,
    );

    expect(screen.getByText("cargando")).toBeOnTheScreen();
    expect(screen.queryByText("contenido real")).toBeNull();
  });

  it("muestra los hijos cuando isLoading es false", () => {
    render(
      <Loading isLoading={false} component={placeholder}>
        {children}
      </Loading>,
    );

    expect(screen.getByText("contenido real")).toBeOnTheScreen();
    expect(screen.queryByText("cargando")).toBeNull();
  });
});
