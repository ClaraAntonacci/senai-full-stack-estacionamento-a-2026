const api = "http://localhost:3000";

const formVeiculo = document.getElementById("formVeiculo");

const listaVeiculos = document.getElementById("listaVeiculos");

async function carregarVeiculos() {

    if (!listaVeiculos) return;

    const response = await fetch(`${api}/veiculos`);

    const veiculos = await response.json();

    listaVeiculos.innerHTML = "";

    veiculos.forEach((veiculo) => {

        listaVeiculos.innerHTML += `

            <div class="card">

                <h3>${veiculo.modelo}</h3>

                <p><strong>Placa:</strong> ${veiculo.placa}</p>

                <p><strong>Marca:</strong> ${veiculo.marca}</p>

                <p><strong>Ano:</strong> ${veiculo.ano || "-"}</p>

                <p><strong>Cor:</strong> ${veiculo.cor || "-"}</p>

                <p>
                    <strong>Valor Hora:</strong>
                    R$ ${veiculo.valorHora}
                </p>

                <button onclick="excluirVeiculo(${veiculo.id})">
                    Excluir
                </button>

            </div>
        `;
    });
}

if (formVeiculo) {

    formVeiculo.addEventListener("submit", async (e) => {

        e.preventDefault();

        const body = {
            placa: placa.value,
            modelo: modelo.value,
            marca: marca.value,
            ano: ano.value,
            cor: cor.value,
            valorHora: valorHora.value
        };

        const response = await fetch(`${api}/veiculos/cadastrar`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(body)
        });

        if (response.ok) {

            alert("Veículo cadastrado com sucesso!");

            formVeiculo.reset();

            carregarVeiculos();

        } else {

            const erro = await response.json();

            alert(erro.erro);
        }
    });
}

async function excluirVeiculo(id) {

    const confirmar = confirm(
        "Deseja excluir este veículo?"
    );

    if (!confirmar) return;

    await fetch(`${api}/veiculos/${id}`, {
        method: "DELETE"
    });

    carregarVeiculos();
}



const formEstadia = document.getElementById("formEstadia");

const listaEstadias = document.getElementById("listaEstadias");

const selectVeiculo = document.getElementById("veiculoId");

async function carregarSelectVeiculos() {

    if (!selectVeiculo) return;

    const response = await fetch(`${api}/veiculos`);

    const veiculos = await response.json();

    veiculos.forEach((veiculo) => {

        selectVeiculo.innerHTML += `
            <option value="${veiculo.id}">
                ${veiculo.modelo} - ${veiculo.placa}
            </option>
        `;
    });
}

async function carregarEstadias() {

    if (!listaEstadias) return;

    const response = await fetch(`${api}/estadias/listar`);

    const estadias = await response.json();

    listaEstadias.innerHTML = "";

    estadias.forEach((estadia) => {

        listaEstadias.innerHTML += `

            <div class="card">

                <h3>
                    ${estadia.veiculo.modelo}
                </h3>

                <p>
                    <strong>Placa:</strong>
                    ${estadia.veiculo.placa}
                </p>

                <p>
                    <strong>Entrada:</strong>
                    ${new Date(
                        estadia.entrada
                    ).toLocaleString()}
                </p>

                <p>
                    <strong>Saída:</strong>

                    ${
                        estadia.saida
                        ? new Date(
                            estadia.saida
                          ).toLocaleString()
                        : "Em aberto"
                    }
                </p>

                <p>
                    <strong>Valor Total:</strong>

                    ${
                        estadia.valorTotal
                        ? `R$ ${estadia.valorTotal}`
                        : "Não calculado"
                    }
                </p>

                ${
                    !estadia.saida
                    ? `
                        <button onclick="finalizarEstadia(${estadia.id})">
                            Finalizar Estadia
                        </button>
                    `
                    : ""
                }

                <button onclick="excluirEstadia(${estadia.id})">
                    Excluir
                </button>

            </div>
        `;
    });
}

if (formEstadia) {

    formEstadia.addEventListener("submit", async (e) => {

        e.preventDefault();

        const body = {
            veiculoId: Number(selectVeiculo.value)
        };

        await fetch(`${api}/estadias`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(body)
        });

        alert("Entrada registrada!");

        carregarEstadias();
    });
}

async function finalizarEstadia(id) {

    const agora = new Date().toISOString();

    await fetch(`${api}/estadias/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            saida: agora
        })
    });

    alert("Estadia finalizada!");

    carregarEstadias();
}

async function excluirEstadia(id) {

    const confirmar = confirm(
        "Deseja excluir esta estadia?"
    );

    if (!confirmar) return;

    await fetch(`${api}/estadias/${id}`, {
        method: "DELETE"
    });

    carregarEstadias();
}

carregarVeiculos();

carregarSelectVeiculos();

carregarEstadias();