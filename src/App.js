import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch, BrowserRouter, Redirect, Router } from 'react-router-dom';
import Home from "./components/Home";
import Error from "./components/Error";
import Portal from "./components/Portal";
import Selected from "./components/Selected";
import Transfer from "./components/Transfer";
import Pricing from "./components/Pricing";
import './App.css';
import History from "./components/History";
import Faqs from "./components/Faqs";
import Campaign from "./components/Campaign";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from './_helpers';

function App() {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Route render={(props) => (
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>

                            <Route path="/error">
                                <Error />
                            </Route>

                            <Route path="/portal">
                                <Portal />
                            </Route>

                            <Route path="/campaign">
                                <Campaign />
                            </Route>
                            <Route path="/selected">
                                <Selected />
                            </Route>
                            <Route path="/transfer">
                                <Transfer />
                            </Route>
                            <Route path="/history">
                                <History />
                            </Route>
                            <Route path="/faqs">
                                <Faqs />
                            </Route>
                            <Route path="/price">
                                <Pricing />
                            </Route>
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                )} />
            </BrowserRouter>
        </>
    );
}

export default App;
