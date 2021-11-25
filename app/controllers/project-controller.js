const project = require('../services/project-service');
const statusCode = require('../constants/constants');
const responseMessage = require('../constants/messages');

module.exports = {
  create: (req, res) => {
    const { users, ...body } = req.body;

    try {
      project.create(body, users, (err, data) => {
        if (err) {
          res.status(statusCode.INTERNAL_ERROR).json({
            message: responseMessage.INTERNAL_ERROR
          });
        } else
          res.status(statusCode.RESPONSE_OK_CREATED).json({
            message: responseMessage.RESPONSE_OK_CREATED,
            data
          });
      });
    } catch (error) {
      res
        .status(statusCode.INTERNAL_ERROR)
        .json(responseMessage.INTERNAL_ERROR);
    }
  },
  getAll: (req, res) => {
    let page = req.query.page;

    try {
      if (!page) {
        page = 1;
      }

      const limit = 10;
      const startIndex = (page - 1) * limit;

      project.getAll(req.query.name, limit, startIndex, (err, data) => {
        if (err) {
          res.status(responseMessage.INTERNAL_ERROR).json({
            message: responseMessage.INTERNAL_ERROR
          });
        }
        res.status(statusCode.RESPONSE_OK).json({
          limit,
          page,
          data
        });
      });
    } catch (error) {
      res
        .status(statusCode.INTERNAL_ERROR)
        .json(responseMessage.INTERNAL_ERROR);
    }
  },

  get: (req, res) => {
    try {
      project.getById(req.params.id, (err, data) => {
        if (err) {
          res.status(responseMessage.INTERNAL_ERROR).json({
            message: responseMessage.INTERNAL_ERROR
          });
        } else {
          if (!data) {
            res.status(statusCode.NOT_FOUND_ERROR).json({
              message: responseMessage.NOT_FOUND_ERROR
            });
          } else {
            res.status(statusCode.RESPONSE_OK).json({
              data
            });
          }
        }
      });
    } catch (error) {
      res
        .status(statusCode.INTERNAL_ERROR)
        .json(responseMessage.INTERNAL_ERROR);
    }
  },

  update: (req, res) => {
    const body = req.body;
    try {
      project.update(req.params.id, body, (err, data) => {
        if (err) {
          console.log(err);
          res.status(statusCode.INTERNAL_ERROR).json({
            message: responseMessage.INTERNAL_ERROR
          });
        } else {
          if (data) {
            res.status(statusCode.RESPONSE_OK).json({
              message: responseMessage.RESPONSE_OK_UPDATED
            });
          } else {
            res.status(statusCode.BAD_REQUEST_ERROR).json({
              message: responseMessage.BAD_REQUEST_ERROR
            });
          }
        }
      });
    } catch (error) {
      res
        .status(statusCode.INTERNAL_ERROR)
        .json(responseMessage.INTERNAL_ERROR);
    }
  },

  remove: (req, res) => {
    try {
      project.remove(req.params.id, (err, data) => {
        if (err) {
          res.status(responseMessage.INTERNAL_ERROR).json({
            message: responseMessage.INTERNAL_ERROR
          });
        }
        if (data) {
          res.status(statusCode.RESPONSE_OK).json({
            message: responseMessage.RESPONSE_OK_DELETED
          });
        } else {
          res.status(statusCode.BAD_REQUEST_ERROR).json({
            message: responseMessage.BAD_REQUEST_ERROR
          });
        }
      });
    } catch (error) {
      res
        .status(statusCode.INTERNAL_ERROR)
        .json(responseMessage.INTERNAL_ERROR);
    }
  }
};
