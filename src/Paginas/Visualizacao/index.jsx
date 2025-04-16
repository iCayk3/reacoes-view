import styled from "styled-components";
import ExibicaoDados1 from "../../componentes/ExibicaoDados1";
import { Autocomplete } from "@mui/joy";
import { useEffect, useState } from "react";
import UseApi from "../../Service/UseApi";

const VisualizacaoEstilazada = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  .autocomplete {

  }

  @media only screen and (max-width: 600px) {
    .dados{
        position: absolute;
        left: 0;
    }
    display: flex;
    flex-direction: column;
  }
`;

const opcoes = ['Comercial', 'Suporte técnico', 'Noc', 'Administrativo', 'Técnico'];
const opcoesFiltro = ['diario', 'semanal', 'mensal'];

export default function Visualizacao() {
    const [setor, setSetor] = useState(null);
    const [periodo, setPeriodo] = useState('mensal');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState({});

    const fetchData = async (tipoPeriodo) => {
        setLoading(true);
        setError(null);

        try {
            const apiRequest = UseApi();
            const responseData = await apiRequest(`reacao?tipo=${tipoPeriodo}`, "GET");
            setDados(responseData);
        } catch (err) {
            if (err.status === 403) {
                console.warn("Erro 403: acesso negado");
            } else {
                console.error(err);
                setError(err.message || "Erro desconhecido");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(periodo);
    }, [periodo]);

    const normalizeKey = (str) => str?.toUpperCase()?.replace(' ', '_');

    const getDadosPorSetor = () => {
        const setorKey = normalizeKey(setor);
        if (setorKey && dados[setorKey]) {
            return dados[setorKey][0];
        }

        // Soma geral de todos os setores
        return Object.values(dados).reduce((acc, curr) => {
            const reacoes = curr[0];
            for (const tipo in reacoes) {
                acc[tipo] = (acc[tipo] || 0) + reacoes[tipo];
            }
            return acc;
        }, {});
    };

    const dadosFiltrados = getDadosPorSetor();

    return (
        <VisualizacaoEstilazada>
            <div className="autocomplete">
                <h3>Selecione o setor:</h3>
                <Autocomplete
                    options={opcoes}
                    onChange={(_, value) => setSetor(value)}
                    value={setor}
                    isOptionEqualToValue={(option, value) => option === value}
                />
            </div>
            <div className="autocomplete">
                <h3>Selecione o período:</h3>
                <Autocomplete
                    options={opcoesFiltro}
                    onChange={(_, value) => value && setPeriodo(value)}
                    value={periodo}
                    isOptionEqualToValue={(option, value) => option === value}
                />
                <div className="dados">
                    <ExibicaoDados1 label={`Reações - ${periodo}`} dadosBd={dadosFiltrados} />
                </div>
            </div>
        </VisualizacaoEstilazada>
    );
}
