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
const allDistricts = require("./data/allDistricts");

const SchoolCodeType = graphql.GraphQLInt;

// REMOVE once we refactor schoolMcas
const mcasData = require("./data/mcasData");
const sanitizedMcasData = sanitizeMcasData(mcasData);
const hashedMcasData = convertSchoolMcasDataToHash(sanitizedMcasData);

const getDistrictCodeParameter = codes =>
  codes ? { "District Code": { $in: codes } } : {};

const getStudentGroupParameter = studentGroup =>
  studentGroup ? { "Student Group": studentGroup } : {};

const getSubjectParameter = subject => (subject ? { Subject: subject } : {});

// Define the Query type
const createQuery = db => {
  const districtMcasDataType = createDistrictMcasDataType(db);
  return new graphql.GraphQLObjectType({
    name: "MCASQuery",
    description:
      "API for getting School or District MCAS Data based on Massachusetts DOE data: http://profiles.doe.mass.edu/state_report/",
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
        description: "DEPRECATED - DO NOT USE - Instead use schoolMcas",
        deprecationReason: "Should use schoolMcas",
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
        description: "Gets MCAS Data for a school or multiple schools",
        args: {
          subject: { type: subjectType },
          schoolCodes: { type: new graphql.GraphQLList(SchoolCodeType) }
        },
        resolve: async function(_, { subject, schoolCodes }) {
          const schoolMcasCollection = db.collection("schoolMcasData");
          const schoolMcasResults = await schoolMcasCollection
            .find({
              "School Code": { $in: schoolCodes },
              Subject: subject
            })
            .toArray();
          return sanitizeMcasData(schoolMcasResults);
        }
      },
      districtMcas: {
        type: new graphql.GraphQLList(districtMcasDataType),
        description: "Gets MCAS Data for a district or multiple districts",
        args: {
          codes: { type: new graphql.GraphQLList(graphql.GraphQLInt) },
          subject: { type: subjectType },
          studentGroup: { type: studentGroupType }
        },
        resolve: async (root, { codes = [], subject, studentGroup }) => {
          const districtMcasCollection = db.collection("districtMcas");
          const districtMcasResults = await districtMcasCollection
            .find({
              ...getDistrictCodeParameter(codes),
              ...getStudentGroupParameter(studentGroup),
              ...getSubjectParameter(subject)
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
