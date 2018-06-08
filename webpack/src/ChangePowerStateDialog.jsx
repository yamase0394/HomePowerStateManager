import React from 'react';
import ReactDOM from 'react-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

class ChangePowerStateDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    onClose(togglesSwitch) {
        this.props.handleClose(togglesSwitch);
    }

    render() {
        console.log("ChangePowerStateDialog:render");
        return (
            <Dialog
                open={this.props.open}
                onClose={this.onClose.bind(this, false)}>
                <DialogTitle id="simple-dialog-title">スイッチの状態を反転しますか？</DialogTitle>
                <DialogActions>
                    <Button onClick={this.onClose.bind(this, true)}>OK</Button>
                    <Button onClick={this.onClose.bind(this, false)}>CANCEL</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ChangePowerStateDialog)
