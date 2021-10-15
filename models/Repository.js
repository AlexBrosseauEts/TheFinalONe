const fs = require('fs');
///////////////////////////////////////////////////////////////////////////
// This class provide CRUD operations on JSON objects collection text file 
// with the assumption that each object have an Id member.
// If the objectsFile does not exist it will be created on demand.
// Warning: no type and data validation is provided
///////////////////////////////////////////////////////////////////////////
module.exports = 
class Repository {
    constructor(objectsName) {
        this.objectsList = [];
        this.objectsFile = `./data/${objectsName}.json`;
        this.read();
    }
    read() {
        try{
            // Here we use the synchronus version readFile in order  
            // to avoid concurrency problems
            let rawdata = fs.readFileSync(this.objectsFile);
            // we assume here that the json data is formatted correctly
            this.objectsList = JSON.parse(rawdata);
        } catch(error) {
            if (error.code === 'ENOENT') {
                // file does not exist, it will be created on demand
                this.objectsList = [];
            }
        }
    }
    write() {
        // Here we use the synchronus version writeFile in order
        // to avoid concurrency problems  
        fs.writeFileSync(this.objectsFile, JSON.stringify(this.objectsList));
        this.read();
    }
    nextId() {
        let maxId = 0;
        for(let object of this.objectsList){
            if (object.Id > maxId) {
                maxId = object.Id;
            }
        }
        return maxId + 1;
    }
    add(object) {
        try {
            object.Id = this.nextId();
            this.objectsList.push(object);
            this.write();
            return object;
        } catch(error) {
            return null;
        }
    }
    getAll() {
        return this.objectsList;
    }
    getAllSortByName(asc)
    {
        return this.objectsList.sort((a,b) =>{
            let fa = a.Name.toLowerCase(),
                fb = b.Name.toLowerCase();
            if(fa<fb)
            {
                return -asc;
            }
            if(fa>fb){
                return asc;
            }
            return 0;
        });
    }
    getAllSortByCategory(asc)
    {
        return this.objectsList.sort((a,b) =>{
            let fa = a.Category.toLowerCase(),
                fb = b.Category.toLowerCase();
            if(fa<fb)
            {
                return -asc;
            }
            if(fa>fb){
                return asc;
            }
            return 0;
        });
    }
    get(id){
        for(let object of this.objectsList){
            if (object.Id === id) {
               return object;
            }
        }
        return null;
    }
    getByName(name){
        for(let object of this.objectsList){
            if (object.Name === name) {
               return object;
            }
        }
        return null;
    }
    getByNames(name){
        let array=[];
        for(let object of this.objectsList){
            if (object.Name.includes(name)) {
               array.push(object);
            }
        }
        return array;
    }
    getByCategory(category){
        let array=[];
        for(let object of this.objectsList){
            if (object.Category === category) {
               array.push(object);
            }
        }
        return array;
    }
    remove(id) {
        console.log("In it");
        let index = 0;
        for(let object of this.objectsList){
            if (parseInt(object.Id) === parseInt(id)) {
                this.objectsList.splice(index,1);
                this.write();
                return true;
            }
            index ++;
        }
        return false;
    }
    update(objectToModify) {
        let index = 0;
        console.log(objectToModify.Id);
        for(let object of this.objectsList){
            if (parseInt(object.Id) === parseInt(objectToModify.Id)) {
                this.objectsList[index] = objectToModify;
                this.write();
                console.log("true");
                return true;
            }
            index ++;
        }
        console.log("false");
        return false;
    }
}