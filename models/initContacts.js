exports.initContacts = function (){
    const ContactsRepository = require('./Repository.js');
    const Contact = require('./Contact');
    const contactsRepository = new ContactsRepository("bookmarks");
    contactsRepository.add(new Contact('Wikipedia','https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal','AlexBross','Research'));
}