// SENHA
function verificarSenha() {

    let senhaVar = senha.value;

    let tamanho = senhaVar.length >= 8;
    let maiusculas = senhaVar != senhaVar.toLowerCase();
    let minusculas = senhaVar != senhaVar.toUpperCase();

    let criterios = 0;

    if (tamanho) criterios++;
    if (maiusculas) criterios++;
    if (minusculas) criterios++;

    if (criterios == 3) alert("Senha forte!");
    else if (criterios == 2) alert("Senha média");
    else if (criterios == 1) alert("Senha fraca");
    else alert("Senha insegura");
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

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push({
        email: emailVar,
        senha: senhaVar
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "Login.html";
}


// LOGIN
function validarLogin() {

    let emailVar = email.value;
    let senhaVar = senha.value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let encontrado = false;

    for (let i = 0; i < usuarios.length; i++) {

        if (emailVar == usuarios[i].email && senhaVar == usuarios[i].senha) {
            encontrado = true;
            break;
        }
    }

    if (encontrado) {
        alert("Login realizado com sucesso!");
        window.location.href = "upload.html";
    } else {
        alert("Email ou senha incorretos");
    }
}