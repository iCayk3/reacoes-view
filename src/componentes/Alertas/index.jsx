import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';


export default function AlertVariousStates({ tipo, texto, fechar }) {
    const items = {
        success: { title: 'Success', color: 'success', icon: <CheckCircleIcon /> },
        warning: { title: 'Warning', color: 'warning', icon: <WarningIcon /> },
        danger: { title: 'Error', color: 'danger', icon: <ReportIcon /> },
        neutral: { title: 'Neutral', color: 'neutral', icon: <InfoIcon /> },
    };

    const item = items[tipo];

    const estilos = { 
        display: 'flex', 
        gap: 2, width: '30%', 
        flexDirection: 'column', 
        position: 'fixed', 
        top: 20, 
        right: 15 
    }

    if (!item) return null; // evita renderização se tipo inválido

    return (
        <Box sx={estilos}>
            <Alert
                
                sx={{ alignItems: 'flex-start' }}
                startDecorator={item.icon}
                variant="soft"
                color={item.color}
                endDecorator={
                    <IconButton variant="soft" color={item.color}>
                        <CloseRoundedIcon onClick={fechar}/>
                    </IconButton>
                }
            >
                <div>
                    <div>{item.title}</div>
                    <Typography level="body-sm" color={item.color}>
                        {texto}
                    </Typography>
                </div>
            </Alert>
        </Box>
    );
}
