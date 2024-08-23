import { currentNode } from "../models/fileGraph.js";

export class cat {
    static exec(...args){
        if(args.length == 0){
            return '<p>Favor digitar o nome de um arquivo, veja o help do comando</p>';
        }

        if(args.length > 1){
            return '<p>cat aceita apenas um argumento, veja o help do comando</p>';
        }

        const fileName = args[0];
        
        if(!currentNode.childExist(fileName)){
            return '<p>Arquivo inexistente</p>';
        } 

        const file = currentNode.childs.get(fileName);

        if(typeof(file) == 'object'){
            return `<p>${fileName} é um diretório</p>`;
        } 

        return `${file}`;
    }

    static desc(){
        return 'comando para a leitura de arquivos';
    }

    static help(){
        return 'Use cat {nome do arquivo} lembre de colcar a extensão do arquivo junto, argumentos a mais ou a menos fazem o comando não funcionar'
    }
}
