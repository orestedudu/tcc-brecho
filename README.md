
# Passo a Passo: Minha Stack MERN

Este README documenta os passos realizados ao longo dos commits do projeto. O objetivo é detalhar cada alteração para facilitar o entendimento e auxiliar na realização de seus trabalhos, caso venha utilizar a stack MERN (Mongo, Express, React e Node).

---

## Histórico de Commits e Descrições

### Commit: `5618545`
**Descrição:** Criamos o servidor Node.js inicial. Um ponto de partida para o projeto.

---

### Commit: `c82a927`
**Descrição:** Executamos o comando `npm init -y` para criar o arquivo `package.json`.

---

### Commit: `d200173`
**Descrição:** Instalamos o Express como dependência do projeto usando `npm install express`.

---

### Commit: `997b76e`
**Descrição:** Configuramos um servidor básico com Express, permitindo o início de testes locais.

---

### Commit: `51c7101`
**Descrição:** Instalamos o driver oficial do MongoDB para Node.js com `npm install mongodb`.

---

### Commit: `8b73a8d`
**Descrição:** Adicionamos um exemplo de conexão com o MongoDB no código, estabelecendo a base para interações com o banco de dados.

---

### Commit: `a6a2af8`
**Descrição:** Criamos o banco de dados e a coleção necessária para armazenar os dados.

---

### Commit: `b96df80`
**Descrição:** Buscamos documentos no banco de dados e os exibimos como resposta no servidor.

---

### Commit: `09b5518`
**Descrição:** Compilamos o cliente React com sucesso, preparando o frontend para interagir com o backend.

---

### Commit: `481210f`
**Descrição:** Alteramos a porta do servidor para `3001` para evitar conflitos e melhorar a organização.

---

### Commit: `d7ca746`
**Descrição:** Adicionamos o `fetch` no frontend, permitindo que o cliente React se conecte ao backend.

---

### Commit: `60e3104`
**Descrição:** Instalamos e configuramos o `cors` no servidor Express para permitir conexões entre origens diferentes.

---

### Commit: `5910361`
**Descrição:** Alteramos o tipo de resposta no servidor de texto para JSON, tornando as respostas mais estruturadas e práticas.

---

### Commit: `066573f`
**Descrição:** Modificamos o arquivo `Mongo.js` para exportar a conexão e a coleção, e atualizamos o `server.js` para responder com os dados do banco de dados.

---

### Commit: `802abb7`
**Descrição:** Integramos o cliente React com o backend, adicionando a camada "Minha Stack MERN" ao cliente.

---

Ao final desse passo-a-passo a arquitetura do sistema estará funcional, permitindo o fluxo de comunicação entre as partes.

## Arquitetura do Sistema

### Fluxo de Comunicação
```plaintext
React (Frontend) <---> Node + Express (Backend) <---> MongoDB (Banco de Dados)