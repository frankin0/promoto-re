/**
 * @operator Francesco Esposito
 * @company espoweb.it 
 * @date 10/2019
 */

import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { setDefaultLanguage, setDefaultTranslations } from 'react-multi-lang';
import { HashRouter, Route, Switch } from 'react-router-dom';
//import { BrowserRouter, Route } from 'react-router-dom';
import './assets/css/icofont.min.css';
import './assets/css/style.css';
import Event from './screens/Event/Event.js';
import Home from './screens/Home/Home.js';
import it from './translations/it.json';

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


console.log("%cPromoto version 1.1.77", "color: #fefefe; font-size: 1.3rem;");

/**
 * Set Application Routing
 */
/*
const RouteApp = (
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" name="Home" component={Home} />
            <Route path="/Event/:id" name="Event" component={Event} />
            <Route path="*" component={Home} />
        </React.Fragment>
    </BrowserRouter>
)*/


 const RouteApp = (
    <SnackbarProvider maxSnack={3}>
        <HashRouter >
            <Switch>
                <Route exact path="/" name="Home" component={Home} />
                <Route path="/Event/:id" name="Event" component={Event} />
                <Route path="*" component={Home} />
            </Switch>
        </HashRouter>
    </SnackbarProvider>
 );

 ReactDOM.render(RouteApp, document.getElementById('root'));