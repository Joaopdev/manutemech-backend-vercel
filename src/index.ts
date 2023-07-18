import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import maintenanceRouter from './routers/MaintenanceRouter';
import maintenancePartRouter from './routers/MaintenancePartRouter';
import partRouter from './routers/PartRouter';
import workshopRouter from './routers/WorkshopRouter';
import categoryRouter from './routers/CategoryRouter';
import serviceRouter from './routers/ServiceRouter';
import supplierRouter from './routers/SupplierRouter';
import vehicleRouter from './routers/VehicleRouter';
import userRouter from './routers/UserRouter';

import * as dotenv from 'dotenv'
import loginRouter from './routers/LoginRouter';
const MobileDetect = require('mobile-detect');

dotenv.config()

console.log(process.env.NODE_ENV);

const cookieParser = require('cookie-parser');

const express = require('express');
const userAgent = require('express-useragent');

// Crie uma instância do aplicativo Express

const app = Express();
// Adicione o middleware para analisar o user agent do cliente
app.use(userAgent.express());

// Defina uma rota para a página inicial
app.get('/', (req, res) => {
  const userAgent = req.headers['user-agent'];
  const md = new MobileDetect(userAgent);
  const isMobile = md.mobile() !== null || md.tablet() !== null;

  if (isMobile) {
    return res.status(403).send('Esta aplicação não é suportada em dispositivos móveis.');
  }

});


const port = 4000; // Escolha a porta que deseja usar para o servidor


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://manutemech-app.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

})


app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'same-origin');
  next();
});

// Middleware para análise do corpo das requisições
app.use(bodyParser.json());

//Moddleware de cookie seguro
app.use(cookieParser());

// Roteadores
app.use(loginRouter);
app.use(categoryRouter);
app.use(maintenancePartRouter);
app.use(maintenanceRouter);
app.use(partRouter);
app.use(serviceRouter);
app.use(supplierRouter);
app.use(vehicleRouter);
app.use(workshopRouter);
app.use(userRouter);

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Olá!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
