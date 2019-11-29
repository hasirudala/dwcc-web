import React from 'react'
import { AppBar } from 'react-admin'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'


const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    home: {
        color: '#fff',
        '&:hover': {
            color: '#fff'
        }
    }
})

const CustomAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar {...props}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <Button
                href="/"
                className={classes.home}
                startIcon={<HomeIcon/>}
            >
                Home
            </Button>
        </AppBar>
    );
};

export default CustomAppBar
