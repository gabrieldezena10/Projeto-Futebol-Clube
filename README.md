# Projeto Trybe Futebol Clube

## 💻 Projeto

O projeto tem como objetivo desenvolver uma aplicação que seja capaz de consultar um banco de dados sobre um campeonato de futebol e mostrar ao usuário as partidas e a classificação, podendo realizar operações de CRUD (create, read, update e delete).

Nesse projeto foi desenvolvida uma REST API sobre partidas e classificações de futebol, utilizando arquitetura de software MSC e, também, utilizando pricípios SOLID e TDD (Test Driven Development). 

Como sistema de gerenciamento de banco de dados, foi utilizado o MySQL.

Observação: Essa é uma aplicação full-stack, a qual a parte de front-end foi disponibilizada pelo time da Trybe

## 🚀 Tecnologias

> Desenvolvido usando: Node.js, TypeScript, Express, Sequelize, dotENV, Docker, MySQL, Jwt, Mocha, Chai.


## ⚡ Executando a aplicação


Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone git@github.com:gabrieldezena10/Projeto-Futebol-Clube.git
$ cd Projeto-Futebol-Clube
```

<details>
  <summary><strong>Com Docker / Docker compose</strong></summary>

  ```bash
  # Realiza orquestração dos containers
  $ npm run compose:up
  ```

  Aplicação Frontend: Disponível no browser pelo endereço http://localhost:3000.

  Aplicação Backend: Disponível na porta `3001`.

  Banco de dados MySQL: Disponível na porta `3002`.
  
</details>

<details>
  <summary><strong>Sem Docker</strong></summary>

  Aplicação Backend:

  ```bash
    $ cd app/backend
   # Instala as dependências
    $ npm install

    # Iniciar o projeto
    $ npm start
  ```
  Aplicação Frontend:

  ```bash
    $ cd app/frontend
   # Instala as dependências
    $ npm install

    # Iniciar o projeto
    $ npm start
  ```
  
<details id='Variaveis-de-ambiente'>
  <summary><strong> ⚙️ Variáveis de ambiente </strong></summary><br />

    **No diretório `app/backend/` renomeie o arquivo `.env.example` para `.env` e configure os valores de acordo com o cenário do seu ambiente  (credenciais de banco de dados, secrets desejadas e etc)**. Isso vai permitir que você inicialize a aplicação fora do _container_ e ela se conecte com  seu banco local caso deseje.
    
 > `./app/backend/.env.example`
  ```txt
  JWT_SECRET=jwt_secret
  APP_PORT=3001
  DB_USER=seu_user
  DB_PASS=sua_senha
  DB_HOST=localhost
  DB_PORT=3306
  ```
</details>

  Aplicação Frontend: Disponível no browser pelo endereço http://localhost:3000.

  Aplicação Backend: Disponível na porta da variável de ambiente APP_PORT definida no arquivo `.env`.

  Banco de dados MySQL: Disponível de acordo com as credencias do banco MySQL da máquina do usuário. Substituir as variáveis de ambiente (DB_USER, DB_PASS) do arquivo `.env` pelas credenciais do usuário.
  
</details>
