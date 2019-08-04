import db from './dexie-setup';
import { createNewContact } from './api-handlers';

export class ListHandler {
  constructor(element) {
    this.el = element;
    this.contacts = [];

    this.updateData = this.updateData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.updateData();
  }

  updateData() {
    db.contacts.toArray()
      .then((contacts) => {
        this.contacts = contacts;
        this.sortContacts();
        this.render();
      });
    }
    
  addContact(newContact) {
    createNewContact(newContact)
      .then(() => {
        this.contacts.push(newContact);
        this.render();
      });
  }

  sortContacts() {
    this.contacts = this.contacts.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const newContact = [...event.target.elements]
      .filter(element => !!element.name)
      .reduce((data, element) => {
        data[element.name] = element.value;
        return data;
      }, {});
    if (!Object.values(newContact).some(val => val !== '')) {
      // Don't save a contact if all values are empty
      return;
    }
    newContact.id = Date.now();
    this.addContact(newContact);
  }

  render() {
    this.el.innerHTML = this.contacts.map((contact) => {
      return `<li class="contact-list__contact">
        <h2 class="contact-list__name">${contact.name}</h2>
        <p class="contact-list__detail">${contact.email} - ${contact.phone}</p>
      </li>`;
    }).join('');
  }
}