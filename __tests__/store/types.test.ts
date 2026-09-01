describe("store / types", () => {
  it("archivo de tipos puede ser importado", () => {
    expect(() => require("@/store/types")).not.toThrow();
  });
});
