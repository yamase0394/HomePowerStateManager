import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import { withStyles } from '@material-ui/core/styles';

import ChangePowerStateDialog from './ChangePowerStateDialog'
import PowerStateListItem from './PowerStateListItem'
import axios from 'axios';


const styles = theme => ({
    irLogGrid: {
        width: '100%',
        height: 500,
    },
});

class CommandHistory extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        ReactDOM.findDOMNode(this).scrollTop = 0
    }

    render() {
        console.log("PowerStateList:render");

        let powerStateList = [];
        this.props.irLog.forEach(val => {
            console.log(val);
            powerStateList.push(
                <Grid item>
                    <Card>
                        <CardHeader
                            action={
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Shrimp and Chorizo Paella"
                            subheader="September 14, 2016"
                        />
                        <CardContent>
                            {Object.keys(val).map(key => {
                                return (
                                    <Typography variant="body1" >
                                        {`${key}:${val[key]}`}
                                    </Typography>
                                )
                            })}
                        </CardContent>
                    </Card>
                </Grid>
            );
        });

        return (
            <Grid
                style={{
                    maxHeight: '99vh', overflow: 'auto',
                }}
                container
                spacing={8}
                wrap={'nowrap'}
                direction={'column-reverse'} >
                {powerStateList}
            </Grid>
        );
    }
}

export default withStyles(styles)(CommandHistory)
