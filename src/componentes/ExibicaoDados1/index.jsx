import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const dados = ['😡', '😢', '😥', '🙁', '😕', '🙂', '😄']



export default function ExibicaoDados1({label, dadosBd = {}}) {
    return (
        <>
            <h2>{label}</h2>
            <BarChart
                barLabel=''
                xAxis={[{ scaleType: 'band', data: dados, tickFontSize: 30 }]}
                series={[{ data: [
                    dadosBd.PISTOLA, 
                    dadosBd.COM_PROBLEMA, 
                    dadosBd.TRISTE,
                    dadosBd.MUFINO, 
                    dadosBd.NEUTRO,
                    dadosBd.SORRISO_LEVE,
                    dadosBd.SORRISO
                ] }]}
                width={450}
                height={250}
            />
        </>
    );
}
