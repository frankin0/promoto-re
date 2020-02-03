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
import Settings from './screens/User/Settings';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
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

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: { 
            main: grey[600]
        },
        secondary: { main: red[400] },
        textPrimary: '#39364f'
    },
    typography: {
        fontFamily: [
            "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif"
        ].join(",")
    }
});


 const RouteApp = (
    <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
            <HashRouter >
                <Switch>
                    <Route exact path="/" name="Home" component={Home} />
                    <Route path="/Event/:id" name="Event" component={Event} />
                    <Route path="/Settings" name="Settings" component={Settings} />
                    <Route path="/Settings/Notifics" name="Notifics" component={Settings} />
                    <Route path="/Settings/Privacy" name="Privacy" component={Settings} />
                    <Route path="/Settings/Devices" name="Devices" component={Settings} />
                    <Route path="/Settings/Protected" name="Protected" component={Settings} />
                    <Route path="/Settings/Promoto" name="Promoto" component={Settings} />
                    <Route path="/Settings/Partners" name="Partners" component={Settings} />
                    <Route path="/Settings/AddPartner" name="Add partener" component={Settings} />
                    <Route path="*" component={Home} />
                </Switch>
            </HashRouter>
        </SnackbarProvider>
    </ThemeProvider>
 );

 ReactDOM.render(RouteApp, document.getElementById('root'));