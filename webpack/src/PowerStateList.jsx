import React from 'react';
import ReactDOM from 'react-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MenuIcon from '@material-ui/icons/MoreVert'

import { withStyles } from '@material-ui/core/styles';

import ChangePowerStateDialog from './ChangePowerStateDialog'
import PowerStateListItem from './PowerStateListItem'


const styles = theme => ({

});

class PowerStateList extends React.Component {
    constructor(props) {
        super(props);
    }

    handleToggle(value) {
        console.log(`PowerStateList:handleToggle ${value}`);
        this.props.handleToggle(value);
    };

    handleChangeState(value) {
        console.log(`PowerStateList:handleChangeState ${value}`);
        this.props.handleChangeState(value);
    }

    render() {
        console.log("PowerStateList:render");

        let powerStateList = [];
        Object.keys(this.props.power).forEach((key) => {
            powerStateList.push(
                <PowerStateListItem
                    name={key}
                    power={this.props.power[key].power}
                    handleChangeState={this.handleChangeState.bind(this)}
                    handleToggle={this.handleToggle.bind(this)}
                />
            );
        });

        return (
            <List>{powerStateList}</List>
        );
    }
}

export default withStyles(styles)(PowerStateList)
