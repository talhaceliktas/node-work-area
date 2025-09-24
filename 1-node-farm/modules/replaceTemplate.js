module.exports = (template, product) => {
  let output = template
    .replaceAll(/{%PRODUCTNAME%}/g, product.productName)
    .replaceAll(/{%IMAGE%}/g, product.image)
    .replaceAll(/{%PRICE%}/g, product.price)
    .replaceAll(/{%FROM%}/g, product.from)
    .replaceAll(/{%NUTRIENTS%}/g, product.nutrients)
    .replaceAll(/{%QUANTITY%}/g, product.quantity)
    .replaceAll(/{%DESCRIPTION%}/g, product.description)
    .replaceAll(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replaceAll(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};
