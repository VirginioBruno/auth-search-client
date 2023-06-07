document.getElementById("form-login").addEventListener("submit", function(event) {
    event.preventDefault();

    toggleLoading();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5284/api/authentication", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function() {
        toggleLoading();
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            localStorage.setItem('token', response.token);
        } else if (xhr.status === 404) {
            alert("Usuário não existe.");
        } else if (xhr.status === 401) {
            alert("Usuário ou senha incorretos.");
        } else {
            alert("Erro ao logar o usuário: " + xhr.responseText);
        }
    };

    // Convert data to JSON format
    var data = JSON.stringify({ username: username, password: password });

    // Send the request
    xhr.send(data);
});

function toggleLoading() {
    var loading = document.getElementById("loading");

    if (loading.classList.contains("hidden"))
        loading.classList.remove("hidden");
    else
        loading.classList.add("hidden");
}


  