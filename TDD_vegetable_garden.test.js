const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./TDD_vegetable_garden.js");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        strong: -60,
        medium: -30,
        little: 0,
      },
      soil: {
        best: 10,
        medium: 0,
        poor: -25,
      },
    },
  };

  const environmentFactors = {
    sun: "low",
    wind: "medium",
    soil: "medium",
  };

  // test("Get yield for plant with no environment factors", () => {
  //   expect(getYieldForPlant(corn)).toBe(30);
  // });

  test("Get yield for plant with environment factors", () => {
    expect(getYieldForPlant(corn, environmentFactors)).toBeCloseTo(10.5, 2); //this test passes with a precision of 2 digits
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop", () => {
    const corn = {
      name: "corn",
      yield: 10,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          strong: -60,
          medium: -30,
          little: 0,
        },
        soil: {
          best: 10,
          medium: 0,
          poor: -25,
        },
      },
    };

    const input = {
      crop: corn,
      numCrops: 10,
    };

    const environmentFactors = {
      sun: "low",
      wind: "medium",
      soil: "medium",
    };

    // expect(getYieldForCrop(input)).toBe(30);
    expect(getYieldForCrop(input, environmentFactors)).toBeCloseTo(35, 2);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 35,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          strong: -60,
          medium: -30,
          little: 0,
        },
        soil: {
          best: 10,
          medium: 0,
          poor: -25,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 42,
      factor: {
        sun: {
          low: -40,
          medium: 0,
          high: 55,
        },
        wind: {
          strong: -30,
          medium: -10,
          little: 0,
        },
        soil: {
          best: 20,
          medium: 0,
          poor: -15,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      wind: "medium",
      soil: "medium",
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    // expect(getTotalYield({ crops })).toBe(23);
    expect(getTotalYield({ crops }, environmentFactors)).toBeCloseTo(106.61, 2);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -40,
          medium: 0,
          high: 55,
        },
        wind: {
          strong: -30,
          medium: -10,
          little: 0,
        },
        soil: {
          best: 20,
          medium: 0,
          poor: -15,
        },
      },
    };
    const crops = [{ crop: corn, numCrops: 0 }];

    const environmentFactors = {
      sun: "low",
      wind: "medium",
      soil: "medium",
    };

    //expect(getTotalYield({ crops })).toBe(0);
    expect(getTotalYield({ crops }, environmentFactors)).toBe(0);
  });
});

describe("getCostsForCrop", () => {
  test("Get cost for crop", () => {
    const corn = {
      name: "corn",
      numCrops: 230,
    };
    const costsCrop = {
      crop: corn,
      sowingCost: 1,
    };

    expect(getCostForCrop(costsCrop)).toBe(230);
  });
});

describe("getRevenueForCrop", () => {
  test("Get revenue for crop", () => {
    const apples = {
      name: "apples",
      numCrops: 5,
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          strong: -60,
          medium: -30,
          little: 0,
        },
        soil: {
          best: 10,
          medium: 0,
          poor: -25,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      wind: "medium",
      soil: "medium",
    };

    const revenue = {
      crop: apples,
      revenueACrop: 2,
    };

    // expect(getRevenueForCrop(revenue)).toBe(10);
    expect(getRevenueForCrop(revenue, environmentFactors)).toBe(105);
  });
});

describe("getProfitForCrop", () => {
  test("Get profit for crop", () => {
    const apples = {
      name: "apples",
      costForCrop: 1,
      numCrops: 20,
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          strong: -60,
          medium: -30,
          little: 0,
        },
        soil: {
          best: 10,
          medium: 0,
          poor: -25,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      wind: "medium",
      soil: "medium",
    };

    const revenue = {
      crop: apples,
      revenueACrop: 2,
      revenueForCrop: 1,
    };

    //expect(getProfitForCrop(revenue)).toBe(5);
    expect(getProfitForCrop(revenue, environmentFactors)).toBe(419);
  });
});

describe("getTotalProfit", () => {
  test("Get total profit", () => {
    const corn = {
      name: "corn",
      costForCrop: 28,
      numCrops: 5,
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          strong: -60,
          medium: -30,
          little: 0,
        },
        soil: {
          best: 10,
          medium: 0,
          poor: -25,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      costForCrop: 20,
      numCrops: 5,
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          strong: -60,
          medium: -30,
          little: 0,
        },
        soil: {
          best: 10,
          medium: 0,
          poor: -25,
        },
      },
    };
    const crops = [
      { crop: corn, revenueForCrop: 50, revenueACrop: 2},
      { crop: pumpkin, revenueForCrop: 40, revenueACrop: 2},
    ];

    const environmentFactors = {
      sun: "low",
      wind: "medium",
      soil: "medium",
    };

    //expect(getTotalProfit({ crops })).toBe(42);
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(162
      );
  });
});
