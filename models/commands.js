import "../commands/pwd.js";
import { pwd } from "../commands/pwd.js";
import { cat } from "../commands/cat.js";
import { ls } from "../commands/ls.js";
import { cd } from "../commands/cd.js";

const FnMap = new Map();


//Função para rodar os comandos
export function command (texto) {
    //Lista de Argumentos recebidos
    let cpFlags = new Array();
    cpFlags = texto.split(/\s+/);
    let action = cpFlags.shift();
    
    //Procurando o commando através de um map
    const commandFn = FnMap.get(action);
    if (commandFn) {
        //passando os argumentos restantes
        return commandFn.exec(...cpFlags);
    }else {
        return '<p>Comando não reconhecido digite ´help´ para lista de comandos</p>';
    }
}

//Função de help
class help {
    static exec(...args) {
        if(args.length == 0){
            let returnElement = '<span>Ações Possíveis:</span><ul>';
            for(const key of FnMap.keys()) { 
                const fnValue = FnMap.get(key);
                returnElement = returnElement.concat(`<li>${key} - ${fnValue.desc()}</li>`);
            } 
            returnElement = returnElement.concat('</ul>');
            return returnElement;
        }

        const commando = args[0];
        
        if(!FnMap.has(commando)){
            return '<p>Comando não encontrado</p>'
        }

        const fnClass = FnMap.get(commando);

        return `<p>${fnClass.help()}</p>`
    }

    static help() {
        return 'Use help para mostrar a lista de comando e help {comando} para saber mais sobre um comando especifico';
    }

    static desc() {
        return 'Comando de ajuda';
    }
}



//-------Lista de Commandos--------
FnMap.set("pwd", pwd);
FnMap.set("help", help);
FnMap.set("cat", cat);
FnMap.set("ls", ls);
FnMap.set("cd", cd);
