import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#E4E4E4",
        color: "#444",
        height: 50
    }
});

const Footer = () => {
    const classes = useStyles();

    return (
        <div className='footer'>
        <div className={classes.root}>
            <small>© 2022 MASANORI@Super Practice Note's</small>
        </div>
        </div>
    );
};

export default Footer;