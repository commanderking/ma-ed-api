var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
const _ = require('lodash');
const mcasData = require('./data/mcasData');
const mcasDistrictAll2017Data = require('./data/mcasDistrictAll2017');
const allMcasDistrict2017Data = require('./data/allMcasDistrictData2017');
const { schoolMcasDataType, districtMcasDataType, districtType } = require('./dataTypes');
const { sanitizeMcasData } = require('./utils/sanitizeDataUtil');
const allDistricts = require('./data/allDistricts');
const PORT = process.env.PORT || 4000;

const convertMcasDataToHash = (mcasData) => {
  const hashedMcasData = {};
  mcasData.forEach(school => {
    const subject = school.subject;
    const schoolCode = school.code;
    if (!hashedMcasData[schoolCode]) {
      hashedMcasData[schoolCode] = {};
    };
    hashedMcasData[schoolCode][subject] = school;
  });

  return hashedMcasData;
}

const convertDistrictDataToHash = (mcasData) => {
  const hashedMcasData = {};
  mcasData.forEach(district => {
    const { code, subject, studentGroup } = district;
    if (!hashedMcasData[code]) {
      hashedMcasData[code] = {
        [studentGroup]: {
          [subject]: district
        }
      };
    } else if (!hashedMcasData[code][studentGroup]) {
      hashedMcasData[code] = {
        ...hashedMcasData[code],
        [studentGroup]: {
          [subject]: district
        }
      }
    } else if (!hashedMcasData[code][studentGroup][subject]) {
      hashedMcasData[code][studentGroup] = {
        ...hashedMcasData[code][studentGroup],
        [subject]: district
      }
    }
  });
  return hashedMcasData;
}

const sanitizedMcasData = sanitizeMcasData(mcasData);
const hashedMcasData = convertMcasDataToHash(sanitizedMcasData);

const sanitizedMcasDistrictData = sanitizeMcasData(allMcasDistrict2017Data);
const hashedDistrictData = convertDistrictDataToHash(sanitizedMcasDistrictData);

console.log('hashedDistrictData', hashedDistrictData);
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
    allSchoolsForSubject: {
      type: new graphql.GraphQLList(schoolMcasDataType),
      args: {
        subject: { type: graphql.GraphQLString }
      },
      resolve(_, {subject}) {
        return sanitizedMcasData.filter(school => {
          return school.subject === subject;
        });
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
    districtMcas: {
      type: schoolMcasDataType,
      args: {
        code: { type: graphql.GraphQLInt },
        subject: { type: graphql.GraphQLString },
        studentGroup: { type: graphql.GraphQLString }
      },
      resolve: function (_, { code, subject, studentGroup }) {
        const districtMcas = hashedDistrictData[code][studentGroup][subject];
        return districtMcas;
      }
    },
    schools: {
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
    schoolDistricts: {
      type: new graphql.GraphQLList(schoolMcasDataType),
      args: {
        subject: { type: graphql.GraphQLString },
        codes: { type: new graphql.GraphQLList(SchoolCodeType) }
      },
      resolve: function(_, {subject, codes}) {
        return codes.map((code) => {
          return hashedMcasData[code][subject];
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
