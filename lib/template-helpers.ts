export function formatCurrencyRange(
  range?: string,
  currency?: string
): string | undefined {
  if (!range) return undefined;
  if (range.includes("–") || range.includes("-")) return range;
  if (!currency) return range;
  return `${currency}${range}`;
}
