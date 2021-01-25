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

  it("should be able to validate whether a battery is charged or not", function () {
    let charged = batteries.getCharged();
    let notCharged;
    for (let i = 1; i <= 10; i++) {
      if (i !== charged[0] && i !== charged[1]) {
        notCharged = i;
        break;
      }
    }
    expect(batteries.isCharged(charged[0])).toBeTrue();
    expect(batteries.isCharged(charged[1])).toBeTrue();
    expect(batteries.isCharged(notCharged)).toBeFalse();
  });

  describe('should be able to be selected by', function() {
    it('selecting up to 2', function() {
      expect(batteries.getSelected()).toEqual([]);
      expect(batteries.isSelected(3)).toBeFalse();
      batteries.setSelected(3);
      expect(batteries.isSelected(3)).toBeTrue();
      expect(batteries.getSelected()).toEqual([3]);
      expect(batteries.isSelected(8)).toBeFalse();
      batteries.setSelected(8);
      expect(batteries.isSelected(8)).toBeTrue();
      expect(batteries.getSelected()).toEqual([3, 8]);
    })

    it('not selecting more than 2', function() {
      batteries.setSelected(2);
      batteries.setSelected(3);
      batteries.setSelected(5);
      expect(batteries.isSelected(2)).toBeTrue();
      expect(batteries.isSelected(3)).toBeTrue();
      expect(batteries.isSelected(5)).toBeFalse();
    });

    it('being able to deselect', function () {
      batteries.setSelected(3);
      batteries.setSelected(5);
      expect(batteries.isSelected(3)).toBeTrue();
      expect(batteries.isSelected(5)).toBeTrue();
      batteries.setUnselected(3);
      expect(batteries.isSelected(3)).toBeFalse();
      expect(batteries.isSelected(5)).toBeTrue();
    });

    it('being able to toggle selected/unselected', function() {
      batteries.toggleSelection(4);
      expect(batteries.isSelected(4)).toBeTrue();
      batteries.toggleSelection(4);
      expect(batteries.isSelected(4)).toBeFalse();
    });
  });

  it('should be able to check if the selected batteries are charged on not', function() {
    expect(batteries.checkSelectedAreCharged()).toBeFalse();
    batteries.setSelected(batteries.getCharged()[1]);
    batteries.setSelected(batteries.getCharged()[0]);
    expect(batteries.checkSelectedAreCharged()).toBeTrue();
  });

  it('should be able to check if at least one of the selected batteries is charged on not', function() {
    expect(batteries.checkOneSelectedIsCharged()).toBeFalse();
    batteries.setSelected(batteries.getCharged()[1]);
    expect(batteries.checkOneSelectedIsCharged()).toBeTrue();
  });
});
