

#  Estacionamento ACME WEB

## Descrição do Projeto

O Estacionamento ACME é uma aplicação web desenvolvida para gerenciamento de veículos e estadias de um estacionamento.

O sistema permite cadastrar veículos, registrar entradas e saídas, calcular automaticamente o valor da estadia e visualizar todas as informações de forma simples e organizada.

O projeto foi desenvolvido utilizando HTML, CSS e JavaScript no front-end, juntamente com Node.js, Express, Prisma ORM e MySQL no back-end.

---

#  Funcionalidades

## Veículos
- Cadastro de veículos
- Listagem de veículos
- Busca de veículo por placa
- Atualização de veículos
- Exclusão de veículos

## Estadias
- Registro de entrada
- Registro de saída
- Listagem de estadias
- Cálculo automático do valor total
- Exclusão de estadias

---

# Tecnologias Utilizadas

## Back-end
- Node.js
- Express
- Prisma ORM
- MySQL

## Front-end
- HTML5
- CSS3
- JavaScript

## Ferramentas
- VSCode
- Insomnia
- GitHub

---

# Diagramas UML

## Diagrama de Classes

![Diagrama de Classes](./docs/der-dc.png)

---

## Diagrama de Casos de Uso

![Diagrama de Casos de Uso](docs/Diagrama-caso-de-uso.png)

---

## Diagrama de Atividades

![Diagrama de Atividades](docs/Diagrama-de-atividade.png)

---

#  Como Executar o Projeto

## 1 Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2 Entrar na pasta da API

```bash
cd api
```

---

## 3 Instalar dependências

```bash
npm install
```

---

## 4 Configurar o banco de dados

Criar arquivo `.env`

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/estacionamento"
```

---

## 5 Executar as migrations

```bash
npx prisma migrate dev
```

---

## 6 Iniciar servidor

```bash
npm run dev
```

Servidor:

```txt
http://localhost:3000
```

---

# Executar Front-end

Abrir o arquivo:

```txt
index.html
```

ou utilizar a extensão Live Server do VSCode.

---

#  Regras de Negócio

- Todos os veículos devem ser cadastrados no banco
- A entrada da estadia é gerada automaticamente
- A saída inicia nula
- O valor total inicia nulo
- O sistema calcula automaticamente o valor ao finalizar a estadia

---

#  Desenvolvido por

Clara Andrzejewsky Antonacci

Projeto desenvolvido para a Situação de Aprendizagem Full-stack - SENAI.
