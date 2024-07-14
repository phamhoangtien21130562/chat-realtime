import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const CustomStyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '20px',
        width: '500px',
    },
}));

function CustomDialog({ open, onClose, title, message }) {
    return (
        <CustomStyledDialog open={open} onClose={onClose}>
            <DialogTitle className="title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText className="dialog_mesage">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </CustomStyledDialog>
    );
}

export default CustomDialog;
