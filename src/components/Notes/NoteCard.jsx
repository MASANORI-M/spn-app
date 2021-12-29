import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { deleteNote } from '../../reducks/Notes/operation';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)'
        },
        [theme.breakpoints.up('sm')]: {
            margin: 16,
            width: 'calc(33.3333% - 32px)'
        }
    },
    content: {
        display: 'flex',
        padding: '16px 8px',
        textAlign: 'left',
        '&:last-child': {
            paddingBottom: 16
        }
    },
    media: {
        height: 0,
        paddingTop: '100%'
    },
    important: {
        color: theme.palette.secondary.main,
        fontSize: 16
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },   
}));

const NoteCard = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [anchorElm,  setAnchorElm] = useState(null);

    const handleClick = (event) => {
        setAnchorElm(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElm(null);
    };

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media} image={props.images[0].path}
                title="" onClick={() => dispatch(push('/note/' + props.id))}
            />
            <CardContent className={classes.content}>
                <div onClick={() => dispatch(push('/note/' + props.id))}>
                    <Typography color="textSecondary" component="p">
                        {props.title}
                    </Typography>
                    {/* <Typography className={classes.important} component="p">
                        {props.time}
                    </Typography>
                    <Typography className={classes.important} component="p">
                        {props.complete}
                    </Typography> */}
                </div>
                <IconButton className={classes.expand} onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorElm} keepMounted open={Boolean(anchorElm)} onClose={handleClose}
                >
                    <MenuItem
                        onClick={() => {
                            dispatch(push('/note/edit/' + props.id));
                            handleClose();
                        }}
                    >
                        編集
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            dispatch(deleteNote(props.id));
                            handleClose();
                        }}
                    >
                        削除
                    </MenuItem>
                </Menu>
            </CardContent>
        </Card>
    );
};

export default NoteCard;