
# Sistema de Agendamento para salão de beleza - Stack MERN

Este projeto é um **Sistema de Agendamento Online para salão de beleza**, desenvolvido utilizando a stack **MERN (MongoDB, Express, React e Node.js)**. Foi desenvolvido com fins didáticos para servir como **apoio para os alunos desenvolverem seus próprios projetos de conclusão de curso (TCC)**.

## Objetivo do Projeto

O sistema permite que usuários realizem:

- **Agendamentos de serviços**
- **Edição de agendamentos**
- **Cancelamento (exclusão) de agendamentos**
- **Listagem de agendamentos pendentes e concluídos**
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

🔸 **Substitua:**

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

- **Agendamento:**
  - Criar, listar, editar e excluir agendamentos.

- **Filtros:**
  - Filtragem de agendamentos por status (pendente, concluído).

- **Proteção de rotas:**
  - Apenas usuários autenticados acessam funcionalidades.

## Segurança

- As senhas dos usuários são armazenadas de forma segura usando **bcrypt** (hashing).
- As rotas da API são protegidas usando **JWT** (JSON Web Token).
- Apenas usuários autenticados podem criar, editar, excluir ou visualizar seus próprios agendamentos.

## Como Usar no TCC?

- Este projeto é uma **base funcional**, onde você pode:
  - Alterar o tema (ex.: barbearia, consultório, academia, petshop).
  - Adicionar novos campos (ex.: telefone, endereço, nome do cliente).
  - Implementar novas funcionalidades (ex.: envio de email, painel admin, confirmação de agendamento).
  - Melhorar o layout, responsividade e experiência do usuário.

## Licença

Este projeto é de uso **livre para fins acadêmicos e educacionais**.

## Desenvolvido por

**Prof. Jardel Gonçalves**  
Instituto Federal Catarinense (IFC).

## Suporte

Em caso de dúvidas, procure o professor em sala ou pelos canais oficiais do curso (Somente orientandos).
