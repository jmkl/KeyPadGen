import { Modal, Box, TextField, Autocomplete, Button } from '@mui/material';
import { useState } from 'react';
export function JDialog(props) {
  const optionskey = [
    'self.TOGGLE(0)',
    'self.TOGGLE(1)',
    'self.TOGGLE(2)',
    'MOD',
    'MOD2',
    'KC.HYPR',
    'KC.MEH',
    'KC.LCTRL',
    'KC.LSHIFT',
    'KC.LALT',
    'KC.LGUI',
    'KC.NO',
    'KC.TRANSPARENT',
    'KC.A',
    'KC.B',
    'KC.C',
    'KC.D',
    'KC.E',
    'KC.F',
    'KC.G',
    'KC.H',
    'KC.I',
    'KC.J',
    'KC.K',
    'KC.L',
    'KC.M',
    'KC.N',
    'KC.O',
    'KC.P',
    'KC.Q',
    'KC.R',
    'KC.S',
    'KC.T',
    'KC.U',
    'KC.V',
    'KC.W',
    'KC.X',
    'KC.Y',
    'KC.Z',
    'KC.N1',
    'KC.N2',
    'KC.N3',
    'KC.N4',
    'KC.N5',
    'KC.N6',
    'KC.N7',
    'KC.N8',
    'KC.N9',
    'KC.N0',
    'KC.ENTER',
    'KC.ESCAPE',
    'KC.BSPACE',
    'KC.TAB',
    'KC.SPACE',
    'KC.MINUS',
    'KC.EQUAL',
    'KC.LBRACKET',
    'KC.RBRACKET',
    'KC.BSLASH',
    'KC.SCOLON',
    'KC.QUOTE',
    'KC.GRAVE',
    'KC.COMMA',
    'KC.DOT',
    'KC.SLASH',
    'KC.CAPSLOCK',
    'KC.F1',
    'KC.F2',
    'KC.F3',
    'KC.F4',
    'KC.F5',
    'KC.F6',
    'KC.F7',
    'KC.F8',
    'KC.F9',
    'KC.F10',
    'KC.F11',
    'KC.F12',
    'KC.F13',
    'KC.F14',
    'KC.F15',
    'KC.F16',
    'KC.F17',
    'KC.F18',
    'KC.F19',
    'KC.F20',
    'KC.F21',
    'KC.F22',
    'KC.F23',
    'KC.F24',
    'KC.PSCREEN',
    'KC.SCROLLLOCK',
    'KC.PAUSE',
    'KC.INSERT',
    'KC.HOME',
    'KC.PGUP',
    'KC.DELETE',
    'KC.END',
    'KC.PGDOWN',
    'KC.RIGHT',
    'KC.LEFT',
    'KC.DOWN',
    'KC.UP',
    'KC.KP_SLASH',
    'KC.KP_ASTERISK',
    'KC.KP_MINUS',
    'KC.KP_PLUS',
    'KC.KP_ENTER',
    'KC.KP_1',
    'KC.KP_2',
    'KC.KP_3',
    'KC.KP_4',
    'KC.KP_5',
    'KC.KP_6',
    'KC.KP_7',
    'KC.KP_8',
    'KC.KP_9',
    'KC.KP_0',
    'KC.KP_DOT',
    'KC.KP_EQUAL',
    'KC.LOCKING_CAPS',
    'KC.LOCKING_NUM',
    'KC.LOCKING_SCROLL',
    'KC.KP_COMMA',
    'KC.KP_EQUAL_AS400',
    'KC.TILDE',
    'KC.EXCLAIM',
    'KC.AT',
    'KC.HASH',
    'KC.DOLLAR',
    'KC.PERCENT',
    'KC.CIRCUMFLEX',
    'KC.AMPERSAND',
    'KC.ASTERISK',
    'KC.LEFT_PAREN',
    'KC.RIGHT_PAREN',
    'KC.UNDERSCORE',
    'KC.PLUS',
    'KC.LEFT_CURLY_BRACE',
    'KC.RIGHT_CURLY_BRACE',
    'KC.PIPE',
    'KC.COLON',
    'KC.DOUBLE_QUOTE',
    'KC.LEFT_ANGLE_BRACKET',
    'KC.RIGHT_ANGLE_BRACKET',
    'KC.QUESTION',
    'KC.NONUS_HASH',
    'KC.NONUS_BSLASH',
    'KC.APPLICATION',
    'KC.INT1',
    'KC.INT2',
    'KC.INT3',
    'KC.INT4',
    'KC.INT5',
    'KC.INT6',
    'KC.INT7',
    'KC.INT8',
    'KC.INT9',
    'KC.LANG1',
    'KC.LANG2',
    'KC.LANG3',
    'KC.LANG4',
    'KC.LANG5',
    'KC.LANG6',
    'KC.LANG7',
    'KC.LANG8',
    'KC.LANG9',
  ];

  return (
    <Modal
      open={props.showme}
      onClose={() => {
        props.close();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          border: '1px solid #111',
          borderRadius: '20px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <div>
          <TextField
            id="outlined-basic"
            sx={{ width: '100%' }}
            label="Key Name"
            variant="standard"
            defaultValue={props.currentKey.name || ''}
            size="small"
            onChange={(e) => {
              props.currentKey.name = e.target.value;
            }}
          />

          <Autocomplete
            multiple
            size="small"
            defaultValue={props.currentKey.keys || ''}
            options={optionskey}
            sx={{ width: '100%' }}
            onChange={(ev, val) => {
              props.currentKey.keys = val;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Keys"
                variant="standard"
              />
            )}
          />
        </div>
        <Button
          fullWidth
          sx={{ marginTop: '20px' }}
          variant="outlined"
          onClick={() => {
            props.close();
          }}
        >
          Apply
        </Button>
      </Box>
    </Modal>
  );
}
