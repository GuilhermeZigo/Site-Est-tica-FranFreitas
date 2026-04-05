# 🎨 Guia de Estilo

Padrões de código e convenções para manter a qualidade e consistência do projeto.

## 📝 HTML

### Estrutura Básica
```html
<!-- Use tags semânticas -->
<header>
  <nav class="navbar">...</nav>
</header>

<main>
  <section class="hero">...</section>
  <section class="procedimentos-section">...</section>
</main>

<footer>
  <p>&copy; 2026 Fran Freitas</p>
</footer>
```

### Convenções
- ✅ Use 2 espaços para indentação
- ✅ Use kebab-case para classes: `.navbar`, `.btn-primary`
- ✅ Use IDs apenas quando absolutamente necessário
- ✅ Atributos em ordem: id, class, data-*, aria-*
- ✅ Feche tags auto-fecháveis: `<img />`, `<input />`

### Exemplo
```html
<div id="hero" class="hero-section" data-section="hero">
  <h1 class="hero-title">Título Principal</h1>
  <p class="hero-subtitle">Subtítulo descritivo</p>
  <img src="img/logo.png" alt="Logo Fran Freitas" class="logo" />
</div>
```

---

## 🎨 CSS

### Organização por Component
```css
/* === COMPONENT NAME === */

.component {
  /* Propriedades de posicionamento */
  position: relative;
  display: flex;
  
  /* Box Model */
  margin: 20px;
  padding: 15px;
  
  /* Dimensões */
  width: 100%;
  height: auto;
  
  /* Visual */
  background: var(--primary-color);
  border-radius: 8px;
  
  /* Tipografia */
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  
  /* Transições */
  transition: var(--transition-smooth);
}

/* Pseudo-classes */
.component:hover {
  transform: translateY(-2px);
}

.component::before {
  content: "";
  position: absolute;
  inset: 0;
  background: gradient(...);
}
```

### CSS Variables (Preferir!)
```css
:root {
  /* Cores */
  --primary-color: #00bcd4;
  --primary-light: #4dd0e1;
  --primary-dark: #0097a7;
  
  /* Espaçamento */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Bordas */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 50%;
  
  /* Sombras */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);
  
  /* Transições */
  --transition-fast: all 0.2s ease;
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Breakpoints
```css
/* Mobile First Approach */
.component {
  /* Mobile: 375px - 480px */
  padding: 10px;
  font-size: 0.9rem;
}

@media (min-width: 481px) and (max-width: 768px) {
  /* Tablet: 481px - 768px */
  .component {
    padding: 15px;
    font-size: 1rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* Tablet grande: 769px - 1024px */
  .component {
    padding: 20px;
    font-size: 1.1rem;
  }
}

@media (min-width: 1025px) {
  /* Desktop: 1025px+ */
  .component {
    padding: 24px;
    font-size: 1.2rem;
  }
}
```

### Convenções
- ✅ Use 2 espaços para indentação
- ✅ Use kebab-case para classes
- ✅ Use CSS variables em vez de valores hardcoded
- ✅ Ordene propriedades: layout, box-model, visual, tipografia, transições
- ✅ Agrupe seletores relacionados

---

## 🟨 JavaScript

### Nomenclatura
```javascript
// Constantes: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_ENDPOINT = 'https://api.example.com';

// Funções: camelCase
function validarEmail(email) { }
const gerarPDF = () => { };

// Classes: PascalCase
class UserManager { }

// Variáveis: camelCase
let userName = '';
const totalPrice = 100;
```

### Estrutura de Função
```javascript
/**
 * Brevíssima descrição do que a função faz
 * @param {type} paramName - Descrição do parâmetro
 * @returns {type} Descrição do retorno
 * @throws {Error} Condições em que lança erro
 * @example
 * const result = funcao('valor');
 */
function minhaFuncao(paramName) {
  // Validação de entrada
  if (!paramName) {
    throw new Error('paramName é obrigatório');
  }
  
  // Lógica
  const resultado = paramName.toUpperCase();
  
  // Retorno
  return resultado;
}
```

### Usar const por padrão
```javascript
✅ const id = 123;           // Nunca muda
✅ let contador = 0;         // Muda dentro de escopo
❌ var nome = 'João';        // Evitar, use const/let

// Para objetos e arrays
const usuario = { nome: 'João' };
usuario.email = 'joao@example.com'; // ✅ OK - propriedades podem mudar
```

### Error Handling
```javascript
// ✅ Bom
try {
  const dados = JSON.parse(resposta);
  return dados;
} catch (erro) {
  console.error('Erro ao fazer parse JSON:', erro);
  throw new Error(`Falha ao processar dados: ${erro.message}`);
}

// ❌ Ruim
try {
  const dados = JSON.parse(resposta);
} catch (e) {
  console.log('erro');
}
```

### Comentários
```javascript
// ✅ Bom - Explica o "por quê"
// Arredonda para 2 casas decimais para evitar problemas de
// precisão com ponto flutuante
const preco = Math.round(precoTotal * 100) / 100;

// ❌ Ruim - Óbvio demais
// Incrementa o contador
contador++;

// ✅ Comentários de bloco para seções
// =============================================
// VALIDAÇÃO DE FORMULÁRIO
// =============================================
function validarFormulario(dados) { }
```

### Async/Await
```javascript
// ✅ Preferir async/await
async function buscarDados() {
  try {
    const resposta = await fetch('/api/dados');
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error('Erro ao buscar dados:', erro);
    throw erro;
  }
}

// Em vez de promises encadeadas
❌ fetch('/api/dados')
  .then(res => res.json())
  .then(dados => processar(dados))
  .catch(erro => console.log(erro));
```

### Exemplo Completo
```javascript
/**
 * Valida email e envia confirmação
 * @param {string} email - Email a validar
 * @returns {Promise<Object>} Resultado da tentativa
 */
async function validarEEnviarConfirmacao(email) {
  // Validação
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Email inválido');
  }
  
  // Lógica
  try {
    const resposta = await fetch('/api/verificar-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`);
    }
    
    const resultado = await resposta.json();
    return resultado;
  } catch (erro) {
    console.error('Erro ao verificar email:', erro);
    throw erro;
  }
}
```

---

## 🔍 Checklist de Qualidade

### Antes de Fazer Commit

- [ ] Código segue estes padrões
- [ ] Sem `console.log` ou `debugger` deixados
- [ ] Sem código comentado ou morto
- [ ] Nomes de variáveis são descritivos
- [ ] Funções fazem uma coisa bem
- [ ] Sem linhas muito longas (>80 caracteres)
- [ ] Indentação consistente
- [ ] Sem trailing whitespace

### Antes de Push para Main

- [ ] Testei em Chrome, Firefox e Safari
- [ ] Testei em mobile (375px)
- [ ] Testei em tablet (768px)
- [ ] Performance OK (Lighthouse 90+)
- [ ] Sem erros no console
- [ ] Responsividade mantida

---

## Tools Recomendadas

- **VS Code**: Editor principal
- **Live Server**: Servidor local
- **DevTools**: Chrome/Firefox DevTools
- **Lighthouse**: Performance audit
- **ColorPick**: Selecionador de cores
- **Prettier**: Code formatter (opcional)
- **ESLint**: Linter (opcional)

---

**Última atualização:** 2026-04-05
