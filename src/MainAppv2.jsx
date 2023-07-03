import {
    ButtonGroup,
    Box,
    Grid,
    Container,
    Button,
    Stack,
    FormControlLabel,
    Checkbox,
    styled,
    Input,
    Typography,
    TextField,
} from "@mui/material"
import { KeyGrid } from "./component/KeyGrid"
import { useEffect, useState } from "react"
import { buildString } from "./utils/datautil";
import { JCode } from "./component/JCode";
import { library } from '@fortawesome/fontawesome-svg-core'
import html2canvas from 'html2canvas';
import Icon from '@mui/material/Icon';
import { css } from "@mui/system";
import { materialList } from "./utils/falist";

const StyleButton = styled(Button)(({ theme }) => ({
    padding: "0px 10px 0px",
    fontSize: '0.8rem',
    margin: '0',
    color: theme.palette.secondary.secondary
}));

function downloadObjectAsJson(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

export const MainAppv2 = () => {
    const [klist, setKlist] = useState([]);
    const [load, setLoad] = useState("Loading...");
    const [isLoad, setIsLoad] = useState(false);
    const KEYITEM = "keyitems";
    const [generateKey, setGenerateKey] = useState("Do some magic...");
    const [genBtn, setGenBtn] = useState("Generate");
    const [dl, setDl] = useState(false)
    const [icColor, setIcColor] = useState("#fff");



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
                        icon: '',
                        id: index,
                        keys: []
                    }
                ])
            }
        }

    }, [load]);

    const StyleStack = styled(Stack)(({ theme }) => ({
        '&': css`position: relative;
                justify-content: center;
                align-items: center;
                width:100%;
                height:100%;
                background:linear-gradient(to top,rgba(20,0,200,.01),rgba(100,0,200,.05)),linear-gradient(#222,#111 10%);
                border: 1px solid #040404;
                border-bottom: 5px solid #000;
                border-top:1 px solid #555;
                outline: none;
                border-radius: 10px;                     
                cursor: pointer;
                transition:all .1s ease-in;
                `,
        '&:hover': css`
                background:linear-gradient(to top,rgba(120,0,200,.1),rgba(100,0,200,.05)),linear-gradient(#222,#111 10%);
                border-bottom: 5px solid rgba(120,0,200,.1);
                transition:all .1s ease-in;
                box-shadow:0 12px 10px rgba(0,0,0,.5);
        `
    }));

    return (
        <Container sx={{ paddingTop: "50px" }}>

            <Box sx={{

                marginBottom: "20px",
                display: "flex",
                flexGrow: 0,
                justifyItems: "center",
                alignItems: 'center', justifyContent: "center", width: "100%"
            }}>


                <Grid id="keypad" sx={{ background: 'transparent', width: "400px", height: "400px" }} container  >
                    {klist.map((value, index) => {

                        return <Grid key={index} item xs={3}>
                            <StyleStack spacing={1}

                            >
                                <Icon sx={{ fontSize: "2.2rem", color: icColor }}>{value.icon}</Icon>

                                {/**<FontAwesomeIcon size="2x" icon={value.icon ? value.icon : ['fab', value.icon]} />*/}
                                <Typography variant="caption" sx={{ fontSize: "0.5rem", fontWeight: "900", color: icColor }}> {value.name.toUpperCase()}</Typography>


                            </StyleStack>

                        </Grid>

                    })}
                </Grid>
            </Box>
            <Box sx={{ marginBottom: "20px", display: "flex", flexGrow: 1, alignItems: 'center', justifyContent: "center", width: "100%" }}>
                <ButtonGroup sx={{ height: '40px' }}>
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
                            if (dl)
                                downloadObjectAsJson(klist, "hello.json");
                        }}
                    >{genBtn}</StyleButton>

                    <StyleButton

                        onClick={() => {
                            html2canvas(document.getElementById("keypad"),
                                {
                                    backgroundColor: null,
                                    allowTaint: true,
                                    useCORS: true
                                }).then(function (canvas) {
                                    var link = document.createElement("a");
                                    link.download = "keypad_.png";
                                    link.href = canvas.toDataURL("image/png");
                                    link.click();

                                });


                        }}
                    >Download Image</StyleButton>
                    <Input type="file" onChange={(e) => {
                        var fr = new FileReader();
                        fr.onload = function () {
                            setKlist(JSON.parse(fr.result))

                        }
                        fr.readAsText(e.target.files[0])
                    }} />
                    <Box sx={{ flexGrow: 1, transform: "scale(0.6)", }}>
                        <FormControlLabel control={
                            <Checkbox checked={dl} onChange={(ev) => setDl(ev.target.checked)} />} label="Download config" />
                        <TextField value={icColor} onChange={(e) => { setIcColor(e.target.value) }} />
                    </Box>

                </ButtonGroup>
            </Box>
            <Box sx={{ flexGrow: 1, transform: "scale(0.9)", }}>
                <Grid container spacing={1}>
                    {klist.map((value, index) => {

                        return <KeyGrid iconList={materialList} onEdit={() => {

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