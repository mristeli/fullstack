const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-b543j.mongodb.net/phonebook-app?retryWrites=true&w=majority`  

mongoose.connect(url, { useNewUrlParser: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date
})

const Contact = mongoose.model('Contact', contactSchema)

if(process.argv < 5) {
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
} else {
  const [name, number] = [process.argv[3], process.argv[4]]
  console.log('Luodaan nimi', name, 'ja numero', number);
  
  const contact = new Note({
    name: name,
    number: number,
    date: new Date(),
  })
  contact.save().then(response => {
    console.log('Contact saved!');
    console.log(response)
    mongoose.connection.close();
  })  
}