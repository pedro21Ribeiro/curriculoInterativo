export var currentNode;

class NodeDir {
    name;
    parent;
    childs = new Map(); 

    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
    }

    
    createDir(name){
        this.childs.set(name, new NodeDir(name, this));
        return this.childs.get(name);
    }

    createFile(name, obj){
        this.childs.set(name, obj);
    }

    printPath(){
        if (this.parent != null) {
            return this.parent.printPath() + "/" + this.name;
        }else{
            return this.name;
        }
    }

    getChilds(){
        let possibilites = new Array();
        this.childs.forEach((_ , key) => {
            possibilites.push(key); 
        });

        return possibilites;
    }

    childExist(name) {
        return this.childs.has(name);
    }
}

export function init(){
    const root = new NodeDir("", null);
    currentNode = root;
    fetch('../files.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            translateObjToNodes(data);
        }).then( () => {
            currentNode = root.childs.get("home");
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function translateObjToNodes(object) {
    for (let key in object) {
        if(/.(?:\.)/.test(key)){
            currentNode.createFile(key, object[key]);
        }else {
            currentNode = currentNode.createDir(key);
            translateObjToNodes(object[key]);
        }
    }

    if (currentNode.parent != null) {
        currentNode = currentNode.parent;
    }
}

