const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://AlanGarcia:Reytatumi10@cluster0.z6ltn2e.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));



