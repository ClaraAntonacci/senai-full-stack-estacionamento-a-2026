const prisma = require("../data/prisma");

const listarEstadias = async (req, res) => {

    try {

        const estadias = await prisma.estadia.findMany({
            include: {
                veiculo: true
            }
        });

        res.json(estadias);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao listar estadias"
        });
    }
};

const buscarEstadiaPorId = async (req, res) => {

    const { id } = req.params;

    try {

        const estadia = await prisma.estadia.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                veiculo: true
            }
        });

        if (!estadia) {

            return res.status(404).json({
                erro: "Estadia não encontrada"
            });
        }

        res.json(estadia);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao buscar estadia"
        });
    }
};

const cadastrarEstadia = async (req, res) => {

    const { veiculoId } = req.body;

    if (!veiculoId) {

        return res.status(400).json({
            erro: "veiculoId é obrigatório"
        });
    }

    try {

        const veiculo = await prisma.veiculo.findUnique({
            where: {
                id: Number(veiculoId)
            }
        });

        if (!veiculo) {

            return res.status(404).json({
                erro: "Veículo não encontrado"
            });
        }

        const novaEstadia = await prisma.estadia.create({
            data: {
                veiculoId: Number(veiculoId)
            },
            include: {
                veiculo: true
            }
        });

        res.status(201).json(novaEstadia);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao cadastrar estadia"
        });
    }
};

const atualizarEstadia = async (req, res) => {

    const { id } = req.params;
    const { saida } = req.body;

    try {

        const estadiaAtual = await prisma.estadia.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                veiculo: true
            }
        });

        if (!estadiaAtual) {

            return res.status(404).json({
                erro: "Estadia não encontrada"
            });
        }

        let dadosAtualizacao = {};

        if (saida) {

            const entrada = new Date(estadiaAtual.entrada);
            const dataSaida = new Date(saida);

            // VALIDAÇÃO
            if (dataSaida <= entrada) {

                return res.status(400).json({
                    erro: "Saída deve ser maior que entrada"
                });
            }

            const diferencaMs = dataSaida - entrada;

            const horas = Math.ceil(
                diferencaMs / (1000 * 60 * 60)
            );

            const valorTotal =
                horas * estadiaAtual.veiculo.valorHora;

            dadosAtualizacao.saida = dataSaida;

            dadosAtualizacao.valorTotal =
                Number(valorTotal.toFixed(2));
        }

        const estadiaAtualizada = await prisma.estadia.update({
            where: {
                id: Number(id)
            },
            data: dadosAtualizacao,
            include: {
                veiculo: true
            }
        });

        res.json(estadiaAtualizada);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao atualizar estadia"
        });
    }
};

const excluirEstadia = async (req, res) => {

    const { id } = req.params;

    try {

        await prisma.estadia.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(204).send();

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao excluir estadia"
        });
    }
};

module.exports = {
    listarEstadias,
    buscarEstadiaPorId,
    cadastrarEstadia,
    atualizarEstadia,
    excluirEstadia
};