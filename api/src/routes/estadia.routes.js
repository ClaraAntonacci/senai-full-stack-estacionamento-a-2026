const express = require("express");

const router = express.Router();

const {
    listarEstadias,
    buscarEstadiaPorId,
    cadastrarEstadia,
    atualizarEstadia,
    excluirEstadia
} = require("../controllers/estadia.controller");

router.get("/estadias/listar", listarEstadias);

router.get("/estadias/:id", buscarEstadiaPorId);

router.post("/estadias", cadastrarEstadia);

router.put("/estadias/:id", atualizarEstadia);

router.delete("/estadias/:id", excluirEstadia);

module.exports = router;