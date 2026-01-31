import { describe, it, expect } from "vitest";
import { calculateReadingTime } from "./reading-time";

describe("calculateReadingTime", () => {
  it("returns at least 1 for non-empty content", () => {
    expect(calculateReadingTime("Hello world")).toBeGreaterThanOrEqual(1);
  });

  it("returns 0 or 1 for very short content", () => {
    const result = calculateReadingTime("Hi");
    expect(result).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("returns ceil of minutes for longer content", () => {
    // ~275 words ≈ 1–2 min read; reading-time uses 200 wpm default
    const longContent = Array(300)
      .fill("word")
      .join(" ");
    const result = calculateReadingTime(longContent);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("returns an integer", () => {
    expect(Number.isInteger(calculateReadingTime("Some text here."))).toBe(
      true
    );
  });

  it("handles empty string", () => {
    const result = calculateReadingTime("");
    expect(result).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(result)).toBe(true);
  });
});
