import "../commands/pwd"
import { pwd } from "../commands/pwd";

const FnMap = new Map()

export function command (texto) {
    //Lista de Argumentos recebidos
    let cpFlags = new Array();
    cpFlags = texto.split(/\s+/);
    let action = cpFlags.shift();
    
    //Procurando o commando através de um map
    const commandFn = FnMap.get(action);
    if (commandFn) {
        //passando os argumentos restantes
        return commandFn(...cpFlags);
    }else {
        return '<p>Comando não reconhecido digite ´help´ para lista de comandos</p>'
    }
}

//-------Lista de Commandos--------
FnMap.set("pwd", pwd)
