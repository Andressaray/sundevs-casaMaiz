import React from "react";
import { render, screen } from "@testing-library/react-native";
import ImageBlock from "@/components/blocks/imageBlock";
import { buildImageBlock } from "@tests/fixtures/blocks.fixture";
import { buildImageFixture } from "@tests/fixtures/image.fixture";

describe("components/blocks / ImageBlock", () => {
  it("muestra la caption cuando el CMS la envia", () => {
    render(<ImageBlock block={buildImageBlock()} />);

    expect(screen.getByText("Nuestro comal de barro")).toBeOnTheScreen();
  });

  it("prioriza mobileImage sobre image", () => {
    const mobile = buildImageFixture({
      id: "solo-movil",
      url: "https://cdn.casamaiz.test/media/movil.webp",
    });

    render(<ImageBlock block={buildImageBlock({ mobileImage: mobile })} />);

    expect(
      screen.UNSAFE_getByType(require("react-native").Image).props.source,
    ).toEqual({ uri: "https://cdn.casamaiz.test/media/movil.webp" });
  });

  it("cae a image cuando no hay mobileImage", () => {
    render(<ImageBlock block={buildImageBlock({ mobileImage: undefined })} />);

    expect(
      screen.UNSAFE_getByType(require("react-native").Image).props.source,
    ).toEqual({ uri: "https://cdn.casamaiz.test/media/plato.webp" });
  });

  it("devuelve una vista vacia si ninguna imagen tiene url", () => {
    const { toJSON } = render(
      <ImageBlock
        block={buildImageBlock({
          image: undefined as never,
          mobileImage: undefined,
        })}
      />,
    );

    expect(toJSON()).toBeTruthy();
    expect(screen.queryByText("Nuestro comal de barro")).toBeNull();
  });

  it("no rompe en modo fullBleed", () => {
    expect(() =>
      render(<ImageBlock block={buildImageBlock({ fullBleed: true })} />),
    ).not.toThrow();
  });
});
