document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("errorMessage");

  // Credenciais fixas
  const validUser = "admin";
  const validPass = "1234";

  if (username === validUser && password === validPass) {
    // Redireciona para a página de orçamento
    window.location.href = "orcamento.html";
  } else {
    errorMessage.textContent = "Usuário ou senha inválidos.";
  }
});
