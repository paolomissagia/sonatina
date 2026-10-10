/** Roman numerals for movement numbers, e.g. 4 → "IV". */
export function toRoman(n: number) {
  const parts: [number, string][] = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
  let out = ''
  for (const [value, numeral] of parts) {
    while (n >= value) {
      out += numeral
      n -= value
    }
  }
  return out
}
