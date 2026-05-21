// Importa o multer, que é a biblioteca responsável por receber arquivos enviados pelo formulário
let multer = require('multer');

// Define a pasta onde as imagens enviadas serão salvas no servidor
let diretorio = 'public/assets/imgs/';

// Configura como o multer vai salvar o arquivo
let storage = multer.diskStorage({

    // Define o destino (pasta) onde o arquivo será salvo
    destination: function (req, file, cb) {
        cb(null, diretorio);
    },

    // Define o nome que o arquivo vai ter quando for salvo
    filename: function (req, file, cb) {
        // Pega a extensão do arquivo original (ex: jpg, png)
        let extensaoArquivo = file.originalname.split('.')[1];

        // Gera um nome aleatório para o arquivo, evitando nomes duplicados
        let novoNomeArquivo = require('crypto').randomBytes(64).toString('hex');

        // Salva o arquivo com o nome aleatório + a extensão original (ex: abc123.jpg)
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
    }
});

// Exporta o multer configurado para ser usado nas rotas
module.exports = multer({ storage });