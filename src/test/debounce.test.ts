import { jest, describe, test, expect } from "@jest/globals";
import debounce from "../utils/debounce";

describe("debounce", function () {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");
  test("should debounce a function", function () {
    var callCount = 0;

    var debounced = debounce(
      function () {
        ++callCount;
      },
      100
    );

    debounced()
    jest.advanceTimersByTime(50);
    expect(callCount).toEqual(0)
    debounced()
    jest.advanceTimersByTime(101);
    debounced()
    expect(callCount).toEqual(1)
    jest.advanceTimersByTime(101);
    debounced()
    expect(callCount).toEqual(2)
  });
});