//var uploadsModel = require("../models/uploadsModel");
// Importa o model de uploads para acessar as funções do banco de dados
var uploadsModel = require("../models/uploadsModel");

// Função responsável por receber os dados da requisição e chamar o model
function cadastrar(req, res) {

    // Pega o nome do arquivo que o multer salvou na pasta (vem do req.file)
    var caminhoFoto = req.file.filename;

    // Pega os outros dados enviados pelo formulário do upload.html (vem do req.body)
    var tipoFoto    = req.body.tipoFotoServer;
    var dtFoto      = req.body.dtFotoServer;
    var sentimento  = req.body.sentimentoServer;
    var fkUsuario   = req.body.fkUsuarioServer;

    // Verifica se os campos obrigatórios foram preenchidos
    if (!tipoFoto || !dtFoto || !sentimento || !fkUsuario) {
        return res.status(400).send("Preencha todos os campos antes de enviar!");
    }

    // Chama a função do model passando todos os dados para salvar no banco
    uploadsModel.cadastrar(tipoFoto, dtFoto, sentimento, caminhoFoto, fkUsuario)
        .then(function (resultado) {
            // Se deu certo, retorna sucesso para o front-end
            res.status(201).json({ mensagem: "Foto enviada com sucesso!" });
        })
        .catch(function (erro) {
            // Se deu erro, exibe no console e retorna erro para o front-end
            console.log("Erro ao salvar o upload:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listar(req, res) {
    uploadsModel.listar()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao listar uploads:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}


// Dashboard
function uploadsPorTipo(req, res) {
    uploadsModel.uploadsPorTipo()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function uploadsPorMes(req, res) {
    uploadsModel.uploadsPorMes()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function uploadsPorEmocao(req, res) {
    uploadsModel.uploadsPorEmocao()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

// Exporta a função para ser usada na rota
module.exports = { cadastrar, listar, uploadsPorTipo, uploadsPorMes, uploadsPorEmocao };// atualiza o module.exports

