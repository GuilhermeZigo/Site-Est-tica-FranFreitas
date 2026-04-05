# 💎 Clínica Fran Freitas - Biomédica Esteta

## 📋 Sobre

Plataforma moderna e responsiva para a **Clínica Fran Freitas**, especializada em procedimentos estéticos com biomedicina. O projeto apresenta portfólio de procedimentos, sistema de agendamento online e área administrativa para gestão de orçamentos.

### ✨ Características Principais

- 🌐 **Website Responsivo**: Design moderno que funciona em todos os dispositivos
- 📱 **15+ Procedimentos**: Filtráveis por categoria com descrições detalhadas
- 📊 **Gerador de Orçamentos**: PDF personalizados com procedimentos e pacotes
- 🔐 **Área Administrativa**: Acesso seguro para gestão de orçamentos
- 🎨 **Design System**: Paleta de cores coerente com animações elegantes
- ⚡ **Performance Otimizada**: Carregamento rápido e transições suaves
- 📧 **Integração com Email**: Sistema de contato com confirmação

---

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Animações, Grid, Flexbox
- **JavaScript Vanilla** - Sem dependências externas
- **Animate.css** - Biblioteca de animações
- **html2canvas** - Captura de elementos para PDF
- **jsPDF** - Geração de PDFs

### Versioning & Deployment
- **Git** - Controle de versão
- **Github** - Repositório e CI/CD
- **Vercel/Netlify** - Deployment (recomendado)

---

## 📁 Estrutura do Projeto

```
biomédica-esteta/
├── index.html                 # Página principal
├── css/
│   ├── style.css             # Estilos globais e design system
│   ├── login.css             # Estilos da página de login
│   └── orcamento.css         # Estilos do gerador de orçamentos
├── js/
│   ├── main.js               # Lógica principal (animações, scroll)
│   ├── login.js              # Autenticação e validação
│   └── orcamento.js          # Geração de PDFs e operações com tabelas
├── pages/
│   ├── login.html            # Página de login (área admin)
│   └── orcamento.html        # Gerador de orçamentos
├── img/
│   ├── logo.png              # Logo da clínica
│   ├── bg-estetica.jpg       # Imagem de fundo hero
│   ├── whatsapp-icon.png     # Ícone WhatsApp (fallback)
│   └── instagram-icon.png    # Ícone Instagram (fallback)
├── .gitignore                # Arquivos a ignorar no git
├── README.md                 # Este arquivo
├── CONTRIBUTING.md           # Guia de contribuição
├── LICENSE                   # Licença MIT
├── config.example.json       # Configurações de exemplo
└── .env.example              # Variáveis de ambiente de exemplo
```

---

## 🚀 Como Começar

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Git instalado (para contribuições)

### Instalação Local

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/biomedica-esteta.git

# 2. Navegue até o diretório
cd biomedica-esteta

# 3. Abra em um servidor local (necessário para alguns recursos)

# Opção A: Python
python -m http.server 8000
# Acesse: http://localhost:8000

# Opção B: Node.js com http-server
npx http-server
# Acesse: http://localhost:8080

# Opção C: Live Server (VS Code)
# Instale a extensão "Live Server"
# Clique com direito no index.html e selecione "Open with Live Server"
```

---

## 🔧 Configuração

### Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

2. Configure as variáveis necessárias:
```env
# WhatsApp Business
WHATSAPP_PHONE=5511986532841

# EmailJS (opcional - para contato por email)
EMAILJS_SERVICE_ID=service_xxxxx
EMAILJS_TEMPLATE_ID=template_xxxxx
EMAILJS_PUBLIC_KEY=public_xxxxx

