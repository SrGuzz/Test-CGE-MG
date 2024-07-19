const URLnotas = "http://localhost:8080/notas";
var user = JSON.parse(localStorage.getItem("user"));
var notas = [];
var notaAtual = null;

//verifica se o usuario esta logado
if(user == null){
    window.location.href = "../login/login.html";
}

//busca todas as notas do usuario no banco de dados
async function getNotas(URLnotas){
    const response = await fetch(URLnotas + "/" + user.id, {
        method: "GET",
    });
    notas = await response.json();
    if(!response.ok){
        console.log("Erro ao acessear api");
        return;
    }
    exibeNotas(notas);
    return notas;
}

//mostra as notas do usuario na tela
function exibeNotas(notas){
    const notasDiv = document.getElementById('notas');
    notasDiv.innerHTML = '';
    document.getElementById('divQTD').innerHTML = `<h5 class="fs-6">Olá ${user.name.split(' ')[0]}!<br>${notas.length} notas cadastrdas.</h5>`;

    if(notas.length == 0){
        notasDiv.innerHTML = '<h5 class="text-center mt-5">Nenhuma nota cadastrada!</h5>';
        return;
    }

    for(let nota of notas){
        notasDiv.innerHTML += `
            <div class="col-4 ps-2 pe-2 mb-2">
                <div class="card shadow-sm">
                    <div class="text-center pt-2 border-bottom rounded-top titulo">
                        <h4 class="text-white" id="titulo${nota.id}">${nota.titulo}</h4>
                    </div>
                    <div class="card-body">
                        <p class="card-text" id="descricao${nota.id}">${nota.descricao}</p>
                        <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-danger" id="delete${nota.id}"><i  class="bi bi-trash" id="delete${nota.id}"></i></button>
                            <button type="button" class="btn btn-sm btn-outline-primary" id="edit${nota.id}" data-bs-toggle="modal" data-bs-target="#editaModal"><i id="edit${nota.id}" class="bi bi-pencil-square"></i></button>
                        </div>
                        <small class="text-body-secondary" id="data${nota.id}">${nota.dataCriacao}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

//deleta nota selecionada
addEventListener('click', function (event) {
    idBotao = event.target.id;
    if(idBotao.includes('delete')){
        if(!confirm('Deseja realmente deletar essa nota?')){
            return;
        }
        var idNota = idBotao.replace('delete', '');
        this.fetch(URLnotas + "/" + idNota, {
            method: "DELETE"
        })
        .then(response => {
            if(response.ok){
                getNotas(URLnotas);
            } else {
                alert('Erro ao deletar nota');
            }
        })
    }
})

//adicionana uma nova nota
function adicionaNota(){

    const titulo = document.getElementById('titulo').value;
    if(titulo == ''){
        document.getElementById('tituloError').innerText = 'Campo obrigatório';
        return;
    }
    else if(titulo.length < 3 || titulo.length > 50){
        document.getElementById('tituloError').innerText = 'Título invalido';
        return;
    }
    else{
        document.getElementById('tituloError').innerText = '';
    }

    const descricao = document.getElementById('descricao').value;
    if(descricao == ''){
        document.getElementById('descricaoError').innerText = 'Campo obrigatório';
        return;
    }
    else if(descricao.length < 3 || descricao.length > 3000){
        document.getElementById('descricaoError').innerText = 'Descrição invalida';
        return;
    }
    else{
        document.getElementById('descricaoError').innerText = '';
    }

    const dataCriacao = new Date().toLocaleDateString();

    const nota = {
        id: null,
        titulo: titulo,
        descricao: descricao,
        dataCriacao: dataCriacao,
        user: user
    }

    fetch(URLnotas, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nota)
    })
    .then(response => {
        if(response.ok){
            getNotas(URLnotas);
            document.getElementById('fechaAdd').click();
        } else {
            alert('Erro ao adicionar nota');
        }
    })

}

//busca uma nota pelo id
function getNotaById(id){
    for(let nota of notas){
        if(nota.id == id){
            return nota;
        }
    }
    return null;
}

//faz o signout do usuario
function signOut(){
    if(!confirm('Deseja realmente sair?')){
        return;
    }
    localStorage.removeItem("user");
    window.location.href = "../login/login.html";
}

//edita nota selecionada
addEventListener('click', function(event){
    if(event.target.id.includes('edit') || event.target.id.includes('btnModal')){
        var modal = document.getElementById('dadosEditar');
        const nota = getNotaById(event.target.id.replace('edit', ''));
        if(nota == null){
            return;
        }
        modal.innerHTML = `
            <form>
                <div class="mb-3">
                    <label for="tituloEditar" class="form-label">Título</label>
                    <input type="text" class="form-control" id="tituloEditar" name="tituloEditar" value="${nota.titulo}">
                    <p class="small text-danger" id="tituloEditarError"></p>
                </div>
                <div class="mb-3">
                    <label for="descricaoEditar" class="form-label">Descrição</label>
                    <textarea class="form-control" id="descricaoEditar" name="descricaoEditar" rows="5">${nota.descricao}</textarea>
                    <p class="small text-danger" id="descricaoEditarError"></p>
                </div>
            </form>
        `;
        document.getElementById('corpoEdit').innerHTML =`
            <button type="button" class="d-none" data-bs-dismiss="modal" id="fechaEdit"></button>
            <button type="button" class="btn btnSalva" onclick="salvarEdit()"><i class="bi bi-clipboard-check"></i></button>
        `;
        notaAtual = nota;
    }
})

//salva a edição da nota
function salvarEdit(){
    const newTitulo = document.getElementById('tituloEditar').value;
        if(newTitulo == ''){
            document.getElementById('tituloEditarError').innerText = 'Campo obrigatório';
            return;
        }
        else if(newTitulo.length < 3 || newTitulo.length > 50){
            document.getElementById('tituloEditarError').innerText = 'Título invalido';
            return;
        }
        else{
            document.getElementById('tituloEditarError').innerText = '';
        }

        const newDescricao = document.getElementById('descricaoEditar').value;
        if(newDescricao == ''){
            document.getElementById('descricaoEditarError').innerText = 'Campo obrigatório';
            return;
        }
        else if(newDescricao.length < 3 || newDescricao.length > 3000){
            document.getElementById('descricaoEditarError').innerText = 'Descrição invalida';
            return;
        }
        else{
            document.getElementById('descricaoEditarError').innerText = '';
        }   

        const newNota = {
            id: notaAtual.id,
            titulo: newTitulo,
            descricao: newDescricao,
            dataCriacao: notaAtual.dataCriacao,
            usuario: notaAtual.usuario
        }

        this.fetch(URLnotas + "/" + notaAtual.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNota)
        })
        .then(response => {
            if(response.ok){
                getNotas(URLnotas);
                document.getElementById('fechaEdit').click();
            } else {
                alert('Erro ao editar nota');
            }
        })
}

//mostra os dados do perfil
function addDadosPerfil(){
    var modal = document.getElementById('dadosUser');
    modal.innerHTML += `
        <form>
            <fieldset disabled>
                <div class="mb-3">
                    <label for="name" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="name" name="name" value="${user.name}">
                    <p class="small text-danger" id="nameError"></p>
                </div>
            </fieldset>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" value="${user.email}">
                <p class="small text-danger" id="emailError"></p>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Senha</label>
                <input type="text" class="form-control" id="password" name="password" value="${user.password}">
                <p class="small text-danger" id="passwordError"></p>
            </div>
        </form>
    `;
}

//salva edição do perfil
function salvaPerfil(){

    var newEmail = document.getElementById('email').value;
    if(newEmail == ''){
        document.getElementById('emailError').innerText = 'Campo obrigatório';
        return;
    }
    else if(newEmail.length < 3 || newEmail.length > 50){
        document.getElementById('emailError').innerText = 'Email invalido';
        return;
    }
    else{
        document.getElementById('emailError').innerText = '';
    }

    var newPassword = document.getElementById('password').value;
    if(newPassword == ''){
        document.getElementById('passwordError').innerText = 'Campo obrigatório';
        return;
    }
    else if(newPassword.length < 3 || newPassword.length > 50){
        document.getElementById('passwordError').innerText = 'Senha invalida';
        return;
    }
    else{
        document.getElementById('passwordError').innerText = '';
    }

    const newUser = {
        id: user.id,
        name: user.name,
        email: newEmail,
        password: newPassword
    }

    fetch("http://localhost:8080/user/" + user.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(response => {
        if(!response.ok){
            alert('Erro ao editar perfil');
        }
        else{
            user = newUser;
            localStorage.setItem("user", JSON.stringify(user));
            document.getElementById('fechaPerfil').click();
        }
    })
}

getNotas(URLnotas);
