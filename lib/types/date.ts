import { z } from "zod";

/**
 * Validates that a string is non-empty and parseable as a date.
 * Used in frontmatter so that format(new Date(date), ...) never throws RangeError.
 */
export const parseableDateSchema = z
  .string()
  .min(1, "Date is required")
  .refine((s) => !Number.isNaN(new Date(s).getTime()), {
    message: "Invalid date format",
  });
