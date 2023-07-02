import {
    ButtonGroup,
    Box,
    Grid,
    Container,
    Button,
    TextField,
    Paper,
    styled,
} from "@mui/material"
import { KeyGrid } from "./component/KeyGrid"
import { useEffect, useState } from "react"
import { buildString } from "./utils/datautil";
import { JCode } from "./component/JCode";

const StyleButton = styled(Button)(({ theme }) => ({
    padding: "0px 50px 0px",

    color: theme.palette.secondary.secondary
}));

export const MainAppv2 = () => {
    const [klist, setKlist] = useState([]);
    const [load, setLoad] = useState("Loading...");
    const [isLoad, setIsLoad] = useState(false);
    const KEYITEM = "keyitems";
    const [generateKey, setGenerateKey] = useState("Do some magic...");
    const [genBtn, setGenBtn] = useState("Generate");

    useEffect(() => {
        setLoad("");
        setIsLoad(true);
    }, []);

    useEffect(() => {
        if (klist.length > 0) {
            localStorage.setItem(KEYITEM, JSON.stringify(klist));
        }
    }, [klist]);

    useEffect(() => {
        if (!isLoad) {
            setKlist([]);
            return;
        }

        const items = JSON.parse(localStorage.getItem(KEYITEM))

        if (items && items.length > 0) {
            setKlist(items);
        } else {
            for (let index = 0; index < 16; index++) {
                setKlist((klist) => [
                    ...klist, {
                        name: `Key${index + 1}`,
                        id: index,
                        keys: []
                    }
                ])
            }
        }

    }, [load]);



    return (
        <Container sx={{ paddingTop: "50px" }}>
            <Box sx={{ marginBottom: "20px", display: "flex", flexGrow: 1, alignItems: 'center', justifyContent: "center", width: "100%" }}>
                <ButtonGroup>
                    <StyleButton

                        onClick={() => {
                            setKlist((klist) => [...klist]);
                            setGenBtn("Generate");
                        }}
                    >Save</StyleButton>
                    <StyleButton
                        onClick={() => {
                            const keypack = buildString(klist);
                            setGenerateKey(keypack);
                            navigator.clipboard.writeText(keypack);
                            setGenBtn("Copied");
                        }}
                    >{genBtn}</StyleButton>
                </ButtonGroup>
            </Box>
            <Box sx={{ flexGrow: 1, transform: "scale(0.9)", }}>
                <Grid container spacing={1}>
                    {klist.map((value, index) => {

                        return <KeyGrid onEdit={() => {

                        }} Keys={klist[index]}

                            key={index} />
                    })}
                </Grid>
            </Box>
            <Box>
                <JCode>
                    <pre>
                        <code>
                            {generateKey}
                        </code>
                    </pre>
                </JCode>
            </Box>
        </Container>
    )
}