const _ = require('lodash');

const rawDataToSanitizedDataKeyMap = {
  "School Name": 'schoolName',
  "School Code": 'schoolCode',
  "District Name": 'districtName',
  "District Code": 'districtCode',
  "Subject": 'subject',
  "M+E #": 'metAndExceededCount',
  "M+E %": 'metAndExceededPercent',
  "E #": 'exceededCount',
  "E %": 'exceededPercent',
  "M #": 'metCount',
  "M %": 'metPercent',
  "PM #": 'partiallyMetCount',
  "PM %": 'partiallyMetPercent',
  "NM #": 'notMetCount',
  "NM %": 'notMetPercent',
  "Student Included": 'studentCount',
  "Avg. Scaled Score": 'averageScaledScore',
  "SGP": 'sgp',
  "Included In SGP": 'sgpCount',
  "Ach. PCTL": 'achPCTL',
  "Student Group": 'studentGroup',
  "Year": 'year'
}

const sanitizeMcasData = (mcasData) => {
  const sanitizedData = mcasData.map((school) => {
    const sanitizedSchoolObject = {};
    _.forOwn(school, (value, key) => {
      sanitizedSchoolObject[rawDataToSanitizedDataKeyMap[key]] = value;
    });

    return sanitizedSchoolObject;
  });
  return sanitizedData;
}

module.exports = {
  sanitizeMcasData
}
