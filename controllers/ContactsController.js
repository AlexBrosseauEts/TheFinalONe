const Repository = require('../models/Repository');
const Routeur = require('../router.js');

module.exports = 
class ContactsController extends require('./Controller') {
    constructor(req, res){
        super(req, res);
        this.contactsRepository = new Repository('bookmarks');
    }
    getAll(){
        this.response.JSON(this.contactsRepository.getAll());
    }
    get(id){
        let params;
        let allParams=this.getQueryStringParams();
        console.log(allParams);
        if(allParams==null)
        {
            this.response.JSON(this.contactsRepository.getAll());
        }
        if('sort' in allParams)
        {
            let asc=1;
            console.log(allParams.sort);
            if(allParams.sort=='name,desc')
            {
                asc=-asc;
                allParams.sort=allParams.sort.replace(',desc','');
            }
            if(allParams.sort=='categpry,desc')
            {
                asc=-asc;
                allParams.sort=allParams.sort.replace(',desc','');
            }
            if(allParams.sort=='name')
            {
                this.response.JSON(this.contactsRepository.getAllSortByName(asc));
            }
            else if(allParams.sort=='category')
            {
                this.response.JSON(this.contactsRepository.getAllSortByCategory(asc));
            }
        }
        else if('id' in allParams)
        {
            console.log(Routeur.id);
            this.response.JSON(parseInt(id));
        }
        else if('name' in allParams)
        {
            if(allParams.name.includes("*"))
            {
                this.response.JSON(this.contactsRepository.getByNames(allParams.name.replace('*','')));
            }
            else
            {
                this.response.JSON(this.contactsRepository.getByName(allParams.name));
            }
            
        }
        else if('category' in allParams)
        {
            this.response.JSON(this.contactsRepository.getByCategory(allParams.category));
        }
        
    }
    post(contact){  
        // todo : validate contact before insertion
        // todo : avoid duplicates
        let newContact = this.contactsRepository.add(contact);
        if (newContact)
            this.response.add(JSON.stringify(newContact));
        else
            this.response.internalError();
    }
    put(contact){
        // todo : validate contact before updating
        if (this.contactsRepository.update(contact))
            this.response.ok();
        else 
            this.response.notFound();
    }
    remove(id){
        console.log("Not in it")
        if (this.contactsRepository.remove(id))
            this.response.accepted();
        else
            this.response.notFound();
    }
}