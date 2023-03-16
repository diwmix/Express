const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Інформація про мене <a href="/about">тут:<a/> ');
});
  
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});
  

app.use((req, res, next) => {
    const error = new Error('Не знайдено');
    error.status = 404;
    next(error);
});
  
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
      error: {
        status: error.status || 500,
        message: error.message,
      },
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});
  
  