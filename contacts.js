const fs = require('fs/promises');
const path = require('path');
const {nanoid } = require('nanoid');

const contactsPath = path.join('./db/contacts.json');

// TODO: задокументировать каждую функцию
async function listContacts() {
  const contactsRaw = await fs.readFile(contactsPath);
  const dbContacts = JSON.parse(contactsRaw);
  return dbContacts;
};

async function getContactById(id) {
  const db = await listContacts();
  const contact = db.find((person) => person.id === id);
  if (!contact) {
    return null;
  }
  return contact;
};

async function removeContact(id) {
  let db = await listContacts();
  const contact = db.find((person) => person.id === id);
  if (!contact) {
    return null;
  }
  const contacts = db.filter((person) => person.id !== id);
  db = contacts;
  await fs.writeFile(contactsPath, JSON.stringify(db));

  return contact;
};

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };
  const db = await listContacts();
  db.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(db));

  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};