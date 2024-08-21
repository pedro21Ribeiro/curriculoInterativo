var input;
var dir = '/home/';

import "./models/commands"
import { command } from "./models/commands";

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
    element = resposta(texto);
    element = command(texto)

    let user = '<div id="typing-container"><span>guest@peterpedro01:~' + dir + '$ </span><input type="text" id="CLIAtivo"> </div>';

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

//função de resposta
function resposta(comando){
    var answer;
    
    cpFlags = comando.split(/\s+/);

    switch (cpFlags[0]){
        case 'help':
            if(cpFlags.length > 1){
                answer = '<p> help não aceita argumentos adicionais</p>'
                break;
            }
            answer = '<p>help: mostra essa lista de comandos<br>'+
                     'ls: lista os arquivos e diretorios no diretorio atual<br>'+
                     'cd: muda de diretorio (cd .. volta um nivel)<br>'+
                     'cat: lê um arquivo de texto<br>'+
                     'clear: limpa o terminal (recarrega a pagina)</p>';
            break;
        case 'ls':
            if(cpFlags.length > 1){
                answer = '<p> ls não aceita argumentos adicionais</p>'
                break;
            }
            answer = '<p>' + files() + '</p>';
            break;
        case 'clear':
            if(cpFlags.length > 1){
                answer = '<p> clear não aceita argumentos adicionais</p>'
                break;
            }
            location.reload();
            break;
        case 'cd':
            if(cpFlags.length > 2){
                answer = '<p> cd só aceita um argumento</p>'
                break;
            }else if(cpFlags.length < 2){
                answer = '<p> cd precisa de um diretorio</p>'
                break;
            }
            answer = '<p>' + cd(cpFlags[1]) + '</p>'
            break;
        case 'cat':
            if(cpFlags.length > 2){
                answer = '<p> cat só aceita um argumento</p>'
                break;
            }else if(cpFlags.length < 2){
                answer = '<p> cat precisa de um arquivo</p>'
                break;
            }
            
            answer = '<p>' + cat(cpFlags[1]) + '</p>'
            break;
        default:
            answer = '<p>Comando não reconhecido digite ´help´ para lista de comandos</p>';
            break;
    }

    return answer;
}

function files(){
    var fileList;
    var retorno;
    switch(dir){
        case '/home/':
            fileList =  ['cursos',
                        'empregosAnteriores',
                        'projetos',
                        'misc',
                        'formacaoAcademica.txt',
                        'minhaHistória.txt',
                        'teste.txt'];
            break;
        case '/home/cursos/':
            fileList = ['burpSuite.txt','..'];
            break;

        case '/home/empregosAnteriores/':
            fileList = ['..'];
            break;

        case '/home/projetos/':
            fileList = ['..'];
            break;

        case '/home/misc/':
            fileList = ['..'];
            break;
        case '/':
            fileList = ['home', 'easterEgg.txt'];
            break;
        default:
            retorno = 'De algum modo você chegou a um diretorio inexistente, parabéns!';
            return retorno;
    }
    
    retorno = fileList.join('<br>');
    return retorno;
}

function cd(directorie){
    cdReturn = " "
    var listOfDirs;

    switch (dir){
        case '/home/':
            listOfDirs = ['cursos', 'empregosAnteriores', 'projetos', 'misc', '..'];
        break;

        case '/home/cursos/':
            listOfDirs = ['..'];
            break;

        case '/home/empregosAnteriores/':
            listOfDirs = ['..'];
            break;

        case '/home/projetos/':
            listOfDirs = ['..'];
            break;

        case '/home/misc/':
            listOfDirs = ['..'];
            break;
        case '/':
            listOfDirs = ['home'];
            break;
        default:
            cdReturn = 'De algum modo você chegou a um diretorio inexistente, parabéns!';
            return cdReturn;
    }

    //lógica para subir e trocar de diretorios
    if(listOfDirs.includes(directorie)){
        if(directorie != '..'){
            dir += directorie + '/';
        }else{
            var dirl = dir.split('/');

            dirl.splice(-2);
 
            if(dirl.length > 0){
                dir = dirl.join('/') + '/';
            }else{
                dir = "/";
            }
            
        }
    }else{
        cdReturn = 'Caminho não encontrado';
    }

    return cdReturn;
}

function cat(file){
    var answer;
    var check = file.split('.');
    console.log(check);
    if(check.length < 2){
        answer = "Argumento deve ser um arquivo!";
        return answer;
    }

    var fileList = files().split('<br>');

    if(fileList.includes(file)){
        answer = arquivo[file];
    }else{
        answer = "Arquivo inexistente!";
    }

    return answer;
}

const arquivo = {
    "burpSuite.txt": 'Burpe Suite é uma ferramenta que é usada para testes de aplicações web em geral, realizando desde a etpada de recon<br>'+
                     'até a etapa de ataque em si'+
                     'Aqui a baixo algumas coisas que Burp Suite faz'+
                     '<ul><li>Captura e edições de Pacotes</li><li>Repetição de dos pacotes com pequenas alterações</li><li>Analise detalhada dos pacotes</li></ul>'+
                     '<p>Fora essas coisas contém diversos ferramentas incluidas para deixar o processo de testes o mais compacto o possivel, como<br>'+
                     'codificadores e decodificadores embutidos, analisador de segurança de token entre outros, é uma das ferramentas mais versaties do mercado </p>>',
}
