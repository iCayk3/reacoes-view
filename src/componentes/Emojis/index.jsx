import styled from "styled-components"

const EmojiReact = styled.img`
    width: 3rem;
    margin: 1rem;
    transition: transform 0.2s ease;

    &:hover {
        cursor: pointer;
        transform: scale(1.2);
    }
`

const EmojiRaiva = styled(EmojiReact)`
    width: 4rem;
`;

export const Feliz = ({id}) => <EmojiReact src="emojis/smile.png" id={id}/>
export const EmojiComProblema = () => <EmojiReact src="emojis/com_problema.png" />
export const EmojiMufino = () => <EmojiReact src="emojis/mufino.png" />
export const EmojiNeutro = () => <EmojiReact src="emojis/neutral.png" />
export const EmojiPistola = (id) => <EmojiReact src="emojis/pistola.png" id={id}/>
export const EmojiSorrisoLeve = () => <EmojiReact src="emojis/sorriso_leve.png" />
export const EmojiSorriso = () => <EmojiReact src="emojis/sorriso.png" />
export const EmojiTriste = () => <EmojiReact src="emojis/triste.png" />