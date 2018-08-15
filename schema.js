var graphql = require("graphql");
const {
  schoolMcasDataType,
  districtType,
  schoolType,
  subjectType,
  studentGroupType,
  createDistrictMcasDataType
} = require("./dataTypes");
const {
  sanitizeMcasData,
  convertSchoolMcasDataToHash
} = require("./utils/sanitizeDataUtil");
const mcasData = require("./data/mcasData");
const allDistricts = require("./data/allDistricts");

const SchoolCodeType = graphql.GraphQLInt;

const sanitizedMcasData = sanitizeMcasData(mcasData);
const hashedMcasData = convertSchoolMcasDataToHash(sanitizedMcasData);

const _ = require("lodash");

// Define the Query type
const createQuery = db => {
  const districtMcasDataType = createDistrictMcasDataType(db);
  return new graphql.GraphQLObjectType({
    name: "MCASQuery",
    description:
      "API for getting School or District Data based on Massachusetts DOE data: http://profiles.doe.mass.edu/state_report/",
    fields: {
      allSchools: {
        description: "Gets list of all schools MCAS Data",
        type: new graphql.GraphQLList(schoolType),
        resolve: async () => {
          const schoolsCollection = db.collection("schools");
          return await schoolsCollection.find({}).toArray();
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
      districtMcasAll: {
        type: new graphql.GraphQLList(districtMcasDataType),
        description: "Gets Mcas Data for a district or multiple districts",
        resolve: function() {
          return sanitizedMcasDistrictData;
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
          const districtMcasCollection = db.collection("districtMcas");
          const districtMcasResults = await districtMcasCollection
            .find({
              "District Code": { $in: codes },
              "Student Group": studentGroup,
              Subject: subject
            })
            .toArray();

          return sanitizeMcasData(districtMcasResults);
        }
      }
    }
  });
};

module.exports = {
  createQuery
};
