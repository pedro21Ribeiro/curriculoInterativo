import "../models/fileGraph"

export function pwd(...args) {
    if(length(args) > 0 ){
        return '<p>O comando pwd não aceita argumentos</p>'
    }
   
    //Chama a função existetne na classe nodeDir
    return `<p>${currentNode.printPath()}</p>`;
}
