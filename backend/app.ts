import express from 'express';
const app = express();

import horaireRouter from './routes/schedule/schedule.router';
import userRouter from './routes/user/user.router';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));

// main();
// async function main(){
//   console.log('test');
// }


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});
app.use('/user', userRouter);
app.use('/horaires', horaireRouter);


export default app;