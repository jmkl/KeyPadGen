import { useState, useRef, useEffect } from "react";

import {
  ButtonGroup,
  Box,
  Stack,
  Container,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import { JDialog } from "./component/JDialog";
import * as htmlToImage from "html-to-image";
import { StyleToast } from "./component/StyleToast";
import { styled } from "@mui/system";
import { Help } from "./component/Help";
// prettier-ignore

const JCode = styled('div')({
  '&:hover':{
    color:"#fd0",
    transition:'all .2s ease-in'    
  },
  '& pre':{
    position:"absolute",
    
  },
  '& Button':{
    position:"absolute",
    top:"10px",
    right:"10px"
  },
  '&:active':{
    color:"#fd0",
    
    transition:'all .2s ease-out'
    
  },
  background:"#333",
  height:'350px',
  position:"relative",
  padding:"40px", 
  lineHeight:'95%',
  fontFamily: "FantasqueSansMono Nerd Font Mono",
  cursor:'pointer',
  fontSize: ".7rem",
  transition:'all .2s ease-in',
  marginBottom:"20px",
  borderRadius:"10px"
  
 
})

export const MainApp = () => {
  const [load, setLoad] = useState("Loading...");
  const [whichButton, setWhichButton] = useState(-1);
  const [isLoad, setIsLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [key, setKey] = useState({ name: `NULL`, id: -1, keys: [] });
  const [allKeys, setAllKeys] = useState([]);
  const [allButton, setAllButton] = useState([]);

  const [generateKey, setGenerateKey] = useState("");

  useEffect(() => {
    setLoad("");
    setIsLoad(true);
  }, []);

  useEffect(() => {
    if (isLoad) {
      setIsLoad(false);
      const items = JSON.parse(localStorage.getItem("items"));
      if (items && items.length > 0) {
        setAllKeys(items);
        setAllButton(
          items.map((ab) => {
            return ab.name;
          })
        );
        console.log(allButton);
      } else {
        for (let index = 0; index < 16; index++) {
          setAllButton((allButton) => [...allButton, `KEY${index}`]);
          setAllKeys((allKeys) => [
            ...allKeys,
            { name: `KEY${index}`, id: index, keys: [] },
          ]);
        }
      }
    } else {
      setAllButton([]);
      setAllKeys([]);
      setKey({ name: `NONE`, id: -1, keys: [] });
    }
  }, [load]);

  useEffect(() => {
    if (allKeys.length > 0) {
      localStorage.setItem("items", JSON.stringify(allKeys));
    }
  }, [allKeys]);

  function generateKeySequence(array) {
    let end = "";
    let key = "";
    for (const [i, k] of array.entries()) {
      key += key == "" ? k : `(${k}`;
      end += i == array.length - 1 ? "" : ")";
    }
    let result = key + end;
    if (result === "") result = "KC.NO";
    return result;
  }
  function buildString() {
    let str = "[\n";
    var tempkeys = allKeys.map((key) => {
      return { name: key.name, keys: generateKeySequence(key.keys) };
    });
    for (const [i, k] of tempkeys.entries()) {
      str += i % 1 === 0 && i !== 0 ? "\n" : "";
      str += i % 4 === 0 && i !== 0 ? "\n\n" : "";
      str += `\t{"name":"${k.name}", "keys":${k.keys}}`;
      str += i === tempkeys.length - 1 ? "" : ",";
    }
    str += "\n]";
    return str;
  }

  return (
    <Container sx={{ paddingTop: "150px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="column" spacing={2}>
          <Box
            id="my-node"
            sx={{
              alignSelf: "center",
              justifyContent: "center",
              width: "240px",
              height: "135px",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            {allButton.map((btn, index) => {
              return (
                <Button
                  sx={{
                    fontFamily: "Bebas Neue Pro",
                    fontWeight: "900",
                    border: "0",
                    boxShadow: "0px -6px rgba(0,0,0,0.3)",
                    borderBottom: "solid 3px #191919",
                    borderRight: "solid 2px #191919",
                    borderLeft: "solid 2px #656565",
                    background: "#4d4d4d",
                    color: "#d7d7d7",
                    borderRadius: "5px 5px 10px 10px",
                    fontSize: "1rem",
                    padding: "0",
                    margin: "0",
                  }}
                  variant="outlined"
                  size="small"
                  key={index}
                  onClick={() => {
                    setWhichButton(index);
                    setKey(allKeys[index]);
                    setOpen(true);
                  }}
                >
                  {btn}
                </Button>
              );
            })}
          </Box>
          <ButtonGroup
            sx={{ justifyContent: "center" }}
            size="small"
            aria-label="small button group"
          >
            <Button
              variant="outlined"
              className="download"
              onClick={() => {
                htmlToImage
                  .toJpeg(document.getElementById("my-node"), { quality: 0.95 })
                  .then(function (dataUrl) {
                    var link = document.createElement("a");
                    link.download = "my-image-name.jpeg";
                    link.href = dataUrl;
                    link.click();
                  });
              }}
            >
              Download
            </Button>
            <Button
              variant="outlined"
              className="generate"
              onClick={() => {
                setToast(true);
                setGenerateKey(buildString);
              }}
            >
              Generate Code
            </Button>
          </ButtonGroup>
          {/* <JText 
       
          multiline 
          label="Code" 
          variant="filled"
          rows={25} 
          onClick={(e)=>{
            if(e.detail==2){
          
              navigator.clipboard.writeText(e.target.value);
              setToast(true);
            }
          }}
          value={generateKey} /> */}
          <JCode
          
          >
            <Button variant="outlined" size="small"
              onClick={(e) => {
                navigator.clipboard.writeText(generateKey);
              setToast(true);
            }}>Copy</Button>
            <pre>
              <code>{generateKey}</code>
            </pre>
          </JCode>
        </Stack>
      </Box>
      <Help />
      <JDialog
        showme={open}
        currentKey={key}
        which={whichButton}
        close={() => {
          allButton[whichButton] = allKeys[whichButton].name;
          setAllKeys((allKeys) => [...allKeys]);
          setOpen(false);
        }}
      />
      <StyleToast
        autoHideDuration={1000}
        open={toast}
        onClose={() => setToast(false)}
      >
        Copied!!
      </StyleToast>
    </Container>
  );
};
