'use strict'

require('pug')
const express = require('express')
const path = require('path')
const lessMiddleware = require('less-middleware')

const app = express()
const appBaseUrl ='react-workshop'

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');

webpackConfig.devtool = '#eval';
webpackConfig.output = {
   path: '/',
   filename: `/${appBaseUrl}/scripts/bundle.js`,
   libraryTarget: 'umd'
};
webpackConfig.plugins = [
        new webpack.DefinePlugin({
          APP_BASE_URL: JSON.stringify(`/${appBaseUrl}/`),
          __DEV__: true
        }),
    ];

app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.set('view engine', 'pug')
app.use(`/${appBaseUrl}/styles`,lessMiddleware(path.join(__dirname, '/public/styles') ))
app.use(`/${appBaseUrl}/styles`, express.static(path.join(__dirname, '/public/styles')))
app.use(`/${appBaseUrl}/scripts`, express.static(path.join(__dirname, '/public/scripts')))

app.get(`/${appBaseUrl}/`, (req,res)=>{
  res.render('page',{
    stylesheets:[`/${appBaseUrl}/styles/main.css`],
    bootstrapUrl:`/${appBaseUrl}/scripts/bundle.js`
    
  })
})

app.listen(3005, ()=>{
    console.log("App running on port 3005")
})
