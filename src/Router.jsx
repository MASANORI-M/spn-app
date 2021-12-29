import React from 'react';
import { Route, Switch } from "react-router";

import {NoteDetail, NoteEdit, NotesList, Reset, SignIn, SignUp} from './templates';
import Auth from "./Auth";

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/signin/reset"} component={Reset} />

            <Auth>
                <Route exact path={"(/)?"} component={NotesList} />
                <Route exact path={"/note/:id"} component={NoteDetail} />
                <Route path={"/note/edit(/:id)?"} component={NoteEdit} />
            </Auth>
        </Switch>
    );
};

export default Router;