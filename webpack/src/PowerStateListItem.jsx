import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import axios from 'axios';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/MoreVert'

import { withStyles } from '@material-ui/core/styles';

import ChangePowerStateDialog from './ChangePowerStateDialog'

const styles = theme => ({

});

class PowerStateListItem
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(this.props.power === nextProps.power &&
            this.state.open === nextState.open);
    }

    handleToggle() {
        console.log(`PowerStateListItem:handleToggle ${this.props.name}`);
        this.props.handleToggle(this.props.name);
    };

    handleClose(togglesSwitch) {
        console.log(`PowerStateListItem:handleClose ${this.props.name}`);
        if (togglesSwitch) {
            this.props.handleChangeState(this.props.name, togglesSwitch);
        }

        this.setState({ open: false });
    }

    handleMenuButton() {
        console.log(`PowerStateListItem:handleMenuButton ${this.props.name}`);
        this.setState({ open: true });
    }

    render() {
        console.log(`PowerStateListItem:render ${this.props.name}`);

        return (
            <ListItem>
                <ListItemText primary={this.props.name} />
                <ListItemSecondaryAction>
                    <Switch
                        onChange={this.handleToggle.bind(this)}
                        checked={this.props.power}
                    />
                    <IconButton onClick={this.handleMenuButton.bind(this)}>
                        <MenuIcon />
                    </IconButton>
                </ListItemSecondaryAction>
                <ChangePowerStateDialog
                    open={this.state.open}
                    handleClose={this.handleClose.bind(this)}
                />
            </ListItem>
        );
    }
}

export default withStyles(styles)(PowerStateListItem)
