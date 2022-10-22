import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';
//SISTEMA
import Dashboard from '../_container/dashboard';
import Error404 from '../_container/Error404Container';

class PageRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    {/*  PAGES  */}
                    <Route exact path="/" render={(props) => <Dashboard {...props} />} />
                    {/*  ERROR 404 */}
                    <Route render={(props) => <Error404 {...props} />} />
                    <Route exact path="/Error404" render={(props) => <Error404 {...props} />} />
                </Switch>
            </Router >
        )
    };
};

export default PageRouter;
