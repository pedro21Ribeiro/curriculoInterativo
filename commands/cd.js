import { currentNode, setCurrentNode } from "../models/fileGraph.js";

export class cd {
    static exec(...args){
        if(args.length == 0){
            return '<p>Argumentos insuficientes, é nescessário um, veja o help</p>';
        }else if(args.length > 1){
            return '<p>Argumentos em excesso use apenas um, veja o help</p>';
        }

        const dirName = args[0];
        if(!currentNode.childExist(dirName)){
            return '<p>diretório inexsitente</p>';
        }
    
        let node = currentNode.childs.get(dirName);
        if(typeof(node)!= 'object'){
            return `<p>${dirName} não é um diretorio</p>`;
        }

        setCurrentNode(node);

        return '<br>';
    }

    static desc(){
        return 'Comando para navegar entre os diretorios do sistema';
    }

    static help(){
        return 'O uso do cd é o seguint `cd {diretorio}` aceita apenas um argumento; Use .. para subir no nivel dos diretorios';
    }
}

