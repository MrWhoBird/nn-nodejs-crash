import express from 'express';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.listen(3000); 

app.get('/', (req, res) => {
    //res.send('<p>Home Page</p>')
    res.sendFile("index.html", { root: path.join(__dirname, "views")});
});

app.get('/about', (req, res) => {
    //res.send('<p>About Page</p>')
    res.sendFile('./views/about.html', {root: __dirname})
});

app.get('/about-me', (req, res) => {
    res.redirect('/about')
});

//only if request reaches this point of code
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});