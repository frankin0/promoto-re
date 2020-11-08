/**
 * @operator Francesco Esposito
 * @company espoweb.it 
 * @date 10/2019
 */

import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { setDefaultLanguage, setDefaultTranslations } from 'react-multi-lang';
//import { HashRouter, Route, Switch } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
//import { BrowserRouter, Route } from 'react-router-dom';
import './assets/css/icofont.min.css';
import './assets/css/style.css';
import Event from './screens/Event/Event.js';
import Home from './screens/Home/Home.js';
import it from './translations/it.json';
import Settings from './screens/User/Settings';
import Notifics from './screens/User/Notifics';
import Devices from './screens/User/Devices';
import Protected from './screens/User/Protected';
import Partners from './screens/User/Partners';
import AddPartner from './screens/User/AddPartner';
import Security from './screens/User/Security';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import User from './services/User/User';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute'; 
import { lightBlue, grey, red } from '@material-ui/core/colors';

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


console.log("%cPromoto version 1.2.9", "color: #fefefe; font-size: 1.3rem;");


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

function App(){

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(() => createMuiTheme({
        palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            primary: { 
                main: grey[600],
            },
            secondary: { 
                main: lightBlue[200] ,
            },
        },
        typography: {
            fontFamily: [
                "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif"
            ].join(",")
        }
    }),[prefersDarkMode],);

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <Router >
                    <Switch>
                        <PublicRoute restricted={false} component={Home} path="/" exact />
                        <PublicRoute restricted={false} component={Event} path="/Event/:id" theme={prefersDarkMode} />
                        <PrivateRoute exact path="/Settings" name="Settings" component={Settings} />
                        <PrivateRoute exact path="/Settings/Notifics" name="Notifics" component={Notifics} />
                        <PrivateRoute exact path="/Settings/Security" name="Security" component={Security} />
                        <PrivateRoute exact path="/Settings/Privacy" name="Privacy" component={Settings} />
                        <PrivateRoute exact path="/Settings/Devices" name="Devices" component={Devices} />
                        <PrivateRoute exact path="/Settings/Paycard" name="Protected" component={Protected} />
                        <PrivateRoute exact path="/Settings/Partners" name="Partners" component={Partners} />
                        <PrivateRoute exact path="/Settings/Partners/Add" name="Add Partner" component={AddPartner} />
                        <PublicRoute restricted={false} path="*" component={Home} />
                    </Switch>
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

 const RouteApp = (
    <App />
 );

 ReactDOM.render(RouteApp, document.getElementById('root'));