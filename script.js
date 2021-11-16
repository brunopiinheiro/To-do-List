var botaoDeTarefa = document.getElementById("botaoAcionador")
var tarefaEscrita = document.getElementById("textoDigitado");
var lista = document.getElementById("lista");
var tarefas = recuperarTarefas();
var checkboxes = tarefas.length;

function recuperarTarefas() {
    var novasTarefas = localStorage.getItem("listaDeTarefas");
    if (novasTarefas) {
        return JSON.parse(novasTarefas);
    } else {
        return [];
    }
}

function salvarTarefa(tarefaParaEscrever, checked, idTarefa) {
    tarefas.push({ nomeTarefa: tarefaParaEscrever, checado: checked, idTarefa });
    localStorage.setItem("listaDeTarefas", JSON.stringify(tarefas));

}

function trEscrita() {
    return tarefaEscrita.value.length;
}

function criarEstruturaTarefa(nomeTarefa, tarefaCompleta, idTarefa) {
    var crTarefa = document.createElement("li");
    crTarefa.classList.add("lista-tarefa");
    criarCheckbox({ listaItem: crTarefa, tarefaEscritaItem: nomeTarefa, tarefaCompleta, idTarefa });
    lista.appendChild(crTarefa);
    tarefaEscrita.value = "";
}

function criarTarefa() {
    var idCheckboxAtual = "checkbox" + checkboxes;
    salvarTarefa(tarefaEscrita.value, false, idCheckboxAtual);
    criarEstruturaTarefa(tarefaEscrita.value);
}

function alterarTarefa(idTarefa) {
    var tarefa;
    for (var t = 0; t < tarefas.length; t++) {
        if (tarefas[t].idTarefa === idTarefa) {
            tarefa = tarefas[t]
        }
    }
    tarefa.checado = !tarefa.checado;
    localStorage.setItem("listaDeTarefas", JSON.stringify(tarefas));
}



function criarCheckbox({ tarefaEscritaItem, listaItem, tarefaCompleta, idTarefa }) {
    var checkbox = document.createElement("input");
    var idCheckboxAtual;
    if (idTarefa) {
        idCheckboxAtual = idTarefa;
    } else {
        idCheckboxAtual = "checkbox" + checkboxes;
        checkboxes++;
    }
    checkbox.onchange = function(e) {
        alterarTarefa(e.target.id);
    }
    checkbox.type = "checkbox";
    checkbox.checked = tarefaCompleta ? tarefaCompleta : false
    checkbox.id = idCheckboxAtual;
    var label = document.createElement("label");
    label.htmlFor = idCheckboxAtual;
    label.innerHTML = tarefaEscritaItem;
    listaItem.appendChild(checkbox);
    listaItem.appendChild(label);
    criarBotaoDeletar({ elementoParaDeletar: listaItem, idCheckboxDeletar: idCheckboxAtual })
}

function criarBotaoDeletar({ elementoParaDeletar, idCheckboxDeletar }) {
    var botaoDeletar = document.createElement("button");
    botaoDeletar.textContent = "Apagar";
    botaoDeletar.classList.add("deleta");
    botaoDeletar.onclick = function() {
        deletarElemento(elementoParaDeletar, idCheckboxDeletar);
    }
    elementoParaDeletar.appendChild(botaoDeletar);
}

function deletarElemento(elementoParaDeletar, idTarefa) {
    elementoParaDeletar.remove()
    var tarefasNaoExcluidas = [];
    for (var t = 0; t < tarefas.length; t++) {
        if (tarefas[t].idTarefa !== idTarefa) {
            tarefasNaoExcluidas.push(tarefas[t]);
        }
    }
    tarefas = tarefasNaoExcluidas;
    localStorage.setItem("listaDeTarefas", JSON.stringify(tarefasNaoExcluidas));
}

function adicionar() {
    if (trEscrita() > 0) {
        criarTarefa();
    }
}

for (var t = 0; t < tarefas.length; t++) {
    criarEstruturaTarefa(tarefas[t].nomeTarefa, tarefas[t].checado, tarefas[t].idTarefa);
}