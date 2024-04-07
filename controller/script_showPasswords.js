window.onload = function() {
    var passwordList = document.getElementById("passwords");
    // Iterar sobre os itens do localStorage
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var passwordData = JSON.parse(localStorage.getItem(key));
        var li = document.createElement("li");
        // Exibir o índice real, o nome e a senha
        li.textContent = passwordData.index + ": " + key + " - " + passwordData.password;
        li.dataset.index = passwordData.index; // Armazenar o índice real como atributo de dados
        passwordList.appendChild(li);
    }
};

function deletePassword() {
    var index = prompt("Digite o index da senha a ser excluída:");
    if (!index) {
        return;
    }

    // Verificar se o índice existe
    var found = false;
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var passwordData = JSON.parse(localStorage.getItem(key));
        if (passwordData.index == index) {
            found = true;
            localStorage.removeItem(key); // Excluir a entrada do localStorage
            alert("Senha com o index " + index + " excluída com sucesso!");
            location.reload();
            break;
        }
    }

    if (!found) {
        alert("Não foi encontrada nenhuma senha com o index especificado.");
    }
}

function goToIndex() {
    window.location.href = '/index.html';
}
