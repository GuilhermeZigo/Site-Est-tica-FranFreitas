# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para a **Clínica Fran Freitas**! Este documento fornece diretrizes e instruções para contribuir.

## 📋 Código de Conduta

- Seja respeitoso com todos os colaboradores
- Não tolere assédio ou discriminação
- Foque em feedback construtivo
- Respeite a privacidade dos usuários

## 🐛 Encontrou um Bug?

1. **Procure no GitHub Issues** se o bug já foi reportado
2. Se não encontrou, [abra uma nova issue](../../issues/new)
3. Descreva:
   - Comportamento esperado vs. atual
   - Passos para reproduzir
   - Screenshots/vídeos se possível
   - Navegador e versão
   - Sistema operacional

## ✨ Sugestões de Melhorias

1. Use o título descritivo com clareza
2. Forneça descrição detalhada da melhoria sugerida
3. Liste exemplos de como a melhoria seria útil
4. Mencione outras implementações semelhantes

## 🔧 Pull Request Process

### Antes de Começar
```bash
# 1. Fork o repositório
# 2. Clone seu fork
git clone https://github.com/seu-usuario/biomedica-esteta.git

# 3. Crie uma branch
git checkout -b feature/sua-feature

# 4. Configure o projeto local
# (Veja README.md para instruções)
```

### Enquanto Desenvolve
```bash
# Siga o padrão de commits
git commit -m "type(scope): subject"

# Exemplos de tipos:
# feat:     Nova funcionalidade
# fix:      Bug fix
# docs:     Documentação
# style:    Formatação (sem mudanças de lógica)
# refactor: Refatoração de código
# test:     Testes
# chore:    Tasks auxiliares
```

### Antes de Fazer Push
- ✅ Valide todos os campos de formulários
- ✅ Teste em diferentes navegadores
- ✅ Teste responsividade (mobile, tablet, desktop)
- ✅ Verifique performance (Lighthouse)
- ✅ Rode o code linter (se aplicável)
- ✅ Atualize documentação se necessário

### Fazendo o Push
```bash
# Push para seu fork
git push origin feature/sua-feature

# Abra um Pull Request no GitHub
# 1. Vá para o repositório original
# 2. Clique em "New Pull Request"
# 3. Selecione sua branch
# 4. Preencha o template de PR
```

## 📝 Padrão de Pull Request

```markdown
## Descrição
Breve descrição do que foi mudado e por quê.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Testes Realizados
Descreva os testes que foram rodados.

## Checklist
- [ ] Código segue o style guide
- [ ] Testei em Chrome
- [ ] Testei em Firefox
- [ ] Testei em mobile
- [ ] Atualizei a documentação
- [ ] Adicionei testes (se necessário)
```

## 🎨 Padrões de Código

### HTML
- Use tags semânticas
- Indente com 2 espaços
- Nomes descritivos para classes/ids

### CSS
- Use CSS custom properties (CSS Variables)
- Organize por componente
- Mobile-first approach
- Nomes em kebab-case

### JavaScript
- Use ES6+
- Nomes descritivos para funções/variáveis
- Adicione comentários para lógica complexa
- Use const por padrão, depois let

### Exemplo de Função Bem Documentada
```javascript
/**
 * Valida e processa dados do formulário
 * @param {Object} formData - Dados do formulário
 * @param {string} formData.nome - Nome do cliente
 * @param {string} formData.email - Email do cliente
 * @returns {Object|null} Dados validados ou null se inválido
 * @throws {Error} Se email inválido
 */
function validarFormulario(formData) {
  if (!formData.nome?.trim()) {
    throw new Error('Nome é obrigatório');
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    throw new Error('Email inválido');
  }
  
  return formData;
}
```

## 🔍 Processo de Review

1. Um ou mais mantenedores vão revisar seu código
2. Solicitarão mudanças se necessário
3. Uma vez aprovado, será feito merge

## 📚 Recursos Úteis

- [Markdown Guide](https://www.markdownguide.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript Info](https://javascript.info/)

## ❓ Perguntas?

Abra uma [Discussion](../../discussions) para fazer perguntas!

---

**Obrigado por contribuir! 🙏**
