
require('babel-register');
 
const router = require('./components/router').default;
const Sitemap = require('../').default;
 
(
    new Sitemap(router)
        .build('http://stephenrawls.com')
        .save('./sitemap.xml')
);