/**
 * login.js
 * Autenticação - Login Form
 * 
 * ⚠️ IMPORTANTE: Esta é uma solução mínima para fins educacionais.
 * Para PRODUÇÃO, implementar autenticação segura em backend com:
 * - Vercel Serverless Functions
 * - Firebase Authentication
 * - Auth0
 * - JWT tokens
 * 
 * Segurança implementada:
 * - Senha com hash SHA-256
 * - Limite de 5 tentativas falhadas
 * - Bloqueio temporário de 15 minutos
 * - Session token com timestamp
 * - Validação em client-side
 * 
 * Credenciais de acesso:
 * - Usuário: admin
 * - Senha: 1234
 */

// Hash da senha usando SHA-256
// Login esperado: admin / 1234
const VALID_USER_HASH = "admin";
const VALID_PASS_HASH = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";

// Configuração de segurança
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutos
const ATTEMPTS_STORAGE_KEY = "franfreitas-login-attempts";
const LOCKOUT_STORAGE_KEY = "franfreitas-login-lockout";

/**
 * Calcula SHA-256 de uma string (usando SubtleCrypto)
 * @param {string} str - String a fazer hash
 * @returns {Promise<string>} Hash em hexadecimal
 */
async function sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Verifica se o usuário está bloqueado por falhas múltiplas
 * @returns {Object} { bloqueado: boolean, tempoRestante: number }
 */
function verificarBloqueio() {
  const lockoutTime = localStorage.getItem(LOCKOUT_STORAGE_KEY);
  
  if (!lockoutTime) {
    return { bloqueado: false, tempoRestante: 0 };
  }

  const tempoDecorrido = Date.now() - parseInt(lockoutTime);
  if (tempoDecorrido >= LOCKOUT_DURATION_MS) {
    localStorage.removeItem(LOCKOUT_STORAGE_KEY);
    localStorage.removeItem(ATTEMPTS_STORAGE_KEY);
    return { bloqueado: false, tempoRestante: 0 };
  }

  const tempoRestante = Math.ceil((LOCKOUT_DURATION_MS - tempoDecorrido) / 1000);
  return { bloqueado: true, tempoRestante };
}

/**
 * Registra tentativa falhada de login
 */
function registrarTentativaFalhada() {
  let attempts = parseInt(localStorage.getItem(ATTEMPTS_STORAGE_KEY) || "0");
  attempts++;

  localStorage.setItem(ATTEMPTS_STORAGE_KEY, attempts.toString());

  if (attempts >= MAX_LOGIN_ATTEMPTS) {
    localStorage.setItem(LOCKOUT_STORAGE_KEY, Date.now().toString());
  }

  return attempts;
}

/**
 * Limpa contador de tentativas após sucesso
 */
function limparTentativas() {
  localStorage.removeItem(ATTEMPTS_STORAGE_KEY);
  localStorage.removeItem(LOCKOUT_STORAGE_KEY);
}

/**
 * Formata tempo para exibição amigável
 */
function formatarTempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const secs = segundos % 60;
  if (minutos > 0) {
    return `${minutos}m ${secs}s`;
  }
  return `${secs}s`;
}

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("errorMessage");
  const loginBtn = document.querySelector("button[type='submit']");

  // Validação básica
  if (!username || !password) {
    errorMessage.textContent = "Usuário e senha são obrigatórios.";
    return;
  }

  // Verificar bloqueio por tentativas múltiplas
  const { bloqueado, tempoRestante } = verificarBloqueio();
  if (bloqueado) {
    errorMessage.textContent = `Conta bloqueada temporariamente. Tente novamente em ${formatarTempo(tempoRestante)}.`;
    loginBtn.disabled = true;
    return;
  }

  // Mostrar indicador de processamento
  const textoBak = loginBtn.textContent;
  loginBtn.disabled = true;
  loginBtn.textContent = "Verificando...";
  errorMessage.textContent = "";

  try {
    // Verificar username
    if (username !== VALID_USER_HASH) {
      registrarTentativaFalhada();
      const tentativas = parseInt(localStorage.getItem(ATTEMPTS_STORAGE_KEY) || "0");
      const tentativasRestantes = Math.max(0, MAX_LOGIN_ATTEMPTS - tentativas);
      
      if (tentativasRestantes > 0) {
        errorMessage.textContent = `Usuário ou senha inválidos. Tentativas restantes: ${tentativasRestantes}`;
      } else {
        errorMessage.textContent = "Conta bloqueada por segurança. Tente novamente em 15 minutos.";
      }
      
      loginBtn.textContent = textoBak;
      loginBtn.disabled = false;
      return;
    }

    // Fazer hash da senha fornecida
    const passwordHash = await sha256(password);

    // Comparar com senha armazenada
    if (passwordHash === VALID_PASS_HASH) {
      // Sucesso! Limpar tentativas e salvar sessão
      limparTentativas();
      
      const authToken = btoa(`${username}:${Date.now()}:${Math.random()}`);
      sessionStorage.setItem("franfreitas-auth", authToken);
      errorMessage.textContent = "";
      
      // Log de segurança (em produção seria enviado ao backend)
      console.log("[AUTH] Login bem-sucedido em:", new Date().toISOString());
      
      // Pequeno atraso para feedback visual
      setTimeout(() => {
        window.location.href = "orcamento.html";
      }, 500);
    } else {
      // Senha incorreta
      const tentativas = registrarTentativaFalhada();
      const tentativasRestantes = Math.max(0, MAX_LOGIN_ATTEMPTS - tentativas);
      
      if (tentativasRestantes > 0) {
        errorMessage.textContent = `Usuário ou senha inválidos. Tentativas restantes: ${tentativasRestantes}`;
      } else {
        errorMessage.textContent = "Conta bloqueada por segurança. Tente novamente em 15 minutos.";
      }
      
      loginBtn.textContent = textoBak;
      loginBtn.disabled = false;
    }
  } catch (error) {
    console.error("Erro na autenticação:", error);
    errorMessage.textContent = "Erro ao processar login. Tente novamente.";
    loginBtn.textContent = textoBak;
    loginBtn.disabled = false;
  }
});
