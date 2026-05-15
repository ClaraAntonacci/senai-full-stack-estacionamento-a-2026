const prisma = require("../data/prisma");

const listarVeiculos = async (req, res) => {
    try {
        const veiculos = await prisma.veiculo.findMany({
            include: {
                estadias: true
            }
        });

        res.json(veiculos);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: "Erro ao listar veículos"
        });
    }
};

const buscarVeiculoPorId = async (req, res) => {
    const { id } = req.params;

    try {

        const veiculo = await prisma.veiculo.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                estadias: true
            }
        });

        if (!veiculo) {
            return res.status(404).json({
                erro: "Veículo não encontrado"
            });
        }

        res.json(veiculo);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao buscar veículo"
        });
    }
};

const buscarVeiculoPorPlaca = async (req, res) => {
    const { placa } = req.params;

    try {

        const veiculo = await prisma.veiculo.findUnique({
            where: {
                placa
            },
            include: {
                estadias: true
            }
        });

        if (!veiculo) {
            return res.status(404).json({
                erro: "Veículo não encontrado"
            });
        }

        res.json(veiculo);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao buscar veículo"
        });
    }
};

const cadastrarVeiculo = async (req, res) => {

    const {
        placa,
        modelo,
        marca,
        ano,
        cor,
        valorHora
    } = req.body;

    if (!placa || !modelo || !marca || !valorHora) {

        return res.status(400).json({
            erro: "placa, modelo, marca e valorHora são obrigatórios"
        });
    }

    try {

        const novoVeiculo = await prisma.veiculo.create({
            data: {
                placa,
                modelo,
                marca,
                ano: ano ? Number(ano) : null,
                cor: cor || null,
                valorHora: Number(valorHora)
            }
        });

        res.status(201).json(novoVeiculo);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao cadastrar veículo"
        });
    }
};

const atualizarVeiculo = async (req, res) => {

    const { id } = req.params;

    const {
        placa,
        modelo,
        marca,
        ano,
        cor,
        valorHora
    } = req.body;

    try {

        const veiculoAtualizado = await prisma.veiculo.update({
            where: {
                id: Number(id)
            },
            data: {
                placa,
                modelo,
                marca,
                ano,
                cor,
                valorHora
            }
        });

        res.json(veiculoAtualizado);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao atualizar veículo"
        });
    }
};

const excluirVeiculo = async (req, res) => {

    const { id } = req.params;

    try {

        await prisma.veiculo.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(204).send();

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao excluir veículo"
        });
    }
};

module.exports = {
    listarVeiculos,
    buscarVeiculoPorId,
    buscarVeiculoPorPlaca,
    cadastrarVeiculo,
    atualizarVeiculo,
    excluirVeiculo
};