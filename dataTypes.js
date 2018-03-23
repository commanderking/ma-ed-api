var graphql = require('graphql');

const SchoolCodeType = graphql.GraphQLInt;

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
    schoolName: { type: graphql.GraphQLString },
    schoolCode: { type: SchoolCodeType },
    ...mcasDataType
  }
})

const schoolMcasDataType = new graphql.GraphQLObjectType({
  name: 'School',
  fields: {
    schoolName: { type: graphql.GraphQLString },
    schoolCode: { type: SchoolCodeType },
    ...mcasDataType
  }
});

module.exports = {
  districtMcasDataType: districtMcasDataType,
  schoolMcasDataType: schoolMcasDataType
}
