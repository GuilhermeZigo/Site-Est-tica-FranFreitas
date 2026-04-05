// Configuração de estado de geração
let isGeneratingPDF = false;

function adicionarProcedimento() {
  const tabela = document.querySelector("#tabelaProcedimentos tbody");
  const linha = document.createElement("tr");
  const id = Date.now();

  linha.innerHTML = `
    <td><input type="text" placeholder="Nome do procedimento" required></td>
    <td><input type="number" min="1" value="1" required></td>
    <td><input type="number" min="0" step="0.01" required></td>
    <td><button type="button" class="btn-remove" onclick="removerProcedimento(this)" title="Remover">✕ Remover</button></td>
  `;

  tabela.appendChild(linha);
  
  // Animação suave
  linha.style.opacity = "0";
  linha.style.animation = "slideInUp 0.3s ease-out forwards";
}

function removerProcedimento(botao) {
  const linha = botao.closest("tr");
  linha.style.animation = "fadeOut 0.2s ease-out forwards";
  setTimeout(() => linha.remove(), 200);
}

function adicionarPacote() {
  const tabela = document.querySelector("#tabelaPacotes tbody");
  const linha = document.createElement("tr");
  const id = Date.now();

  linha.innerHTML = `
    <td><textarea placeholder="Descreva o pacote" rows="3" required></textarea></td>
    <td><input type="number" min="0" step="0.01" required></td>
    <td><button type="button" class="btn-remove" onclick="removerPacote(this)" title="Remover">✕ Remover</button></td>
  `;

  tabela.appendChild(linha);
  
  // Animação suave
  linha.style.opacity = "0";
  linha.style.animation = "slideInUp 0.3s ease-out forwards";
}

function removerPacote(botao) {
  const linha = botao.closest("tr");
  linha.style.animation = "fadeOut 0.2s ease-out forwards";
  setTimeout(() => linha.remove(), 200);
}

// Função auxiliar para escapar HTML (segurança)
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Função auxiliar para formatar data
function formatarData(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("pt-BR");
}

