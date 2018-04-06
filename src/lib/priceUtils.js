export function extractNumericPrice (literalPrice) {
  literalPrice = literalPrice.substr(1).split(',').join('')
  return parseInt(literalPrice)
}
