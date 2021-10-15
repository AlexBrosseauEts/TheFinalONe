module.exports = 
class Contact{
    constructor(name, url, usager,category)
    {
        this.Id = 0;
        this.Name = name !== undefined ? name : "";
        this.Url = undefined ? url : "";
        this.Usager = undefined ? usager : "";
        this.Category= undefined ? category: "";
    }
}