/**
 * login.js
 * Autenticação - Login Form
 * 
 * Credenciais de acesso:
 * - Usuário: admin
 * - Senha: 1234
 */

// Hash da senha usando SHA-256
const VALID_USER_HASH = "admin";
const VALID_PASS_HASH = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";

/**
 * Calcula SHA-256 de uma string (usando SubtleCrypto)
 */
async function sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// Aguardar DOM estar pronto antes de registrar eventos
document.addEventListener("DOMContentLoaded", async () => {
  const loginForm = document.getElementById("loginForm");
  
  if (!loginForm) {
    console.error("[AUTH] ❌ Formulário 'loginForm' não encontrado");
    return;
  }

  console.log("[AUTH] ✓ Formulário de login inicializado");

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");
    const loginBtn = document.querySelector("button[type='submit']");

    // Validação básica
    if (!username || !password) {
      errorMessage.textContent = "Usuário e senha são obrigatórios.";
      errorMessage.classList.add("visible");
      return;
    }

    // Mostrar indicador de processamento
    const textoBak = loginBtn.textContent;
    loginBtn.disabled = true;
    loginBtn.textContent = "Verificando...";
    errorMessage.textContent = "";
    errorMessage.classList.remove("visible");

    try {
      // Verificar username
      if (username !== VALID_USER_HASH) {
        errorMessage.textContent = "Usuário ou senha inválidos.";
        errorMessage.classList.add("visible");
        loginBtn.textContent = textoBak;
        loginBtn.disabled = false;
        console.log("[AUTH] ❌ Usuário inválido");
        return;
      }

      // Fazer hash da senha fornecida
      const passwordHash = await sha256(password);
      console.log("[AUTH] Hash verificado");

      // Comparar com senha armazenada
      if (passwordHash === VALID_PASS_HASH) {
        // Sucesso! Salvar sessão e redirecionar
        const authToken = btoa(`${username}:${Date.now()}:${Math.random()}`);
        sessionStorage.setItem("franfreitas-auth", authToken);
        
        console.log("[AUTH] ✓ Login bem-sucedido! Redirecionando...");
        
        // Redirecionar para orcamento.html
        setTimeout(() => {
          window.location.href = "orcamento.html";
        }, 300);
      } else {
        // Senha incorreta
        errorMessage.textContent = "Usuário ou senha inválidos.";
        errorMessage.classList.add("visible");
        loginBtn.textContent = textoBak;
        loginBtn.disabled = false;
        console.log("[AUTH] ❌ Senha incorreta");
      }
    } catch (error) {
      console.error("[AUTH] ❌ Erro na autenticação:", error);
      errorMessage.textContent = "Erro ao processar login. Tente novamente.";
      errorMessage.classList.add("visible");
      loginBtn.textContent = textoBak;
      loginBtn.disabled = false;
    }
  });
});
