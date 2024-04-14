window.onload = function() {
    var passwordList = document.getElementById("passwords");
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var passwordData = JSON.parse(localStorage.getItem(key));
        var li = document.createElement("li");
        li.textContent = passwordData.index + ": " + key + " - " + passwordData.password;
        li.dataset.index = passwordData.index;
        passwordList.appendChild(li);
    }
};

function deletePassword() {
    var index = prompt("Digite o index da senha a ser excluída:");
    if (!index) {
        return;
    }

    var found = false;
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var passwordData = JSON.parse(localStorage.getItem(key));
        if (passwordData.index == index) {
            found = true;
            localStorage.removeItem(key);
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
