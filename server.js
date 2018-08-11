require("dotenv").config();

var express = require("express");
var graphqlHTTP = require("express-graphql");
var graphql = require("graphql");

const { createQuery } = require("./schema");

const PORT = process.env.PORT || 4000;
const MongoClient = require("mongodb").MongoClient;

let db;
MongoClient.connect(
  `mongodb://jking:${
    process.env.MONGO_DB_PASSWORD
  }@ds011271.mlab.com:11271/ma-ed`,
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("ma-ed");

    var schema = new graphql.GraphQLSchema({ query: createQuery(db) });

    var app = express();

    app.use("/graphql", function(req, res, next) {
      // TEMPORARY FOR DEV ENVIRONMENTS TO HIT THIS
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
      );
      if (req.method === "OPTIONS") {
        res.sendStatus(200);
      } else {
        next();
      }
    });
    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        graphiql: true
      })
    );
    app.listen(PORT);
    console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
  }
);
