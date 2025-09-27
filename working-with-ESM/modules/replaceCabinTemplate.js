const replaceCabinTemplate = (templateCabin, data) => {
  return templateCabin
    .replace(/{%NAME%}/g, data.name)
    .replace(/{%MAXCAPACITY%}/g, data.maxCapacity)
    .replace(/{%PRICE%}/g, data.regularPrice - data.discount);
};

export default replaceCabinTemplate;
