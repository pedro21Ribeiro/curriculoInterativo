import { currentNode } from "../models/fileGraph.js";

export class pwd {

    static exec(...args) {
        if(args.length > 0 ){
            return '<p>O comando pwd não aceita argumentos</p>'
        }

        let path = currentNode.printPath();
        //verificando se esta no root, já que o root não tem nome
        if(path === "") {
            path = "/";
        }
        //Chama a função existetne na classe nodeDir
        return `<p>${path}</p>`;
    }

    static help() {
        return 'Imprime o caminho do diretorio atual'
    }

    static desc() {
        return 'Imprime no terminal o diretorio atual (Print Working Directory)'
    }

    //Exec sem formatação para o printPath
    static UfExec() {
        let path = "";
        path = currentNode.printPath();
        if( path.startsWith("/home") ) {
            path = path.replace("/home", "~");
        }else {
            path = "/".concat(path);
        }

        return path;
    }

}
