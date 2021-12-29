import React from 'react';
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase";
import { push } from "connected-react-router";

import { getUserId } from "../../reducks/users/selectors";

const HeaderMenu = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);

    return (
        <>
            <IconButton >
                <MenuIcon onClick={(event) => props.handleDrawerToggle(event)} />
            </IconButton>
        </>
    );
};

export default HeaderMenu;