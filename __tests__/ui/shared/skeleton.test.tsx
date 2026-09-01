import React from "react";
import { render } from "@testing-library/react-native";
import Skeleton from "@/ui/shared/skeleton";

describe("ui/shared / Skeleton", () => {
  it("usa los valores por defecto", () => {
    const { toJSON } = render(<Skeleton />);
    const tree = toJSON() as { props: { style: unknown[] } };

    expect(tree).toBeTruthy();
    expect(JSON.stringify(tree.props.style)).toContain('"width":"100%"');
    expect(JSON.stringify(tree.props.style)).toContain('"height":20');
  });

  it("respeta width, height y borderRadius recibidos", () => {
    const { toJSON } = render(
      <Skeleton width={120} height={40} borderRadius={12} />,
    );
    const style = JSON.stringify(
      (toJSON() as { props: { style: unknown } }).props.style,
    );

    expect(style).toContain('"width":120');
    expect(style).toContain('"height":40');
    expect(style).toContain('"borderRadius":12');
  });

  it("mezcla el style externo", () => {
    const { toJSON } = render(<Skeleton style={{ marginTop: 8 }} />);

    expect(JSON.stringify(toJSON())).toContain('"marginTop":8');
  });
});
