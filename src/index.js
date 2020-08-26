import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {UserContextProvider} from "./contexts/user.status.context";
import {Login} from "./views/login.view";
import {ProtectedRoute} from "./privateRoutes/PrivateRoutes";
import {AppView} from "./views/app.view";

ReactDOM.render(
    <BrowserRouter>
        <UserContextProvider>
            <ProtectedRoute
                path="/"
                exact={true}
                component= {Login}
            />
            <ProtectedRoute
                path="/app"
                exact={true}
                component={AppView}
            />
        </UserContextProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
