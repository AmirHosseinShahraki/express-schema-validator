const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);

class Validator {
  /**
   *
   * @param {!object} schema
   * @param {object} config
   * @param {boolean} config.details
   */
  constructor(schema, config) {
    if (
      !config.hasOwnProperty("details") ||
      typeof config.details !== "boolean"
    ) {
      config.details = true;
    }
    this.schema = schema;
    this.validate = ajv.compile(this.schema);
    this.config = config;
    const valiateInLocation = (location, data, res, next) => {
      const valid = this.validate(data);
      if (valid) {
        next();
      } else {
        const ajvErrors = this.validate.errors;
        if (this.config.details) {
          res.status(400).send({ [location]: ajvErrors });
          return;
        }
        const errors = [];
        ajvErrors.forEach((ajvError) => {
          const error = {
            instance: ajvError.instancePath,
            message: ajvError.message,
          };
          errors.push(error);
        });
        res.status(400).send({ [location]: errors });
      }
    };
    this.body = (req, res, next) => {
      const data = req.body;
      valiateInLocation("body", data, res, next);
    };
    this.headers = (req, res, next) => {
      const data = req.headers;
      valiateInLocation("headers", data, res, next);
    };
    this.query = (req, res, next) => {
      const data = req.query;
      valiateInLocation("query", data, res, next);
    };
  }
}

module.exports = Validator;
