/**
 * Created by joshuahill on 12.05.2017.
 */
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('HTML'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/audio', express.static('audio'));
app.use('/images', express.static('images'));

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});