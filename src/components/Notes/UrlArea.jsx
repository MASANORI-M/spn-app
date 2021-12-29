import React, { useCallback, useState } from 'react';
import { Paper, TableContainer } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import { TableBody } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import HttpIcon from '@material-ui/icons/Http';
import { makeStyles } from "@material-ui/styles";

import { TextInput } from '../Uiparts';

const useStyles = makeStyles({
    checkIcon: {
        float: 'right'
    },
    iconCell: {
        height: 48,
        width: 48
    }
});

const UrlArea = (props) => {
    const classes = useStyles();

    const [index, setIndex] = useState(0),
          [url, setUrl] = useState("");

    const inputUrl = useCallback((event) => {
        setUrl(event.target.value);
    }, [setUrl]);

    const addUrl = (index, url) => {
        if(url === "") {
            return false;
        } else {
            if(index === props.urls.length) {
                props.setUrls(prevState => [...prevState, {url: url}]);
                setIndex(index + 1);
                setUrl("");
            } else {
                const newUrls = props.urls;
                newUrls[index] = {url: url}
                props.setUrls(newUrls);
                setIndex(newUrls.length);
                setUrl("");
            }
        }
    }

    const editUrl = (index, url) => {
        setIndex(index);
        setUrl(url);
    }

    const deleteUrl = (deleteIndex) => {
        const newUrls = props.urls.filter((item, i) => i !== deleteIndex);
        props.setUrls(newUrls);
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>参考URL</TableCell>
                            <TableCell className={classes.iconCell}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.urls.length > 0 && (
                            props.urls.map((item, i) => (
                                <TableRow key={item.url}>
                                    <TableCell>{item.url}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            className={classes.iconCell}
                                            onClick={() => editUrl(i, item.url)}
                                        >
                                            <HttpIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            className={classes.iconCell}
                                            onClick={() => deleteUrl(i)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div>
                    <TextInput
                        fullWidth={false} label={"URL"} multiline={false} required={false}
                        onChange={inputUrl} rows={1} value={url} type={"text"}
                    />
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addUrl(index, url)}>
                    <CheckCircleIcon />
                </IconButton>
            </TableContainer>
        </div>
    );
};

export default UrlArea;