import { pwd } from "./commands/pwd.js";
import {command} from "./models/commands.js";
import { init } from "./models/fileGraph.js";

init();

document.getElementById('CLIAtivo').addEventListener('keypress', function(event) {
    // conferindo se foi o enter
    if (event.key === 'Enter') {
        event.preventDefault(); // impede de recarregar
        // chama a função principal
        submitFunction();
    }
});


/*
    *Função de "Loop" principal, pega um input, é filtrado pela resposta
    *e concatena a resposta a pagina.
*/
function submitFunction() {

    // declaração das variaveis
    var line = document.getElementById('CLIAtivo');
    var terminal = document.getElementById('typing-container');
    //salvando o valor do input do usuário
    var texto = line.value;

    //desativando a linha antiga
    line.blur()
    line.disabled = true
    line.className = "CLIVelho"
    line.removeAttribute("id");
    
    // criando o elemento a ser concatenado
    var element;
    //constante que sempre será adicionado ao fim
    
    //chamando a função de resposta
    element = command(texto)

    let user = '<div id="typing-container"><span>guest@peterpedro01:' + pwd.UfExec() + '$ </span><input type="text" id="CLIAtivo"> </div>';

    //adicionando a constante a resposta
    element += user;


    // concatenado o elemento novo e desativando o elemento antigo
    terminal.insertAdjacentHTML("afterend", element);
    terminal.className = "typing-container";
    terminal.removeAttribute("id");


    // recriando a função para ficar atualizada e focando no input novo
    document.getElementById('CLIAtivo').focus();
    document.getElementById('CLIAtivo').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitFunction();
        }
    });
}
