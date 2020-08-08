import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DialogConferme extends Component {
    constructor(props){
        super(props);

    }
    
    handleClickOpen = () => {


    };

    handleClose = () => {
        this.props.closeDialog(false);
    };

    confermeRemove = () => {
        this.props.closeDialog(false);
        this.props.confermeRemove(true);
    }

    render(){
        const {open} = this.props;

        return (
            <div>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{this.props.text}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Annulla
                        </Button>
                        <Button onClick={this.confermeRemove} color="primary" autoFocus>
                            Avanti
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default DialogConferme;