/**
 * @jest-environment jsdom
 */

"use strict";

import { calcDayDifference } from "../../../src/client/js/helpers/calcDayDiff";

describe("calcDayDifference helper func test suite.", () => {

  test("Check that calcDayDifference returns integer.", () => {
    const input = [new Date("2050-01-01"), Date.now()];

    expect(typeof calcDayDifference(...input)).toBe("number");

  });

  test("Ensure that calcDayDifference can return negative numbers.", () => {

    const input = [new Date("2050-01-01"), Date.now()];
    input.reverse();

    expect(calcDayDifference(...input)).toBeLessThan(0);
  });

});
