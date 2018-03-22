var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
const _ = require('lodash');

const mcasData = require('./data/mcasData');

const rawDataToSanitizedDataKeyMap = {
  "School Name": 'schoolName',
  "School Code": 'schoolCode',
  "Subject": 'subject',
  "M+E #": 'metAndExceededCount',
  "M+E %": 'metAndExceededPercent',
  "E #": 'exceededCount',
  "E %": 'exceededPercent',
  "M #": 'metCount',
  "M %": 'metPercent',
  "PM #": 'partiallyMetCount',
  "PM %": 'partiallyMetPercent',
  "NM #": 'notMetCount',
  "NM %": 'notMetPercent',
  "Student Included": 'studentCount',
  "Avg. Scaled Score": 'averageScaledScore',
  "SGP": 'sgp',
  "Included In SGP": 'sgpCount',
  "Ach. PCTL": 'achPCTL'
}

const sanitizeMcasData = (mcasData) => {
  const sanitizedData = mcasData.map((school) => {
    const sanitizedSchoolObject = {};
    _.forOwn(school, (value, key) => {
      sanitizedSchoolObject[rawDataToSanitizedDataKeyMap[key]] = value;
    });

    return sanitizedSchoolObject;
  });
  return sanitizedData;
}

const convertMcasDataToHash = (mcasData) => {
  const hashedMcasData = {};
  mcasData.forEach(school => {
    const subject = school.subject;
    const schoolCode = school.schoolCode;
    if (!hashedMcasData[schoolCode]) {
      hashedMcasData[schoolCode] = {};
    };
    hashedMcasData[schoolCode][subject] = school;
  });

  return hashedMcasData;
}

const sanitizedMcasData = sanitizeMcasData(mcasData);
const hashedMcasData = convertMcasDataToHash(sanitizedMcasData);
const SchoolCodeType = graphql.GraphQLInt;

const schoolMcasDataType = new graphql.GraphQLObjectType({
  name: 'School',
  fields: {
    subject: { type: graphql.GraphQLString },
    schoolName: { type: graphql.GraphQLString },
    schoolCode: { type: SchoolCodeType },
    exceededPercent: { type: graphql.GraphQLInt },
    metPercent: { type: graphql.GraphQLInt },
    partiallyMetPercent: { type: graphql.GraphQLInt },
    notMetPercent: { type: graphql.GraphQLInt }
  }
});

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
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
