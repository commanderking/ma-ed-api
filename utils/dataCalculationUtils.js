const getMcasPassPercentage = mcas => {
  return mcas.metPercent + mcas.exceededPercent;
};

module.exports = {
  getMcasPassPercentage
};
