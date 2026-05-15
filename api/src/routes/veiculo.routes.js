const express = require("express");

const router = express.Router();

const {
    listarVeiculos,
    buscarVeiculoPorId,
    buscarVeiculoPorPlaca,
    cadastrarVeiculo,
    atualizarVeiculo,
    excluirVeiculo
} = require("../controllers/veiculo.controller");

router.get("/veiculos", listarVeiculos);

router.get("/veiculos/placa/:placa", buscarVeiculoPorPlaca);

router.get("/veiculos/:id", buscarVeiculoPorId);

router.post("/veiculos", cadastrarVeiculo);

router.put("/veiculos/:id", atualizarVeiculo);

router.delete("/veiculos/:id", excluirVeiculo);

module.exports = router;