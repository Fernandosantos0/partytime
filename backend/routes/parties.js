const router = require('express').Router();

/* Importando os controllers */
const partyControllers = require('../controllers/partyController');

// Rotas
router.route('/parties').post((req, res) => partyControllers.create(req, res));
router.route('/parties').get((req, res) => partyControllers.getAll(req, res));
router.route('/parties/:id').get((req, res) => partyControllers.get(req, res));
router.route('/parties/:id').delete((req, res) => partyControllers.delete(req, res));
router.route('/parties/:id').patch((req, res) => partyControllers.update(req, res));

module.exports = router;
