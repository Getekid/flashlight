describe("Batteries", function() {
  var batteries;

  beforeEach(function() {
    batteries = new Batteries();
  });

  it("should have two random different charged ones", function() {
    let charged = batteries.getCharged();
    // Ensure both values are an integer between 1 and 10;
    expect(Number.isInteger(charged[0])).toBeTrue();
    expect(charged[0]).toBeGreaterThanOrEqual(1);
    expect(charged[0]).toBeLessThanOrEqual(10);
    expect(Number.isInteger(charged[1])).toBeTrue();
    expect(charged[1]).toBeGreaterThanOrEqual(1);
    expect(charged[1]).toBeLessThanOrEqual(10);
    // Ensure they are different values.
    expect(charged[0]).not.toEqual(charged[1])
  });
});
