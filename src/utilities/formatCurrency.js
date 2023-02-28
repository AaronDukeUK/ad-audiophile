const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "GBP",
  style: "currency",
})

export function formatCurrency(number) {
  return CURRENCY_FORMATTER.format(number).replace(/(\.|,)00$/g, "")
}
