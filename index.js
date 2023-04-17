const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

router.get('/api/hola', ctx => {
  ctx.body = 'Hola, mundo!';
});

router.post('/api/saludo', ctx => {
  const { nombre } = ctx.request.body;
  ctx.body = `Hola, ${nombre}!`;
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
