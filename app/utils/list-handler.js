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
        this.render();
      });
    }
    
  addContact(newContact) {
    createNewContact(newContact)
      .then(() => {
        this.contacts.push(newContact)
        this.render();
      });
  }

  onSubmit(event) {
    event.preventDefault();
    const newContact = [...event.target.elements]
      .filter(element => !!element.name)
      .reduce((data, element) => {
        data[element.name] = element.value;
        return data;
      }, {
        id: Date.now(),
      });
    this.addContact(newContact);
  }

  render() {
    this.el.innerHTML = this.contacts.map((contact) => {
      return `<li>
        <strong>${contact.name}</strong> - ${contact.email}
      </li>`;
    }).join('') + `
      <li>
        <form>
          <label for="name">Name</label><input id="name" name="name" />
          <label for="email">email</label><input type="email" id="email" name="email" />
          <label for="phone">phone</label><input type="tel id="phone" name="phone" />
          <button type="submit">Add</button>
        </form>
      </li>
    `;
    this.el.querySelector('form').addEventListener('submit', this.onSubmit);
  }
}