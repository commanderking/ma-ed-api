var graphql = require('graphql');

const SchoolCodeType = graphql.GraphQLInt;

const districtType = new graphql.GraphQLObjectType({
  name: 'District',
  fields: {
    name: { type: graphql.GraphQLString },
    code: { type: graphql.GraphQLInt }
  }
})

const mcasDataType = {
  subject: { type: graphql.GraphQLString },
  exceededPercent: { type: graphql.GraphQLInt },
  metPercent: { type: graphql.GraphQLInt },
  partiallyMetPercent: { type: graphql.GraphQLInt },
  notMetPercent: { type: graphql.GraphQLInt }
}

const districtMcasDataType = new graphql.GraphQLObjectType({
  name: 'District',
  fields: {
    name: { type: graphql.GraphQLString },
    code: { type: SchoolCodeType },
    studentGroup: { type: graphql.GraphQLString },
    year: { type: graphql.GraphQLString },
    ...mcasDataType
  }
})

const schoolMcasDataType = new graphql.GraphQLObjectType({
  name: 'School',
  fields: {
    name: { type: graphql.GraphQLString },
    code: { type: SchoolCodeType },
    ...mcasDataType
  }
});

module.exports = {
  districtMcasDataType: districtMcasDataType,
  schoolMcasDataType: schoolMcasDataType,
  districtType: districtType
}
