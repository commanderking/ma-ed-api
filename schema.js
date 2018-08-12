var graphql = require("graphql");
const {
  schoolMcasDataType,
  districtMcasDataType,
  districtType,
  subjectType,
  studentGroupType
} = require("./dataTypes");
const {
  sanitizeMcasData,
  convertDistrictDataToHash,
  convertSchoolMcasDataToHash
} = require("./utils/sanitizeDataUtil");
const mcasData = require("./data/mcasData");
const allMcasDistrict2017Data = require("./data/allMcasDistrictData2017");
const allDistricts = require("./data/allDistricts");

const SchoolCodeType = graphql.GraphQLInt;

const sanitizedMcasData = sanitizeMcasData(mcasData);
const hashedMcasData = convertSchoolMcasDataToHash(sanitizedMcasData);

const sanitizedMcasDistrictData = sanitizeMcasData(allMcasDistrict2017Data);
const hashedDistrictData = convertDistrictDataToHash(sanitizedMcasDistrictData);
const _ = require("lodash");

// Define the Query type
const createQuery = db => {
  console.log("db", db);
  return new graphql.GraphQLObjectType({
    name: "MCASQuery",
    description:
      "API for getting School or District Data based on Massachusetts DOE data: http://profiles.doe.mass.edu/state_report/",
    fields: {
      allSchools: {
        description: "Gets list of all schools MCAS Data",
        type: new graphql.GraphQLList(schoolMcasDataType),
        resolve() {
          return sanitizedMcasData;
        }
      },
      allDistricts: {
        description: "Gets basic information about the district",
        type: new graphql.GraphQLList(districtType),
        resolve() {
          return allDistricts;
        }
      },
      // DEPRECATED - should be replaced by schoolMCAS below, but still being used in some places
      // in front end code
      school: {
        type: schoolMcasDataType,
        description: "DEPRECATED - DO NOT USE",
        args: {
          schoolCode: { type: graphql.GraphQLInt },
          subject: { type: subjectType }
        },
        resolve: function(_, { subject, schoolCode }) {
          const schoolData = hashedMcasData[schoolCode][subject];
          return schoolData;
        }
      },
      schoolMcas: {
        type: new graphql.GraphQLList(schoolMcasDataType),
        description: "Gets Mcas Data for a school or multiple schools",
        args: {
          subject: { type: subjectType },
          schoolCodes: { type: new graphql.GraphQLList(SchoolCodeType) }
        },
        resolve: function(_, { subject, schoolCodes }) {
          return schoolCodes.map(schoolCode => {
            return hashedMcasData[schoolCode][subject];
          });
        }
      },
      districtMcas: {
        type: new graphql.GraphQLList(districtMcasDataType),
        description: "Gets Mcas Data for a district or multiple districts",
        args: {
          codes: { type: new graphql.GraphQLList(graphql.GraphQLInt) },
          subject: { type: subjectType },
          studentGroup: { type: studentGroupType }
        },
        resolve: async function(root, { codes, subject, studentGroup }) {
          // It's possible to see which fields are queried through
          // info.fieldNodes[0].selectionSet.selections (where info is 4th parametere in the resolve function);
          // Ideally, don't want to make the database call if the field is not queried,
          // possibly can move to own resolver? But then would need to pass db reference in

          const schoolsCollection = db.collection("schools");
          const schools = await schoolsCollection
            .find({ districtCode: { $in: codes } })
            .toArray();
          const districtMcas = await codes.map(districtCode => {
            return {
              ...hashedDistrictData[districtCode][studentGroup][subject],
              schools: schools.filter(
                school => school.districtCode === districtCode
              )
            };
          });

          return districtMcas;
        }
      }
    }
  });
};

module.exports = {
  createQuery
};
