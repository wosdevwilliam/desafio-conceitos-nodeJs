const express = require("express");
const cors = require("cors");
const {uuid, isUuid} = require('uuidv4');

//const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//Listagem
app.get("/repositories", (request, response) => {
  // TODO
  //const {title, url, techs} = request.query;

  return response.json(repositories);
});

//Criação
app.post("/repositories", (request, response) => {
  // TODO
  //Campos para inserir no insomnia
  const {title, url, techs} = request.body;

  //todos os campos do repository
  const repository = {id: uuid(), title, url, techs, likes: 0};

  //Inserindo no final do array
  repositories.push(repository);

  return response.json(repository);

});

//Atualização
app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  //Fazendo verificação
  if (repositoryIndex < 0 ) {
    return response.status(400).json({error: 'Repository not found'})
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

//Deletando
app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id ===id);

  if (repositoryIndex < 0 ) {
    return response.status(400).json({error: 'Repository not found'});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();


});

//Criando rota de likes
app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;
   const repositoryIndex = repositories.findIndex(repository => repository.id === id);

   if (repositoryIndex < 0) {
     return response.status(400).json({error: 'Repository not found'});
   }

   repositories[repositoryIndex].likes +=1;
   
   return response.json(repositories[repositoryIndex]);
});

module.exports = app;