# Google Sheets (opcional - para logging de agendamentos)
GOOGLE_SHEETS_API_KEY=xxxxx
```

### Configuração da Clínica

Edite `config.example.json` e customize os dados:

```json
{
  "clinica": {
    "nome": "Fran Freitas",
    "especialidade": "Biomédica Esteta",
    "telefone": "+5511986532841",
    "email": "contato@franfreitas.com.br",
    "endereco": "Rua Nossa Senhora da Lapa, 184, Sala 11 - São Paulo/SP"
  },
  "procedimentos": {
    "taxaAdministrativa": 0.10,
    "condicoesPagamento": "À combinar"
  },
  "design": {
    "corPrimaria": "#00bcd4",
    "corSecundaria": "#ff9800"
  }
}
```

---

## 📄 Páginas

### 1. **index.html** - Página Principal
- Hero section com parallax
- Seção de estatísticas (clientes, experiência, procedimentos)
- About da profissional
- 6 vantagens principais
- 15+ procedimentos com filtros
- CTA section para agendamento
- Depoimentos de clientes
- Seção de contato

**Recursos:**
- Animações on-scroll
- Contador de números
- Filtro de procedimentos
- Links para WhatsApp e Instagram

### 2. **pages/login.html** - Área Administrativa
- Autenticação simples (localStorage)
- Design elegante com gradientes
- Redireciona para página de orçamentos após login

**Credenciais Padrão:**
- Email: `admin@biomedica.com.br`
- Senha: `Admin123456` (⚠️ Mude em produção!)

### 3. **pages/orcamento.html** - Gerador de Orçamentos
- Formulário de dados do cliente
- Tabela dinâmica de procedimentos
- Tabela dinâmica de pacotes
- Preview do orçamento
- Geração de PDF com html2canvas + jsPDF
- Validação completa de campos

**Funcionalidades:**
- ➕ Adicionar/Remover procedimentos
- ➕ Adicionar/Remover pacotes
- 📋 Prévia em tempo real
- 📄 Download em PDF

---

## 🎨 Design System

### Paleta de Cores
```
Primária:    #00bcd4 (Cyan claro)
Primária+:   #4dd0e1 (Cyan médio)
Primária-:   #0097a7 (Cyan escuro)
Secundária:  #ff9800 (Orange)
Secundária+: #ffb74d (Orange claro)
Secundária-: #e68900 (Orange escuro)
Dark:        #004d5e (Azul escuro)
```

### Tipografia
```
Font Family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
H1: 4rem / 800 weight
H2: 2.2rem / 700 weight
H3: 1.3rem / 600 weight
Body: 1rem / 400 weight
```

### Animações
- `fadeInDown` - Fade + slide de cima
- `fadeInUp` - Fade + slide de baixo
- `scaleIn` - Zoom suave
- `slideInLeft` - Slide da esquerda
- `floatUp` - Flutuação contínua
- `pulse` - Pulsação suave

---

## 🔌 Integrações de API

### WhatsApp
```javascript
// Link direto para WhatsApp
const phone = "5511986532841";
const message = "Olá, gostaria de agendar uma consulta!";
window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
```

### Gmail (Future Integration)
```javascript
// Exemplo de integração com EmailJS
emailjs.init("your_public_key");
emailjs.send("service_id", "template_id", {
  to_email: "cliente@example.com",
  subject: "Seu Orçamento",
  message: "Segue em anexo seu orçamento..."
});
```

### Google Sheets (Logging de Agendamentos)
Adicione um script personalizado para registrar automaticamente agendamentos em uma planilha Google:

```javascript
// POST para Google Apps Script Web App
fetch('https://script.google.com/macros/s/YOUR_SCRIPTID/usercontent', {
  method: 'POST',
  body: JSON.stringify({
    nome: clienteData.nome,
    telefone: clienteData.telefone,
    procedimento: procedimento,
    data: new Date()
  })
});
```

---

## 🔐 Segurança

### Autenticação
- ✅ Credenciais armazenadas em localStorage (desenvolvimento)
- ❌ **NÃO use em produção!**

**Para Produção:**
- Implemente backend com JWT
- Use HTTPS obrigatoriamente
- Adicione CORS headers
- Valide dados no servidor

### Dados Sensíveis
- Nunca commit `.env` files
- Use `.env.example` como template
- Valide inputs no frontend E backend

---

## 📱 Responsividade

Breakpoints implementados:
```css
Desktop:  1920px+
Tablet:   768px - 1024px
Mobile:   480px - 767px
```

Todas as páginas são totalmente responsivas com testes em:
- iPhone (375px, 550px)
- iPad (768px)
- Desktop (1920px)

---

## 🐛 Troubleshooting

### PDF não gera
- Verifique se a div `.preview-container` existe
- Certifique-se de que html2canvas está carregado
- Verifique console para erros de CORS

### Animações não funcionam
- Atualize o navegador (F5 ou Cmd+Shift+R)
- Verifique se Animate.css CDN está acessível
- Desabilite extensões que bloqueiem scripts

### Formulário não valida
- Preencha todos os campos obrigatórios
- Valide o formato do email
- Adicione pelo menos 1 procedimento ou pacote

---

## 🚀 Deployment

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build  # se houver build script
# Arraste a pasta do projeto para Netlify
```

### GitHub Pages
1. Crie repositório `seu-usuario.github.io`
2. Push o projeto
3. Acesse `https://seu-usuario.github.io`

---

## 📊 Performance

### Otimizações Implementadas
- ✅ Lazy loading de imagens
- ✅ CSS minificado
- ✅ Sem dependências pesadas
- ✅ Animações GPU-accelerated
- ✅ Intersection Observer para animações on-scroll

### Lighthouse Score Target
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 📝 Contribuindo

Leia [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre nosso código de conduta e processo de pull requests.

### Quick Start para Contribuidores
```bash
git checkout -b feature/sua-feature
# Faça suas mudanças
git commit -m "feat: descrição breve"
git push origin feature/sua-feature
# Abra um Pull Request
```

---

## 📄 Licença

Este projeto está sob a **Licença MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👩‍💼 Sobre Fran Freitas

**Biomédica Esteta** com anos de experiência em procedimentos estéticos. Especializada em técnicas modernas com foco em segurança, naturalidade e satisfação dos clientes.

### Contato
- 📱 WhatsApp: [+55 11 98653-2841](https://wa.me/5511986532841)
- 📍 Endereço: Rua Nossa Senhora da Lapa, 184, Sala 11 - São Paulo/SP
- 📸 Instagram: [@dra_franfreitas](https://www.instagram.com/dra_franfreitas/)

---

## 🙏 Agradecimentos

- [Animate.css](https://animate.style/) - Biblioteca de animações
- [html2canvas](https://html2canvas.hertzen.com/) - Captura de elementos
- [jsPDF](https://github.com/parallax/jsPDF) - Geração de PDFs

---

**Desenvolvido com ❤️ para transformar autoestima com responsabilidade e técnica.**

*Última atualização: Abril 2026*
