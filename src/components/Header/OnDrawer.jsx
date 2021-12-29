import React, { useCallback, useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { db } from "../../firebase";

import { TextInput } from "../Uiparts/index";
import {signOut} from "../../reducks/users/operation";

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 256,
            flexShrink: 0,
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: 256
    },
    searchField: {
        alignItems: 'center',
        display: 'flex',
        marginLeft: 32
    }
}));

const OnDrawer = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {container} = props;
    
    const [keyword, setKeyword] = useState("");

    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value);
    }, [setKeyword]);

    const selectMenu = (event, path) => {
        dispatch(push(path));
        props.onClose(event);
    };

    const menus = [
        {func: selectMenu, label: "新規Note登録", icon:<AddCircleIcon />, id: "register", value: "/note/edit"},
        {func: selectMenu, label: "プロフィール", icon:<PersonIcon />, id: "profile", value: "/user/mypage"},
    ];

    const [filters, setFilters] = useState([
        {func: selectMenu, id: "all", label: "すべて", value: "/"},
        {func: selectMenu, id: "IHEH", label:"重要度:高 & 緊急度:高", value: "/?important=IHEH"},
        {func: selectMenu, id: "IHEL", label:"重要度:高 & 緊急度:低", value: "/?important=IHEL"},
        {func: selectMenu, id: "ILEH", label:"重要度:低 & 緊急度:高", value: "/?important=ILEH"},
        {func: selectMenu, id: "ILEL", label:"重要度:低 & 緊急度:低", value: "/?important=ILEL"},
    ]);
    
    useEffect(() => {
        db.collection('categories').orderBy('order', 'asc').get()
            .then(snapshots => {
                const list = [];
                snapshots.forEach(snapshot => {
                    const category = snapshot.data();
                    list.push(
                        {func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}`}
                    );
                });
                setFilters(prevState => [...prevState, ...list]);
            });
    }, []);

    return (
        <nav className={classes.drawer}>
            <Drawer
                container={container} variant="temporary" anchor="right" open={props.open}
                onClose={(e) => props.onClose(e)} classes={{paper:classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <div
                    onClose={(e) => props.onClose(e)}
                    onKeyDown={(e) => props.onClose(e)}
                >
                    <div className={classes.searchField}>
                        <TextInput
                            fullWidth={false} label={"キーワード入力"} multiline={false}
                            onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}
                        />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {menus.map(menu => (
                            <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}> 
                                <ListItemIcon>
                                    {menu.icon}
                                    <ListItemText primary={menu.label} />
                                </ListItemIcon>
                            </ListItem>
                        ))}
                        <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                                <ListItemText primary={"Logout"} />
                            </ListItemIcon>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {filters.map(filter => (
                            <ListItem
                                button
                                key={filter.id}
                                onClick={(e) => filter.func(e, filter.value)}
                            >
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    );
};

export default OnDrawer;