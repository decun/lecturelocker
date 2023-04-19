const Koa = require('koa');
const Router = require('koa-router');
const { google } = require('googleapis');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const youtube = google.youtube({
  version: 'v3',
  auth: apiKey
});

const app = new Koa();
const router = new Router();



router.get('/embed/:idVideo', async (ctx) => {
  const idVideo = ctx.params.idVideo;
  const response = await youtube.videos.list({
    id: idVideo,
    part: 'player'
  });
  const embed = response.data.items[0].player.embedHtml;
  ctx.body = embed;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // Leer el archivo index.html
  fs.readFile('index.html', (err, data) => {
    if (err) {
      // Si hay un error al leer el archivo, mostrar un mensaje de error
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.write('<h1>Error al leer el archivo index.html</h1>');
      return res.end();
    }

    // Si no hay errores, mostrar el archivo index.html en el navegador
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
});