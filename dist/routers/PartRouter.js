"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PartController_1 = require("../controllers/PartController");
const authenticationMiddleware_1 = require("../middlewares/authenticationMiddleware");
const router = (0, express_1.Router)();
const partController = new PartController_1.PartController();
router.get('/parts', authenticationMiddleware_1.authenticate, partController.getAllParts);
router.post('/parts', authenticationMiddleware_1.authenticate, partController.createPart);
router.get('/parts/:id', authenticationMiddleware_1.authenticate, partController.getPartById);
router.put('/parts/:id', authenticationMiddleware_1.authenticate, partController.updatePart);
router.delete('/parts/:id', authenticationMiddleware_1.authenticate, partController.deletePart);
exports.default = router;
