import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
}
export const ModalBlock: React.FC<ModalProps> = ({
  title,
  children,
  visible = false,
  onClose,
}): React.ReactElement | null => {
  if (!visible) {
    return null;
  }
  return (
    <Dialog
      maxWidth="md"
      open={visible}
      onClose={onClose}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <IconButton color="secondary" onClick={onClose}>
          <CloseIcon style={{ fontSize: 26 }} />
        </IconButton>
        {title}
      </DialogTitle>
      <DialogContent>{ children}</DialogContent>
    </Dialog>
  );
};
