/**
 * @operator Francesco Esposito
 * @company espoweb.it 
 * @date 10/2019
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { setDefaultTranslations, setDefaultLanguage } from 'react-multi-lang'
import it from './translations/it.json';
import './assets/css/style.css';
import './assets/css/icofont.min.css';
import Home from './screens/Home/Home.js';
import Event from './screens/Event/Event.js';


setDefaultTranslations({it})
setDefaultLanguage('it')
/*
const cookies = new Cookies();

if(cookies.get('lang') === null || cookies.get('lang') === undefined){
    cookies.set('lang', getLanguage(), { path: '/' });
}else{
    if(cookies.get('lang') === 'it' || cookies.get('lang') === 'en' || cookies.get('lang') === 'sv'){
        setLanguage(cookies.get('lang'));
    }else{
        cookies.set('lang', getLanguage(), { path: '/' });
    }
} */


console.log("%cPromoto version 1.1.55", "color: #fefefe; font-size: 1.3rem;");

/**
 * Set Application Routing
 */

 const RouteApp = (
    <HashRouter>
        <Switch>
            <Route exact path="/" name="Home" component={Home} />
            <Route path="/Event/:id" name="Event" component={Event} />
            <Route path="*" component={Home} />
        </Switch>
    </HashRouter>
 );

 ReactDOM.render(RouteApp, document.getElementById('root'));