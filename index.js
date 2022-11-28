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

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsDb.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await contactsDb.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsDb.addContact(name, email, phone);
      console.log(newContact);
      break;
    
    case "remove":
      const deletedContact = await contactsDb.removeContact(id);
      console.log(deletedContact);
      break;
    
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// async function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case "list":
//       const allContacts = await contactsDb.listContacts();
//       console.table(allContacts)
//       break;

//     case "get":
//       await contactsDb.getContactById(id);
//       break;

//     case "add":
//       await contactsDb.addContact(name, email, phone);
//       break;
    
//     case "remove":
//       await contactsDb.removeContact(id);
//       break;
    
//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

// program
//   .command("list").action(async () => {
//     invokeAction({ action: "list"});
//   });

//   program.command("get <id>").action(async (options) => {
//   const id = options;
//   invokeAction({ action: "get", id });
// });

// program.command("add <name...>").action(async (options) => {
//   console.log(options);

//   invokeAction({ action: "add", name: options});
// });

// program.command("remove <id>").action(async (options) => {
//   const id = options;
//   invokeAction({ action: "remove", id });
// });

// program.parse();
