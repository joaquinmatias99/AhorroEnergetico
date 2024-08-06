import { Router } from "express";
import { methods as logAccionController } from "../controllers/logAccion.controller";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   LogAccion:
 *     type: object
 *     properties:
 *       fecha:
 *        type: string
 *        description: fecha que se realizo la accion
 *       datosObtenidos:
 *        type: object
 *        description: datos recolectados por los cuales se realizo la accion
 *       accionId:
 *        type: integer
 *        description: Id que relaciona con la accion realizada
 *     required:
 *      - datosObtenidos
 *      - accionId
 *   
 */



router.get('/:operacion', logAccionController.getLogAccion);

/**
 *
 * api/logAcciones/{id}:
 *  get:
 *   summary: consulta una accion registrada
 *   tags: [LogAccion]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: id de una accion registrada
 *   
 */

// router.get("/:id", logAccionController.getAccion);

/**
 * @swagger
 * api/logAcciones/:
 *  post:
 *   summary: crea un nuevo registro de una accion realizada
 *   tags: [LogAccion]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *          schema:
 *              type : object
 *              $ref: '#/components/schemas/LogAccion'
 *  responses:
 *      200:
 *          description: Accion Logged
 *   
 */
router.post("/", logAccionController.addLogAccion);

/**
 * @swagger
 * api/logAcciones/{id}:
 *  put:
 *   summary: modifica una accion registrada
 *   tags: [LogAccion]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: id de una accion registrada
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *          schema:
 *              type : object
 *              $ref: '#/components/schemas/LogAccion'
 *   
 */
router.put("/", logAccionController.updateLogAccion);

/**
 * @swagger
 * api/logAcciones/{id}:
 *  delete:
 *   summary: elimina una accion registrada
 *   tags: [LogAccion]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       required: true
 *       description: id de una accion registrada
 *   
 */
router.delete("/:id", logAccionController.deleteAccion);

export default router;
