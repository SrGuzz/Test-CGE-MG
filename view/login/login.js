const URLuser = 'https://test-cge-mg.onrender.com/user';
const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;

function salvarNovo(){
    const name = document.getElementById('nomeCriar').value
    if(name == ''){
        document.getElementById('nomeCriarError').innerText = 'Nome é obrigatório';
        return;
    }
    else if(name.length < 3){
        document.getElementById("nomeCriarError").innerText = 'Nome deve ter no mínimo 3 caracteres';
        return;
    }
    else{
        document.getElementById('nomeCriarError').innerText = '';
    }

    const email = document.getElementById('emailCriar').value
    if(!regex.test(email)){
        document.getElementById('emailCriarError').innerText = 'Email invalido!';
        return;
    }
    else{
        document.getElementById('emailCriarError').innerText = '';
    }

    const password = document.getElementById('senhaCriar').value
    if(password == ''){
        document.getElementById('senhaCriarError').innerText = 'Senha é obrigatória';
        return;
    }
    else if(password.length < 8){
        document.getElementById("senhaCriarError").innerText = 'Senha deve ter no mínimo 8 caracteres';
        return;
    }
    else{
        document.getElementById('senhaCriarError').innerText = '';
    }

    const repeatPassword = document.getElementById('repeteSenha').value
    if(repeatPassword == ''){
        document.getElementById('repeteSenhaError').innerText = 'Repita a senha';
        return;
    }
    else if(repeatPassword != password){
        document.getElementById("repeteSenhaError").innerText = 'Senhas não conferem';
        document.getElementById('repeteSenha').value = '';
        return;
    }
    else{
        document.getElementById('repeteSenhaError').innerText = '';
    }

    document.getElementById('loadingCriar').style.display = 'block';

    const user = {
        name: name,
        email: email,
        password: password
    }

    fetch(URLuser, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if(response.ok){
            document.getElementById('loadingCriar').style.display = 'none';
            alert('Usuário cadastrado com sucesso');
            window.location.href = '../login/login.html';
        } else if(response.status == 500){
            document.getElementById('loadingCriar').style.display = 'none';
            document.getElementById('emailCriarError').innerText = 'Email já cadastrado!';
        }
        else {
            alert('Erro ao cadastrar usuário');
        }
    })
}

async function login(){
    
    const email = document.getElementById('email').value
    if(!regex.test(email)){
        document.getElementById('erroSenha').innerText = 'Email invalido';
        return;
    }
    else{
        document.getElementById('erroSenha').innerText = '';
    }
    
    const password = document.getElementById('password').value
    if(password == ''){
        document.getElementById('erroSenha').innerText = 'Senha é obrigatória';
        return;
    }
    else if(password.length < 8){
        document.getElementById('erroSenha').innerText = 'Senha deve ter no mínimo 8 caracteres';
        return;
    }
    else{
        document.getElementById('erroSenha').innerText = '';
    }
    
    document.getElementById('loading').style.display = 'block';
    const request = {
        username: email,
        password: password
    }

    const response = await fetch(URLuser + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    
    if(!response.ok){
        document.getElementById('erroSenha').innerText = 'Email ou senha inválidos';
        document.getElementById('loading').style.display = 'none';
        throw new Error('Erro ao logar');
    }

    const data = await response.json();
    document.getElementById('loading').style.display = 'none';
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = '../nota/nota.html';
}

window.onload = function() {
    // Substitui o estado atual no histórico
    history.replaceState(null, "", window.location.href);
    
    // Adiciona um novo estado ao histórico
    history.pushState(null, "", window.location.href);

    // Escuta eventos de navegação
    window.onpopstate = function() {
        // Quando o usuário tentar voltar, substitui o estado novamente e adiciona um novo estado
        history.replaceState(null, "", window.location.href);
        history.pushState(null, "", window.location.href);
    };
};