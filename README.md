# eschima-validator

> a simple json schema validators using ajv and ajv-errors

## Installation

To install and set up the library, run:

```sh
$ npm install eschima-validator
```

## Usage

```
const eschemaValidator = require("eschima-validator");

// Define Schema
const schema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 4,
      maxLength: 12,
      errorMessage: {
        type: "username must be string",
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    additionalProperties: "invalid input",
  },
};

const detailedValidator = new eschemaValidator(schema);
const simpleValidator = new eschemaValidator(schema, {
  details: false,
});

// Validate Body
app.use("/test", detailedValidator.body, (req, res) => {
  res.send({ message: "OK" });
});

// Validate Headers
app.use("/test2", detailedValidator.headers, (req, res) => {
  res.send({ message: "OK" });
});

// Validate Query
app.use("/test3", detailedValidator.query, (req, res) => {
  res.send({ message: "OK" });
});

```
