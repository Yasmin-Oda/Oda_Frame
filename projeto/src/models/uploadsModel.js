// Importa o arquivo de configuração do banco de dados para executar as queries
let database = require("../database/config");

// Função responsável por salvar os dados do upload no banco de dados
function cadastrar(tipoFoto, dtFoto, sentimento, caminhoFoto, fkUsuario) {
    console.log("ACESSEI O UPLOADS MODEL - função cadastrar():", tipoFoto, dtFoto, sentimento, caminhoFoto, fkUsuario);

    // Monta a instrução SQL que vai inserir os dados na tabela upload
    var instrucaoSql = `
        INSERT INTO upload (tipoFoto, dtFoto, sentimento, caminhoFoto, fkUsuario) 
        VALUES ('${tipoFoto}', '${dtFoto}', '${sentimento}', '${caminhoFoto}', '${fkUsuario}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Executa a instrução no banco e retorna o resultado
    return database.executar(instrucaoSql);
}

function listar() {
    let instrucaoSql = `SELECT * FROM upload;`;
    return database.executar(instrucaoSql);
}


// Dashboard
function uploadsPorTipo() {
    let instrucaoSql = `SELECT tipoFoto, COUNT(*) AS quantidade FROM upload GROUP BY tipoFoto;`;
    return database.executar(instrucaoSql);
}

function uploadsPorMes() {
    let instrucaoSql = `SELECT dtFoto FROM upload;`;
    return database.executar(instrucaoSql);
}

function uploadsPorEmocao() {
    let instrucaoSql = `SELECT sentimento, COUNT(*) AS quantidade FROM upload GROUP BY sentimento;`;
    return database.executar(instrucaoSql);
}

// Exporta a função para ser usada no controller
module.exports = { cadastrar, listar, uploadsPorTipo, uploadsPorMes, uploadsPorEmocao }; // atualiza o module.exports


