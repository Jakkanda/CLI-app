const contactsDb = require('./contacts');
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

console.log(argv)

async function invokeAction({ action, contactId, name, email, phone }) {
  switch (action) {
    case "list":
      await contactsDb.listContacts();
      break;

    case "get":
      await contactsDb.getContactById(contactId);
      break;

    case "add":
      await contactsDb.addContact(name, email, phone);
      break;
    
    case "remove":
      await contactsDb.removeContact(contactId);
      break;
    
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
