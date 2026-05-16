describe("Pokemon type tests", () => {
  it("Bulbasaur should have Grass type", () => {
    const bulbasaur = {
      name: "Bulbasaur",
      types: ["Grass", "Poison"],
    };

    expect(bulbasaur.types).toContain("Grass");
  });

  it("Charmander should have Fire type", () => {
    const charmander = {
      name: "Charmander",
      types: ["Fire"],
    };

    expect(charmander.types).toContain("Fire");
  });

  it("Squirtle should have Water type", () => {
    const squirtle = {
      name: "Squirtle",
      types: ["Water"],
    };

    expect(squirtle.types).toContain("Water");
  });
});
