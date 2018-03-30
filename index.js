const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);



////https://immense-sands-46050.herokuapp.com/ | https://git.heroku.com/immense-sands-46050.git