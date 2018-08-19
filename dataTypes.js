var graphql = require("graphql");

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
  notMetPercent: { type: GraphQLInt }
};

const createDistrictMcasDataType = db =>
  new GraphQLObjectType({
    name: "DistrictMcas",
    fields: {
      name: { type: GraphQLString },
      code: { type: GraphQLInt },
      studentGroup: { type: studentGroupType },
      year: { type: GraphQLString },
      schools: {
        type: new GraphQLList(schoolType),
        resolve: async districtMcas => {
          console.log("making db call for schools");
          const schoolsCollection = db.collection("schools");
          const schools = await schoolsCollection
            .find({ districtCode: districtMcas.code })
            .toArray();
          return schools;
        }
      },
      ...mcasDataType
    }
  });

const schoolMcasDataType = new GraphQLObjectType({
  name: "SchoolMcas",
  fields: {
    name: { type: GraphQLString },
    code: { type: GraphQLInt },
    ...mcasDataType
  }
});

module.exports = {
  createDistrictMcasDataType,
  schoolMcasDataType,
  districtType,
  schoolType,
  subjectType,
  studentGroupType
};
