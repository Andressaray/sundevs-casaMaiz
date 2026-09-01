describe("features/notfound/types / index", () => {
  it("archivo de tipos puede ser importado", () => {
    expect(() => require("@/features/notfound/types/index")).not.toThrow();
  });
});
