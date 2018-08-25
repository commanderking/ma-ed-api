const _ = require("lodash");

const rawDataToSanitizedDataKeyMap = {
  "School Name": "name",
  "School Code": "code",
  "District Name": "name",
  "District Code": "code",
  Subject: "subject",
  "M+E #": "metAndExceededCount",
  "M+E %": "metAndExceededPercent",
  "E #": "exceededCount",
  "E %": "exceededPercent",
  "M #": "metCount",
  "M %": "metPercent",
  "PM #": "partiallyMetCount",
  "PM %": "partiallyMetPercent",
  "NM #": "notMetCount",
  "NM %": "notMetPercent",
  "Student Included": "studentCount",
  "Avg. Scaled Score": "averageScaledScore",
  SGP: "sgp",
  "Included In SGP": "sgpCount",
  "Ach. PCTL": "achPCTL",
  "Student Group": "studentGroup",
  Year: "year",
  "Average Salary": "averageSalary"
};

const sanitizeData = mcasData => {
  const sanitizedData = mcasData.map(school => {
    const sanitizedSchoolObject = {};
    _.forOwn(school, (value, key) => {
      sanitizedSchoolObject[rawDataToSanitizedDataKeyMap[key]] = value;
    });

    return sanitizedSchoolObject;
  });
  return sanitizedData;
};

const convertSchoolMcasDataToHash = mcasData => {
  const hashedMcasData = {};
  mcasData.forEach(school => {
    const subject = school.subject;
    const schoolCode = school.code;
    if (!hashedMcasData[schoolCode]) {
      hashedMcasData[schoolCode] = {};
    }
    hashedMcasData[schoolCode][subject] = school;
  });

  return hashedMcasData;
};

const convertDistrictDataToHash = mcasData => {
  const hashedMcasData = {};
  mcasData.forEach(district => {
    const { code, subject, studentGroup } = district;
    if (!hashedMcasData[code]) {
      hashedMcasData[code] = {
        [studentGroup]: {
          [subject]: district
        }
      };
    } else if (!hashedMcasData[code][studentGroup]) {
      hashedMcasData[code] = {
        ...hashedMcasData[code],
        [studentGroup]: {
          [subject]: district
        }
      };
    } else if (!hashedMcasData[code][studentGroup][subject]) {
      hashedMcasData[code][studentGroup] = {
        ...hashedMcasData[code][studentGroup],
        [subject]: district
      };
    }
  });
  return hashedMcasData;
};

const convertStringNumberWithCommaToNumber = stringNumberWithComma =>
  typeof stringNumberWithComma === "string"
    ? parseInt(stringNumberWithComma.replace(",", ""))
    : stringNumberWithComma;

module.exports = {
  sanitizeData,
  convertSchoolMcasDataToHash,
  convertDistrictDataToHash,
  convertStringNumberWithCommaToNumber
};