function gerarPDF() {
  // Prevenir múltiplas gerações simultâneas
  if (isGeneratingPDF) {
    alert("Um PDF já está sendo gerado. Aguarde.");
    return;
  }

  // Validações de campos obrigatórios
  const paciente = document.getElementById("paciente").value.trim();
  const validade = document.getElementById("validade").value.trim();
  const pagamento = document.getElementById("pagamento").value.trim();
  const brinde = document.getElementById("brinde").value.trim();
  const obs = document.getElementById("obs").value.trim();

  if (!paciente) {
    alert("⚠️ Por favor, preencha o Nome da Paciente");
    document.getElementById("paciente").focus();
    return;
  }

  if (!validade) {
    alert("⚠️ Por favor, preencha a Data de Validade");
    document.getElementById("validade").focus();
    return;
  }

  if (!pagamento) {
    alert("⚠️ Por favor, preencha a Forma de Pagamento");
    document.getElementById("pagamento").focus();
    return;
  }

  // Recolher procedimentos e pacotes
  const procedimentos = [];
  const linhas = document.querySelectorAll("#tabelaProcedimentos tbody tr");
  
  linhas.forEach((linha, idx) => {
    const cols = linha.querySelectorAll("input");
    if (cols.length >= 3) {
      const nome = (cols[0].value || "").trim();
      const sessoes = parseInt(cols[1].value) || 0;
      const valor = parseFloat(cols[2].value) || 0;
      
      if (nome && sessoes > 0 && valor > 0) {
        procedimentos.push({ nome, sessoes, valor });
      }
    }
  });

  const pacotes = [];
  const linhasPacote = document.querySelectorAll("#tabelaPacotes tbody tr");
  
  linhasPacote.forEach((linha, idx) => {
    const cols = linha.querySelectorAll("textarea, input");
    if (cols.length >= 2) {
      const descricao = (cols[0].value || "").trim();
      const valor = parseFloat(cols[1].value) || 0;
      
      if (descricao && valor > 0) {
        pacotes.push({ descricao, valor });
      }
    }
  });

  // Validação: deve ter pelo menos um procedimento ou pacote
  if (procedimentos.length === 0 && pacotes.length === 0) {
    alert("⚠️ Adicione pelo menos um Procedimento ou um Pacote Promocional");
    return;
  }

  isGeneratingPDF = true;

  // Gerar HTML das tabelas
  let total = 0;
  let tabelaHtml = `
    <table style="width:100%; border-collapse: collapse; margin-top: 15px; border: 1px solid #ddd;">
      <tr style="background: linear-gradient(135deg, #00bcd4 0%, #0097a7 100%); color:white;">
        <th style="padding:12px; text-align: left; border: 1px solid #ddd; font-weight: 600;">Procedimento</th>
        <th style="padding:12px; text-align: center; border: 1px solid #ddd; font-weight: 600;">Sessões</th>
        <th style="padding:12px; text-align: right; border: 1px solid #ddd; font-weight: 600;">Valor por Sessão</th>
        <th style="padding:12px; text-align: right; border: 1px solid #ddd; font-weight: 600;">Total</th>
      </tr>
  `;

  procedimentos.forEach(proc => {
    const subtotal = proc.sessoes * proc.valor;
    total += subtotal;
    tabelaHtml += `
      <tr style="border: 1px solid #eee;">
        <td style="padding:10px; border: 1px solid #eee;">${escapeHtml(proc.nome)}</td>
        <td style="padding:10px; text-align: center; border: 1px solid #eee;">${proc.sessoes}</td>
        <td style="padding:10px; text-align: right; border: 1px solid #eee;">R$ ${parseFloat(proc.valor).toFixed(2)}</td>
        <td style="padding:10px; text-align: right; border: 1px solid #eee; font-weight: 600;">R$ ${subtotal.toFixed(2)}</td>
      </tr>
    `;
  });

  tabelaHtml += `<tr style="background: #f5f5f5; font-weight: bold; border: 1px solid #ddd;">
    <td colspan="3" style="padding:12px; border: 1px solid #ddd; text-align: right;">SUBTOTAL PROCEDIMENTOS:</td>
    <td style="padding:12px; border: 1px solid #ddd; text-align: right;">R$ ${total.toFixed(2)}</td>
  </tr></table>`;

  let totalPacotes = 0;
  let tabelaPacotesHtml = "";

  if (pacotes.length > 0) {
    tabelaPacotesHtml = `
      <table style="width:100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #ddd;">
        <tr style="background: linear-gradient(135deg, #ff9800 0%, #e68900 100%); color:white;">
          <th style="padding:12px; text-align: left; border: 1px solid #ddd; font-weight: 600;">Descrição do Pacote</th>
          <th style="padding:12px; text-align: right; border: 1px solid #ddd; font-weight: 600;">Valor Total</th>
        </tr>
    `;

    pacotes.forEach(pac => {
      totalPacotes += parseFloat(pac.valor);
      tabelaPacotesHtml += `
        <tr style="border: 1px solid #eee;">
          <td style="padding:10px; border: 1px solid #eee;">${escapeHtml(pac.descricao).replace(/\n/g, "<br>")}</td>
          <td style="padding:10px; text-align: right; border: 1px solid #eee; font-weight: 600;">R$ ${parseFloat(pac.valor).toFixed(2)}</td>
        </tr>
      `;
    });

    tabelaPacotesHtml += `<tr style="background: #f5f5f5; font-weight: bold; border: 1px solid #ddd;">
      <td style="padding:12px; border: 1px solid #ddd; text-align: right;">SUBTOTAL PACOTES:</td>
      <td style="padding:12px; border: 1px solid #ddd; text-align: right;">R$ ${totalPacotes.toFixed(2)}</td>
    </tr></table>`;
  }

  const totalGeral = total + totalPacotes;

  // Renderizar prévia
  const content = `
    <div style="padding: 30px; background: white; font-family: 'Segoe UI', Roboto, Arial, sans-serif; color: #333;">
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #00bcd4; padding-bottom: 20px;">
        <h2 style="margin: 0; color: #004d5e; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">💼 Orçamento Estético</h2>
        <p style="margin: 8px 0 0 0; color: #666; font-size: 14px; font-weight: 500;">Clínica Fran Freitas - Biomédica Esteta</p>
      </div>

      <div style="margin-bottom: 25px; line-height: 1.8; background: #f9f9f9; padding: 20px; border-radius: 8px;">
        <p style="margin: 10px 0;"><strong style="color: #004d5e;">👤 Paciente:</strong> ${escapeHtml(paciente)}</p>
        <p style="margin: 10px 0;"><strong style="color: #004d5e;">📅 Data de Validade:</strong> ${formatarData(validade)}</p>
        <p style="margin: 10px 0;"><strong style="color: #004d5e;">💳 Forma de Pagamento:</strong> ${escapeHtml(pagamento)}</p>
        ${brinde ? `<p style="margin: 10px 0;"><strong style="color: #004d5e;">🎁 Brindes:</strong><br><span style="color: #666;">${escapeHtml(brinde).replace(/\n/g, "<br>")}</span></p>` : ""}
        ${obs ? `<p style="margin: 10px 0;"><strong style="color: #004d5e;">📝 Observações:</strong><br><span style="color: #666;">${escapeHtml(obs).replace(/\n/g, "<br>")}</span></p>` : ""}
      </div>

      ${procedimentos.length > 0 ? `<div style="margin: 25px 0;">${tabelaHtml}</div>` : ""}
      ${pacotes.length > 0 ? `<div style="margin: 25px 0;">${tabelaPacotesHtml}</div>` : ""}

      <div style="margin-top: 35px; padding: 25px; background: linear-gradient(135deg, rgba(0, 188, 212, 0.15) 0%, rgba(255, 152, 0, 0.08) 100%); border-radius: 12px; border-left: 5px solid #00bcd4; text-align: right;">
        <p style="margin: 0; font-size: 13px; color: #666; font-weight: 500;">Valor Total Geral:</p>
        <p style="margin: 12px 0 0 0; font-size: 32px; font-weight: 700; color: #00bcd4;">R$ ${totalGeral.toFixed(2)}</p>
      </div>

      <div style="margin-top: 35px; text-align: center; color: #999; font-size: 11px; border-top: 1px solid #ddd; padding-top: 20px;">
        <p style="margin: 0;">⏰ Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
        <p style="margin: 5px 0 0 0;">Este orçamento tem validade conforme a data indicada acima.</p>
      </div>
    </div>
  `;

  // Mostrar prévia
  const preview = document.getElementById("orcamento-content");
  preview.innerHTML = content;
  document.getElementById("orcamento-preview").style.display = "block";

  // Scroll para prévia
  setTimeout(() => {
    document.getElementById("orcamento-preview").scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);

  // Gerar PDF após prévia renderizar
  setTimeout(() => {
    gerarPDFComCanvas(preview, paciente);
  }, 500);
}

// Função para gerar PDF convertendo canvas em imagem
async function gerarPDFComCanvas(element, nomePaciente) {
  try {
    // Mostrar indicador de processamento
    const button = document.querySelector('button[onclick="gerarPDF()"]');
    const textoBak = button.textContent;
    button.textContent = "⏳ Gerando PDF...";
    button.disabled = true;

    // Usar html2canvas para converter elemento em imagem
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    // Obter dimensões
    const imgWidth = 210; // A4 width em mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const imgData = canvas.toDataURL("image/png");

    // Criar PDF usando jsPDF
    const { jsPDF } = window.jspdf;
    let pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? "portrait" : "portrait",
      unit: "mm",
      format: "a4",
    });

    let yPos = 0;
    let heightLeft = imgHeight;

    // Inserir imagem no PDF (com múltiplas páginas se necessário)
    pdf.addImage(imgData, "PNG", 0, yPos, imgWidth, imgHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft >= 0) {
      yPos = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, yPos, imgWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    // Salvar PDF
    const nomeArquivo = `orcamento_${nomePaciente
      .replace(/\s+/g, "_")
      .replace(/[^\w\s-]/g, "")}_${new Date().toISOString().split("T")[0]}.pdf`;

    pdf.save(nomeArquivo);

    // Restaurar botão
    button.textContent = textoBak;
    button.disabled = false;
    isGeneratingPDF = false;
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    alert("Erro ao gerar o PDF. Tente novamente.\n" + error.message);
    isGeneratingPDF = false;
    
    // Restaurar botão
    const button = document.querySelector('button[onclick="gerarPDF()"]');
    button.textContent = "📄 Gerar Orçamento em PDF";
    button.disabled = false;
  }
}

// Adicionar estilos para animações
const styleElement = document.createElement("style");
styleElement.textContent = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .btn-remove {
    background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85em;
    transition: all 0.2s ease;
  }

  .btn-remove:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 6px rgba(255, 107, 107, 0.4);
  }

  button[onclick="gerarPDF()"]:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
document.head.appendChild(styleElement);
