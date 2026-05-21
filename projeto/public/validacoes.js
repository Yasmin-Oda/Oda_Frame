function verificarSenha() {
    let senhaVar = document.getElementById("senha").value;

    let tamanho = senhaVar.length >= 8;
    let maiusculas = senhaVar != senhaVar.toLowerCase();
    let minusculas = senhaVar != senhaVar.toUpperCase();

    let criterios = 0;

    if (tamanho) criterios++;
    if (maiusculas) criterios++;
    if (minusculas) criterios++;

    // Mostra a mensagem na tela em vez de alert
    let cardErro = document.getElementById("cardErro");
    let mensagem = document.getElementById("mensagem_erro");

    cardErro.style.display = "block";

    if (criterios == 3) mensagem.textContent = "Senha forte!";
    else if (criterios == 2) mensagem.textContent = "Senha média";
    else if (criterios == 1) mensagem.textContent = "Senha fraca";
    else mensagem.textContent = "Senha insegura";
}


// CADASTRO
function validarCadastro() {

    let nomeVar = nome.value;
    let emailVar = email.value;
    let cpfVar = cpf.value;
    let senhaVar = senha.value;
    let confirmarVar = confirmar.value;

    let emailValido = false;
    let dominios = ['@sptech.school', '@gmail.com', '@hotmail.com', '@outlook.com', '@yahoo.com'];

    for (let i = 0; i < dominios.length; i++) {
        if (emailVar.endsWith(dominios[i])) {
            emailValido = true;
        }
    }

    if (!emailValido) {
        alert("Email inválido");
        return;
    }

    if (cpfVar.length != 14 || cpfVar[3] != '.' || cpfVar[7] != '.' || cpfVar[11] != '-') {
        alert("CPF inválido");
        return;
    }

    if (senhaVar != confirmarVar) {
        alert("As senhas não coincidem");
        return;
    }

    if (nomeVar == '') {
        alert("Digite seu nome");
        return;
    }

    if (senhaVar.length < 8) {
        alert("Senha deve ter pelo menos 8 caracteres");
        return;
    }

    // Envia os dados para o banco de dados
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nomeServer: nomeVar,
            cpfServer: cpfVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    })
    .then(function (resposta) {
        if (resposta.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "Login.html";
        } else {
            alert("Erro ao realizar cadastro. Tente novamente!");
        }
    })
    .catch(function (erro) {
        alert("Erro ao conectar com o servidor!");
    });
}


// LOGIN
function validarLogin() {

    let emailVar = email.value;
    let senhaVar = senha.value;

    if (emailVar == '' || senhaVar == '') {
        alert("Preencha todos os campos!");
        return;
    }

    // Envia os dados para o banco de dados
    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    })
    .then(function (resposta) {
        if (resposta.ok) {
            alert("Login realizado com sucesso!");
            window.location.href = "upload.html";
        } else {
            alert("Email ou senha incorretos!");
        }
    })
    .catch(function (erro) {
        alert("Erro ao conectar com o servidor!");
    });
}