// BasicModal.jsx (garanta que esteja assim ou semelhante)

import React from 'react';
import { Modal, ModalDialog, Typography, ModalClose } from '@mui/joy';

const BasicModal = ({ texto, titulo, abrir, fechar }) => {
  return (
    <Modal open={abrir} onClose={fechar}>
      <ModalDialog>
        <ModalClose />
        <Typography level="h4">{titulo}</Typography>
        <Typography>{texto}</Typography>
      </ModalDialog>
    </Modal>
  );
};

export default BasicModal;
