import { currentNode } from "../models/fileGraph.js"

export class ls {
    static exec(...args){
        let showHidden = false;
        if(args.length > 1){
            return '<p>ls no momento não aceita apenas um argumento, veja o help</p>'
        }else if(args[0] != undefined){
            if(args[0] === '-la'){
                showHidden = true
            }else{
                return '<p>argumento não reconhecido, veja o help</p>'
            }
        }

        const fileList = currentNode.getChilds();

        let returnElement = "<ul>"
        fileList.forEach(file => {
            if(!file.startsWith(".") || showHidden) {
                returnElement = returnElement.concat(`<li>${file}</li>`)
            } 
        });
        returnElement = returnElement.concat("</ul>");

        return returnElement;
    }

    static desc(){
        return 'comando para listar arquivos do diretorio';
    }

    static help(){
        return 'ls lista os arquivos do diretório, use `ls` para mostrar os arquivos e `ls -la` para mostrar todos os arquivos';
    }
}
