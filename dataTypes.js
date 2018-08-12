var graphql = require("graphql");

const { GraphQLList, GraphQLInt, GraphQLObjectType } = graphql;
const SchoolCodeType = graphql.GraphQLInt;

const districtType = new graphql.GraphQLObjectType({
  name: "District",
  fields: {
    name: { type: graphql.GraphQLString },
    code: { type: graphql.GraphQLInt }
  }
});

const schoolType = new GraphQLObjectType({
  name: "School",
  fields: {
    name: { type: graphql.GraphQLString },
    schoolCode: { type: GraphQLInt },
    districtCode: { type: GraphQLInt }
  }
});

const subjectType = new graphql.GraphQLEnumType({
  name: "Subject",
  values: {
    ELA: { value: "ELA" },
    MATH: { value: "MATH" }
  }
});

const studentGroupType = new graphql.GraphQLEnumType({
  name: "StudentGroup",
  values: {
    BLACK: { type: "BLACK" },
    ECONOMICALLY_DISADVANTAGED: { type: "ECONOMICALLY_DISADVANTAGED" },
    HIGH_NEEDS: { type: "HIGH_NEEDS" },
    ALL: { type: "ALL" }
  }
});

const mcasDataType = {
  subject: { type: subjectType },
  exceededPercent: { type: graphql.GraphQLInt },
  metPercent: { type: graphql.GraphQLInt },
  partiallyMetPercent: { type: graphql.GraphQLInt },
  notMetPercent: { type: graphql.GraphQLInt }
};

const districtMcasDataType = new graphql.GraphQLObjectType({
  name: "DistrictMcas",
  fields: {
    name: { type: graphql.GraphQLString },
    code: { type: SchoolCodeType },
    studentGroup: { type: studentGroupType },
    year: { type: graphql.GraphQLString },
    schools: {
      type: new GraphQLList(schoolType)
    },
    ...mcasDataType
  }
});

const schoolMcasDataType = new graphql.GraphQLObjectType({
  name: "SchoolMcas",
  fields: {
    name: { type: graphql.GraphQLString },
    code: { type: SchoolCodeType },
    ...mcasDataType
  }
});

module.exports = {
  districtMcasDataType: districtMcasDataType,
  schoolMcasDataType: schoolMcasDataType,
  districtType: districtType,
  subjectType,
  studentGroupType
};
