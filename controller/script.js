// Funções para gerar, copiar, salvar e visualizar senhas.
function generateRandomPassword() {
    var length = document.getElementById("passwordLength").value;
    var passwordName = document.getElementById("passwordName").value;
    var passwordLengthText = "(" + length + " caracteres)";
    
    // Verificar se o nome da senha foi fornecido
    if (!passwordName) {
        alert("Por favor, forneça um nome para a senha.");
        return;
    }

    if (length < 10 || length > 20) {
        alert("O tamanho da senha deve estar entre 10 e 20 caracteres.");
        return;
    }
    
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    document.getElementById("demo").innerHTML = result;
    validateSavePasswordButton();
}

function copyToClipboard() {
    var password = document.getElementById("demo").innerHTML;
    
    // Verificar se uma senha foi gerada
    if (!password) {
        alert("Por favor, gere uma senha antes de copiá-la para a área de transferência.");
        return;
    }
    
    navigator.clipboard.writeText(password).then(() => {
        setTimeout(() => {
            alert("Senha copiada para a área de transferência!");
        }, 100);
    }, (err) => {
        console.error("Erro ao copiar:", err);
    });
}

function savePassword() {
    var passwordName = document.getElementById("passwordName").value;
    var password = document.getElementById("demo").innerHTML;
    if (!password) {
        alert("Por favor, gere uma senha antes de tentar salvá-la.");
        return;
    }
    // Verificar se o nome da senha foi fornecido
    if (!passwordName) {
        alert("Por favor, forneça um nome para a senha.");
        return;
    }
    // Verificar se a senha já existe
    if (localStorage.getItem(passwordName)) {
        alert("Não é possível salvar a mesma senha duas vezes.");
        return;
    }
    // Gerar index sequencial único
    var index = localStorage.length + 1;
    // Salvar senha no localStorage
    localStorage.setItem(passwordName, JSON.stringify({
        password: password,
        index: index
    }));
    alert("Senha salva com sucesso!");
    // Desativar o botão Salvar senha
    validateSavePasswordButton();
}

function showPasswords() {
    var passwords = [];
    for (var i = 0; i < localStorage.length; i++) {
        var passwordData = JSON.parse(localStorage.getItem(localStorage.key(i)));
        passwords.push(passwordData.index + ": " + passwordData.passwordName + " (" + passwordData.password.length + " caracteres)");
    }
    window.open("showPasswords.html?passwords=" + encodeURIComponent(JSON.stringify(passwords)), "_blank");
}

// Funções para validação e tratamento de erros.
function validateGeneratePasswordButton() {
    var length = document.getElementById("passwordLength").value;
    var passwordName = document.getElementById("passwordName").value;
    var generateButton = document.querySelector(".gen-password-row button");
    if (length >= 10 && length <= 20 && passwordName) {
        generateButton.disabled = false;
    } else {
        generateButton.disabled = true;
    }
}

function validateSavePasswordButton() {
    var demo = document.getElementById("demo").innerHTML;
    var saveButton = document.getElementById("saveButton");
    if (demo) {
        saveButton.disabled = false;
    } else {
        saveButton.disabled = true;
    }
}

function deletePassword() {
    var index = prompt("Digite o index da senha a ser excluída:");
    if (!index) {
        return;
    }

    // Buscar a senha correspondente ao índice
    var passwordToDelete = null;
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var passwordData = JSON.parse(localStorage.getItem(key));
        if (passwordData.index == index) {
            passwordToDelete = key;
            break;
        }
    }

    if (!passwordToDelete) {
        alert("Não foi encontrada nenhuma senha com o index especificado.");
        return;
    }

    var confirmed = confirm("Deseja realmente excluir a senha com o index " + index + " e nome \"" + passwordToDelete + "\"?");
    if (!confirmed) {
        return;
    }

    // Remover a senha com base no nome
    localStorage.removeItem(passwordToDelete);
    alert("Senha com o index " + index + " e nome \"" + passwordToDelete + "\" excluída com sucesso!");
    location.reload();
}

// Chamar as funções de validação ao carregar a página
window.onload = function() {
    validateSavePasswordButton();
};
