// Importa o express para criar as rotas
let express = require("express");
let router = express.Router();

// Importa a configuração do multer (responsável por salvar o arquivo na pasta)
let upload = require("../config/configUpload");

// Importa o controller que contém a lógica do upload
var uploadsController = require("../controllers/uploadsController");

// Define a rota POST /uploads/cadastrar
// Intercepta o arquivo com o nome 'foto' que vem do formulário
// e salva na pasta antes de chegar no controller
router.post("/cadastrar", upload.single('foto'), function (req, res) {
    uploadsController.cadastrar(req, res);
});

router.get("/listar", function (req, res) {
    uploadsController.listar(req, res);
});


// Dashboard
router.get("/porTipo", function (req, res) {
    uploadsController.uploadsPorTipo(req, res);
});

router.get("/porMes", function (req, res) {
    uploadsController.uploadsPorMes(req, res);
});

router.get("/porEmocao", function (req, res) {
    uploadsController.uploadsPorEmocao(req, res);
});

// Exporta o router para ser usado no app.js
module.exports = router;