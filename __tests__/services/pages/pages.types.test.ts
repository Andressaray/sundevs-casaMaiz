describe("services/pages / pages.types", () => {
  it("archivo de tipos puede ser importado", () => {
    expect(() => require("@/services/pages/pages.types")).not.toThrow();
  });
});
