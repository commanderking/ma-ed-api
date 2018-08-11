var graphql = require("graphql");
const {
  schoolMcasDataType,
  districtMcasDataType,
  districtType,
  subjectType
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
        resolve(_) {
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
      school: {
        type: schoolMcasDataType,
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
        args: {
          codes: { type: new graphql.GraphQLList(graphql.GraphQLInt) },
          subject: { type: subjectType },
          studentGroup: { type: graphql.GraphQLString }
        },
        resolve: function(
          root,
          { codes, subject, studentGroup },
          context,
          info
        ) {
          // console.log(info.fieldNodes[0].selectionSet.selections);
          return codes.map(districtCode => {
            return hashedDistrictData[districtCode][studentGroup][subject];
          });
        }
      }
    }
  });
};

module.exports = {
  createQuery
};
