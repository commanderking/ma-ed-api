const mcasDistrictAll2017Data = require("./mcasDistrictAll2017");
const mcasDistrictEconomicallyDisadvantaged2017Data = require("./mcasDistrictEconomicallyDisadvantaged2017");
const mcasDistrictHighNeeds2017 = require("./mcasDistrictHighNeeds2017");
const mcasDistrictBlack2017 = require("./mcasDistrictBlack2017");
const mcasDistrictHispanic2017 = require("./mcasDistrictHispanic2017");
module.exports = [
  ...mcasDistrictAll2017Data,
  ...mcasDistrictEconomicallyDisadvantaged2017Data,
  ...mcasDistrictHighNeeds2017,
  ...mcasDistrictBlack2017,
  ...mcasDistrictHispanic2017
];
