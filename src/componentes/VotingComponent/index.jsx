import React, { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { Autocomplete } from '@mui/joy';
import {
    EmojiComProblema, EmojiMufino, EmojiNeutro, EmojiPistola,
    EmojiSorriso, EmojiSorrisoLeve, EmojiTriste
} from '../Emojis';
import styled from 'styled-components';
import AlertVariousStates from '../Alertas';
import UseApi from '../../Service/UseApi';
import BasicModal from '../BasicModal';

const opcoes = ['Comercial', 'Suporte técnico', 'Noc', 'Administrativo', 'Técnico'];

const BotaoEstilizado = styled.button`
  background-color: transparent;
  border: none;
`;

const today = new Date();
const data = today.toLocaleDateString('pt-BR');

const VotingComponent = () => {
    const [visitorId, setVisitorId] = useState(null);
    const [emojiSelecionado, setEmojiSelecionado] = useState('');
    const [setor, setSetor] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [proibido, setProibido] = useState(false);
    const [alerta, setAlerta] = useState(false);
    const [texto, setTexto] = useState('')
    const [titulo, setTitulo] = useState('')

    const fetchData = async (endpoint, metodo, body) => {
        setLoading(true);
        setError(null);

        try {
            const apiRequest = UseApi();
            const responseData = await apiRequest(endpoint, metodo, body);
            setTitulo('Obrigado!!')
            setTexto('Obrigado por compartilhar como você está se sentido hoje')
            setProibido(true);

        } catch (err) {
            console.log(err);

            // Verifica se é erro HTTP com status 403
            if (err.status === 403) {
                console.warn('Erro 403: acesso negado');
                setTitulo('Reação não enviada')
                setTexto('Você ja voltou hoje')
                setProibido(true);
            } else {
                console.error(err);
                setError(err.message || 'Erro desconhecido');
            }
        } finally {
            setLoading(false);
        }
    };

    const selecionarEmoji = (emoji) => {
        if (setor !== '') {
            setEmojiSelecionado(emoji);

            const body = {
                reacao: emoji,
                setor,
                machineId: visitorId
            };

            console.log(emoji, setor, data, visitorId);
            fetchData('reacao/registrar', 'POST', body);
        } else {
            atualizarStatusAlerta();
            console.log('Error: Informe o setor');
        }
    };

    const selecionarSetor = (e) => {
        setSetor(e.target.textContent);
    };

    const atualizarStatusAlerta = () => {
        setAlerta(!alerta);
    };

    const fecharModalProibido = () => {
        setProibido(false);
    };

    useEffect(() => {
        const initFingerprint = async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            setVisitorId(result.visitorId);
            localStorage.setItem('voter_id', result.visitorId);
        };
        initFingerprint();
    }, []);

    return (
        <>
            {alerta && (
                <AlertVariousStates
                    tipo='danger'
                    texto='Selecione um setor'
                    fechar={atualizarStatusAlerta}
                />
            )}

            <BasicModal
                texto={texto}
                titulo={titulo}
                abrir={proibido}
                fechar={fecharModalProibido}
            />

            <div>
                <h3>Selecione o seu setor: </h3>
                <Autocomplete options={opcoes} onChange={selecionarSetor} />
            </div>

            <div>
                <h3>Como você está se sentindo?</h3>
                <BotaoEstilizado onClick={() => selecionarEmoji('PISTOLA')}><EmojiPistola /></BotaoEstilizado>
                <BotaoEstilizado onClick={() => selecionarEmoji('COM_PROBLEMA')}><EmojiComProblema /></BotaoEstilizado>
                <BotaoEstilizado onClick={() => selecionarEmoji('TRISTE')}><EmojiTriste /></BotaoEstilizado>
                <BotaoEstilizado onClick={() => selecionarEmoji('MUFINO')}><EmojiMufino /></BotaoEstilizado>
                <BotaoEstilizado onClick={() => selecionarEmoji('NEUTRO')}><EmojiNeutro /></BotaoEstilizado>
                <BotaoEstilizado onClick={() => selecionarEmoji('SORRISO_LEVE')}><EmojiSorrisoLeve /></BotaoEstilizado>
                <BotaoEstilizado onClick={() => selecionarEmoji('SORRISO')}><EmojiSorriso /></BotaoEstilizado>
            </div>
        </>
    );
};

export default VotingComponent;
