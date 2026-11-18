const API_URL = "/api/Materiais";
const form = document.querySelector("#form-material");
const lista = document.querySelector("#lista-materiais");
const mensagem = document.querySelector("#mensagem");
const tipo = document.querySelector("#tipo");

function avisar(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.className = `alert alert-${erro ? "danger" : "success"}`;
}

async function chamarApi(url, opcoes = {}) {
  const resposta = await fetch(url, {
    ...opcoes,
    headers: opcoes.body ? { "Content-Type": "application/json" } : {},
  });
  if (!resposta.ok) throw new Error(`Erro ${resposta.status} ao acessar a API.`);
  return resposta.status === 204 ? null : resposta.json();
}

function adicionarCelula(linha, valor) {
  const celula = document.createElement("td");
  celula.textContent = valor ?? "";
  linha.append(celula);
}

async function carregarMateriais() {
  lista.replaceChildren();
  try {
    const materiais = await chamarApi(API_URL);
    if (materiais.length === 0) {
      const linha = document.createElement("tr");
      adicionarCelula(linha, "Nenhum material cadastrado.");
      linha.firstChild.colSpan = 5;
      lista.append(linha);
      return;
    }

    materiais.forEach((material) => {
      const linha = document.createElement("tr");
      const id = material.id ?? material.Id;
      const materialTipo = (material.tipo || material.Tipo || "").toLowerCase();
      adicionarCelula(linha, id);
      adicionarCelula(linha, material.titulo || material.Titulo);
      adicionarCelula(linha, materialTipo);
      adicionarCelula(linha, materialTipo === "livro"
        ? `${material.autor || material.Autor || ""} · ${material.paginas || material.Paginas || ""} páginas`
        : `${material.edicao || material.Edicao || ""} · mês ${material.mesPublicacao || material.MesPublicacao || ""}`);

      const acoes = document.createElement("td");
      const editar = document.createElement("button");
      editar.className = "btn btn-sm btn-outline-primary me-2";
      editar.textContent = "Editar";
      editar.onclick = () => editarMaterial(material);
      const excluir = document.createElement("button");
      excluir.className = "btn btn-sm btn-outline-danger";
      excluir.textContent = "Excluir";
      excluir.onclick = () => excluirMaterial(id);
      acoes.append(editar, excluir);
      linha.append(acoes);
      lista.append(linha);
    });
  } catch (erro) {
    avisar(erro.message, true);
  }
}

function atualizarCampos() {
  const livro = tipo.value === "livro";
  document.querySelector("#campos-livro").classList.toggle("d-none", !livro);
  document.querySelector("#campos-revista").classList.toggle("d-none", livro);
  document.querySelector("#autor").required = livro;
  document.querySelector("#paginas").required = livro;
  document.querySelector("#edicao").required = !livro;
  document.querySelector("#mes").required = !livro;
}

function editarMaterial(material) {
  document.querySelector("#id").value = material.id ?? material.Id;
  tipo.value = (material.tipo || material.Tipo || "").toLowerCase();
  document.querySelector("#titulo").value = material.titulo || material.Titulo || "";
  document.querySelector("#autor").value = material.autor || material.Autor || "";
  document.querySelector("#paginas").value = material.paginas || material.Paginas || "";
  document.querySelector("#edicao").value = material.edicao || material.Edicao || "";
  document.querySelector("#mes").value = material.mesPublicacao || material.MesPublicacao || "";
  atualizarCampos();
  document.querySelector("#titulo-formulario").textContent = "Editar material";
  document.querySelector("#botao-salvar").textContent = "Salvar";
  document.querySelector("#botao-cancelar").classList.remove("d-none");
}

function limparFormulario() {
  form.reset();
  document.querySelector("#id").value = "";
  document.querySelector("#titulo-formulario").textContent = "Cadastrar material";
  document.querySelector("#botao-salvar").textContent = "Cadastrar";
  document.querySelector("#botao-cancelar").classList.add("d-none");
  atualizarCampos();
}

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const id = document.querySelector("#id").value;
  const dados = { tipo: tipo.value, titulo: document.querySelector("#titulo").value };

  if (tipo.value === "livro") {
    dados.autor = document.querySelector("#autor").value;
    dados.paginas = Number(document.querySelector("#paginas").value);
  } else {
    dados.edicao = document.querySelector("#edicao").value;
    dados.mesPublicacao = Number(document.querySelector("#mes").value);
  }

  try {
    await chamarApi(id ? `${API_URL}/${id}` : API_URL, {
      method: id ? "PUT" : "POST",
      body: JSON.stringify(dados),
    });
    limparFormulario();
    avisar("Material salvo.");
    carregarMateriais();
  } catch (erro) {
    avisar(erro.message, true);
  }
});

async function excluirMaterial(id) {
  if (!confirm("Deseja excluir este material?")) return;
  try {
    await chamarApi(`${API_URL}/${id}`, { method: "DELETE" });
    avisar("Material excluído.");
    carregarMateriais();
  } catch (erro) {
    avisar(erro.message, true);
  }
}

tipo.addEventListener("change", atualizarCampos);
document.querySelector("#botao-atualizar").addEventListener("click", carregarMateriais);
document.querySelector("#botao-cancelar").addEventListener("click", limparFormulario);

atualizarCampos();
carregarMateriais();
