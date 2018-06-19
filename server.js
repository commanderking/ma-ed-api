var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
const _ = require('lodash');
const mcasData = require('./data/mcasData');
const mcasDistrictAll2017Data = require('./data/mcasDistrictAll2017');
const allMcasDistrict2017Data = require('./data/allMcasDistrictData2017');
const { schoolMcasDataType, districtMcasDataType, districtType } = require('./dataTypes');
const { sanitizeMcasData, convertDistrictDataToHash, convertSchoolMcasDataToHash } = require('./utils/sanitizeDataUtil');
const allDistricts = require('./data/allDistricts');
const PORT = process.env.PORT || 4000;

const sanitizedMcasData = sanitizeMcasData(mcasData);
const hashedMcasData = convertSchoolMcasDataToHash(sanitizedMcasData);

const sanitizedMcasDistrictData = sanitizeMcasData(allMcasDistrict2017Data);
const hashedDistrictData = convertDistrictDataToHash(sanitizedMcasDistrictData);

const SchoolCodeType = graphql.GraphQLInt;

// Define the Query type
var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    allSchools: {
      type: new graphql.GraphQLList(schoolMcasDataType),
      resolve(_) {
        return sanitizedMcasData;
      }
    },
    allDistricts: {
      type: new graphql.GraphQLList(districtType),
      resolve(_) {
        return allDistricts;
      }
    },
    school: {
      type: schoolMcasDataType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        schoolCode: { type: graphql.GraphQLInt },
        subject: { type: graphql.GraphQLString },
      },
      resolve: function (_, {subject, schoolCode}) {
        const schoolData = hashedMcasData[schoolCode][subject];
        return schoolData;
      }
    },
    schoolMcas: {
      type: new graphql.GraphQLList(schoolMcasDataType),
      args: {
        subject: { type: graphql.GraphQLString },
        schoolCodes: { type: new graphql.GraphQLList(SchoolCodeType) }
      },
      resolve: function(_, {subject, schoolCodes}) {
        return schoolCodes.map((schoolCode) => {
          return hashedMcasData[schoolCode][subject];
        })
      }
    },
    districtMcas: {
      type: new graphql.GraphQLList(schoolMcasDataType),
      args: {
        codes: { type: new graphql.GraphQLList(graphql.GraphQLInt) },
        subject: { type: graphql.GraphQLString },
        studentGroup: { type: graphql.GraphQLString }
      },
      resolve: function (root, { codes, subject, studentGroup }, context, info) {
        return codes.map((districtCode) => {
          return hashedDistrictData[districtCode][studentGroup][subject]
        })
      }
    }
  }
});

var schema = new graphql.GraphQLSchema({query: queryType});

var app = express();

app.use("/graphql", function (req, res, next) {
  // TEMPORARY FOR DEV ENVIRONMENTS TO HIT THIS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(PORT);
console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
