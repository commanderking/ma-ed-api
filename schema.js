var graphql = require("graphql");
const {
  schoolMcasDataType,
  districtType,
  schoolType,
  subjectType,
  studentGroupType,
  createDistrictMcasDataType,
  districtTeacherSalaryType
} = require("./dataTypes");
const {
  sanitizeData,
  convertSchoolMcasDataToHash
} = require("./utils/sanitizeDataUtil");
const allDistricts = require("./data/allDistricts");

const { GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLString } = graphql;

// REMOVE once we refactor schoolMcas
const mcasData = require("./data/mcasData");
const sanitizedMcasData = sanitizeData(mcasData);
const hashedMcasData = convertSchoolMcasDataToHash(sanitizedMcasData);

const getDistrictCodeParameter = codes =>
  codes ? { "District Code": { $in: codes } } : {};

const getStudentGroupParameter = studentGroup =>
  studentGroup ? { "Student Group": studentGroup } : {};

const getSubjectParameter = subject => (subject ? { Subject: subject } : {});

// Define the Query type
const createQuery = db => {
  const districtMcasDataType = createDistrictMcasDataType(db);
  return new GraphQLObjectType({
    name: "MCASQuery",
    description:
      "API for getting School or District MCAS Data based on Massachusetts DOE data: http://profiles.doe.mass.edu/state_report/",
    fields: {
      allSchools: {
        description: "Gets list of all schools MCAS Data",
        type: new GraphQLList(schoolType),
        resolve: async () => {
          const schoolsCollection = db.collection("schools");
          return await schoolsCollection.find({}).toArray();
        }
      },
      allDistricts: {
        description: "Gets basic information about the district",
        type: new GraphQLList(districtType),
        resolve() {
          return allDistricts;
        }
      },
      school: {
        type: schoolMcasDataType,
        description: "DEPRECATED - DO NOT USE - Instead use schoolMcas",
        deprecationReason: "Should use schoolMcas",
        args: {
          schoolCode: { type: GraphQLInt },
          subject: { type: subjectType }
        },
        resolve: function(root, { subject, schoolCode }) {
          const schoolData = hashedMcasData[schoolCode][subject];
          return schoolData;
        }
      },
      schoolMcas: {
        type: new GraphQLList(schoolMcasDataType),
        description: "Gets MCAS Data for a school or multiple schools",
        args: {
          subject: { type: subjectType },
          schoolCodes: { type: new GraphQLList(GraphQLInt) }
        },
        resolve: async (root, { subject, schoolCodes }) => {
          const schoolMcasCollection = db.collection("schoolMcasData");
          const schoolMcasResults = await schoolMcasCollection
            .find({
              "School Code": { $in: schoolCodes },
              Subject: subject
            })
            .toArray();
          return sanitizeData(schoolMcasResults);
        }
      },
      districtMcas: {
        type: new GraphQLList(districtMcasDataType),
        description: "Gets MCAS Data for a district or multiple districts",
        args: {
          codes: { type: new GraphQLList(graphql.GraphQLInt) },
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

          return sanitizeData(districtMcasResults);
        }
      },
      teacherSalaries: {
        type: new GraphQLList(districtTeacherSalaryType),
        args: {
          codes: { type: new GraphQLList(graphql.GraphQLInt) }
        },
        resolve: async (root, { codes = [] }) => {
          const teacherSalariesCollection = db.collection("teacherSalaries");
          const teacherSalaries = await teacherSalariesCollection
            .find({ ...getDistrictCodeParameter(codes) })
            .toArray();
          return sanitizeData(teacherSalaries);
        }
      }
    }
  });
};

module.exports = {
  createQuery
};
