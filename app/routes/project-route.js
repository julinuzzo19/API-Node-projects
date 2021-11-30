const express = require('express');
const router = express.Router();

const {
  create,
  get,
  getAll,
  update,
  remove
} = require('../controllers/project-controller');

router.post('/', create);
router.post('/:id', update);
router.get('/', getAll);
router.get('/:id', get);
router.delete('/:id', remove);

module.exports = router;

/**
 * @swagger
 * /projects:
 *  get:
 *    description: Use to request all projects
 *    responses:
 *      '200':
 *        description: A succesfull response
 *      '500':
 *        description: Internal error
 *    parameters:
 *      - in: query
 *        name: name
 *        type: string
 *        description: search for name of the project
 *      - in: query
 *        name: page
 *        type: int
 *        description: number of page
 *   
 *  post:
 *    description: Use to create project
 *    responses:
 *      '200':
 *        description: Created project
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal error
 *    requestBody:
 *      description: Contact object
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *            status:
 *              type: string
 *            project_manager:
 *              type: integer
 *            users:
 *              type: array
 *              items:
 *                type: integer
 * 
 * 
 * 
 * /projects/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *         example: 1
 *       required: true
 *   get:
 *      description: Use to request all projects
 *      responses:
 *        '200':
 *          description: A succesfull response
 *        '404':
 *          description: Not found project
 *
 *   delete:
 *      description: Delete project by id
 *      responses:
 *        '200':
 *          description: Delete succesfully
 *        '400':
 *          description: Project dont exists
 *   post:
 *      description: update project by id
 *      responses:
 *        '200':
 *          description: updated succesfully
 *        '400':
 *          description: Project dont exists
 *      requestBody:
 *        description: Contact object
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              status:
 *                type: string
 *              project_manager:
 *                type: integer
 *              users:
 *                type: array
 *                items:
 *                  type: integer
 *
 *
 */
