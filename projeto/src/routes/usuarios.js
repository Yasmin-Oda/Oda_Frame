// Importa o express para criar as rotas
var express = require("express"); 
var router = express.Router();

//Importa o arquivo controller, que é quem vai realmente fazer o trabalho
var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

// Quando o HTML envia um formulário para esse endereço, essa função é chamada
// POST: Envia dados
router.post("/cadastrar", function (req, res) { 
    usuarioController.cadastrar(req, res);      
})
// cria uma rota, com requerimento e resposta
//  req: é o que chegou
// res: é o que você vai devolver


// Login é utilizado post pois são dados sensíveis
router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

// Exporta esse router para que o app.js possa usá-lo
module.exports = router;