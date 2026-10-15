
# Sistema de Gerenciamento de Estoque - Brechick

## Objetivo do Projeto

O sistema permite que usuários realizem:

- **Cadastro de produtos**
- **Listagem de produtos**
- **Edição de de produtos**
- **Cadastro de categorias**
- **Edição de categorias**
- **Listagem de produtos**
- **Autenticação de usuários (Login e Registro)**

## Tecnologias Utilizadas

### Frontend

- React
- React Router DOM
- Bootstrap (para estilização)

### Backend

- Node.js
- Express
- MongoDB (via Mongoose)
- JSON Web Token (JWT) para autenticação
- Bcrypt para hash de senhas
- Dotenv para variáveis de ambiente
- CORS

### Banco de Dados

- MongoDB (MongoDB Atlas ou local)

## Estrutura do Projeto

```
stack-MERN/
├── client/                # Frontend (React)
├── server/                # Backend (Node + Express)
│   ├── controllers/       # Lógica de negócios (funções das rotas)
│   ├── models/            # Modelos do MongoDB
│   ├── routes/            # Rotas da API (endpoints)
│   ├── middleware/        # Middlewares (ex.: autenticação JWT)
│   ├── config.js          # Centraliza a leitura das variáveis do .env (Ex.: JWT_SECRET, MONGO_URI)
│   ├── .env               # Variáveis de ambiente (não vai para o GitHub)
│   ├── server.js          # Arquivo principal que sobe o servidor
│   └── mongo.js           # Script de conexão com o MongoDB

```

## Instalação e Configuração 

- ***Clone o repositório***

```bash
git clone https://github.com/jbgoncalvess/stack-mern-agendamento
```
### Backend

1. Acesse a pasta `server`:

```bash
cd server
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na pasta `server` com as seguintes variáveis:

```
MONGO_URI=<sua_string_de_conexao_do_mongodb>
JWT_SECRET=<sua_chave_secreta_para_assinar_e_validar_os_tokens_de_autenticação>
PORT=<a_porta_na_qual_rodará_seu_backend>
```

#### **Como configurar o `MONGO_URI`:**

Formato padrão da string:

```bash
"mongodb+srv://<USUÁRIO>:<SENHA>@firstcluster.a7hehmz.mongodb.net/<NOME_DO_BANCO>?retryWrites=true&w=majority&appName=<CLUSTER>"
```

**Substitua:**

- `<USUARIO>` => Seu usuário do MongoDB Atlas
- `<SENHA>` => Sua senha do MongoDB Atlas
- `<CLUSTER>` => Nome do seu cluster (ex.: `FirstCluster`)
- `<NOME_DO_BANCO>` => Nome do seu banco de dados (ex.: `agendamentosDB`)


> **Atenção:**  
> O valor de **`JWT_SECRET`** deve ser uma chave **única e segura**, escolhida por cada aluno/dupla.
> Essa chave é usada para gerar e validar os **tokens de autenticação** e **não deve ser compartilhada publicamente, nem versionada no GitHub**.  
> Recomenda-se usar uma sequência forte de caracteres, como letras, números e símbolos.
> Além disso, não adicione sua string de conexão com o MongoDB contendo usuário e senha no código-fonte.


4. Inicie o servidor:

```bash
npm start
```

O backend rodará em: `http://localhost:${PORT}`

### Frontend

1. Acesse a pasta `client`:

```bash
cd client
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o frontend:

```bash
npm start
```

O frontend estará disponível em: `http://localhost:3000`.

## Funcionalidades

- **Autenticação:**
  - Login e cadastro com segurança usando JWT e bcrypt.

- **Cadstro:**
  - Criar, listar, editar e excluir agendamentos.

- **Filtros:**
  - Filtragem de produtos por (menor preço, Maior preço e estado de concervação)

- **Proteção de rotas:**
  - Apenas usuários autenticados acessam funcionalidades.

## Segurança

- As senhas dos usuários são armazenadas de forma segura usando **bcrypt** (hashing).
- As rotas da API são protegidas usando **JWT** (JSON Web Token).
- Apenas usuários autenticados podem criar, editar, excluir ou visualizar seus próprios agendamentos.



## Licença

Este projeto é de uso **livre**.

## Desenvolvido por

**Oreste Eduardo Machado dos Santos**
