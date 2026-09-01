import * as ui from "@/components/ui";

describe("components/ui / barrel", () => {
  it("exporta los componentes de UI publicos", () => {
    expect(Object.keys(ui).sort()).toEqual(["Alert", "AlertsContainer"]);
  });

  it("cada export es un componente", () => {
    expect(typeof ui.Alert).toBe("function");
    expect(typeof ui.AlertsContainer).toBe("function");
  });
});
