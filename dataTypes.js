var graphql = require("graphql");
const {
  convertStringNumberWithCommaToNumber,
  sanitizeData
} = require("./utils/sanitizeDataUtil");
const {
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLEnumType
} = graphql;

const districtType = new GraphQLObjectType({
  name: "District",
  fields: {
    name: { type: GraphQLString },
    code: { type: GraphQLInt }
  }
});

const schoolType = new GraphQLObjectType({
  name: "School",
  fields: {
    name: { type: GraphQLString },
    schoolCode: { type: GraphQLInt },
    districtCode: { type: GraphQLInt }
  }
});

const subjectType = new GraphQLEnumType({
  name: "Subject",
  values: {
    ELA: { value: "ELA" },
    MATH: { value: "MATH" }
  }
});

const studentGroupType = new GraphQLEnumType({
  name: "StudentGroup",
  values: {
    BLACK: { type: "BLACK" },
    HISPANIC: { type: "HISPANIC" },
    ECONOMICALLY_DISADVANTAGED: { type: "ECONOMICALLY_DISADVANTAGED" },
    NON_ECONOMICALLY_DISADVANTAGED: { type: "ECONOMICALLY_DISADVANTAGED" },
    HIGH_NEEDS: { type: "HIGH_NEEDS" },
    ALL: { type: "ALL" }
  }
});

const mcasDataType = {
  subject: { type: subjectType },
  exceededPercent: { type: GraphQLInt },
  metPercent: { type: GraphQLInt },
  partiallyMetPercent: { type: GraphQLInt },
  notMetPercent: { type: GraphQLInt },
  studentCount: {
    type: GraphQLInt,
    resolve: mcas => convertStringNumberWithCommaToNumber(mcas.studentCount)
  }
};

const schoolMcasDataType = new GraphQLObjectType({
  name: "SchoolMcas",
  fields: {
    name: { type: GraphQLString },
    code: { type: GraphQLInt },
    ...mcasDataType
  }
});

const createSchoolWithMcasType = db =>
  new GraphQLObjectType({
    name: "SchoolWithMcasData",
    fields: {
      name: { type: GraphQLString },
      schoolCode: { type: GraphQLInt },
      districtCode: { type: GraphQLInt },
      // TODO: Right now only mcas All 2017 is in the db
      mcasAll2017: {
        type: schoolMcasDataType,
        resolve: async schoolMcas => {
          const schoolMcasCollection = db.collection("schoolMcasData");
          const schoolMcasResults = await schoolMcasCollection
            .find({
              "School Code": schoolMcas.schoolCode,
              Subject: schoolMcas.subject
            })
            .toArray();
          return sanitizeData(schoolMcasResults)[0];
        }
      }
    }
  });

const createDistrictMcasDataType = db =>
  new GraphQLObjectType({
    name: "DistrictMcas",
    fields: {
      name: { type: GraphQLString },
      code: { type: GraphQLInt },
      studentGroup: { type: studentGroupType },
      year: { type: GraphQLString },
      schools: {
        type: new GraphQLList(createSchoolWithMcasType(db)),
        resolve: async districtMcas => {
          console.log("making db call for schools");
          const schoolsCollection = db.collection("schools");
          const schools = await schoolsCollection
            .find({ districtCode: districtMcas.code })
            .toArray();

          // TODO: Might be a better way of passing the subject to createSchoolWithMcasType
          return schools.map(school => ({
            ...school,
            subject: districtMcas.subject
          }));
        }
      },
      ...mcasDataType
    }
  });

const districtTeacherSalaryType = new GraphQLObjectType({
  name: "teacherSalaries",
  fields: {
    name: { type: GraphQLString },
    averageSalary: { type: GraphQLString }
  }
});

module.exports = {
  createDistrictMcasDataType,
  schoolMcasDataType,
  districtType,
  schoolType,
  subjectType,
  studentGroupType,
  districtTeacherSalaryType
};
