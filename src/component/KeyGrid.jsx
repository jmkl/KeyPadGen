/* eslint-disable react/prop-types */
import {
  Grid,
  TextField,
  InputBase,
  Icon,
  Autocomplete,
  Paper,
  Box,
  Typography,
} from '@mui/material';

export function KeyGrid(props) {

  const keys = [
    'self.TOGGLE(0)', 'self.TOGGLE(1)', 'self.TOGGLE(2)', "MOD", "MOD2", "KC.HYPR", "KC.MEH", "KC.LCTL",
    "KC.LSFT", "KC.LALT", "KC.LGUI", "KC.A", "KC.B", "KC.C", "KC.D", "KC.E", "KC.F", "KC.G", "KC.H", "KC.I",
    "KC.J", "KC.K", "KC.L", "KC.M", "KC.N", "KC.O", "KC.P", "KC.Q", "KC.R", "KC.S", "KC.T", "KC.U", "KC.V",
    "KC.W", "KC.X", "KC.Y", "KC.Z", "KC.N1", "KC.N2", "KC.N3", "KC.N4", "KC.N5", "KC.N6", "KC.N7", "KC.N8",
    "KC.N9", "KC.N0", "KC.ENTER", "KC.ESCAPE", "KC.BSPACE", "KC.TAB", "KC.SPACE", "KC.MINUS", "KC.EQUAL", "KC.LBRACKET",
    "KC.RBRACKET", "KC.BSLASH", "KC.SCOLON", "KC.QUOTE", "KC.GRAVE", "KC.COMMA", "KC.DOT", "KC.SLASH", "KC.CAPSLOCK",
    "KC.F1", "KC.F2", "KC.F3", "KC.F4", "KC.F5", "KC.F6", "KC.F7", "KC.F8", "KC.F9", "KC.F10", "KC.F11", "KC.F12", "KC.F13",
    "KC.F14", "KC.F15", "KC.F16", "KC.F17", "KC.F18", "KC.F19", "KC.F20", "KC.F21", "KC.F22", "KC.F23", "KC.F24", "KC.PSCREEN",
    "KC.PAUSE", "KC.INSERT", "KC.HOME", "KC.PGUP", "KC.DELETE", "KC.END", "KC.PGDOWN", "KC.RIGHT", "KC.LEFT", "KC.DOWN", "KC.UP",
    "KC.KP_SLASH", "KC.KP_ASTERISK", "KC.KP_MINUS", "KC.KP_PLUS", "KC.KP_ENTER", "KC.KP_1", "KC.KP_2", "KC.KP_3", "KC.KP_4", "KC.KP_5",
    "KC.KP_6", "KC.KP_7", "KC.KP_8", "KC.KP_9", "KC.KP_0", "KC.KP_DOT", "KC.KP_EQUAL", "KC.KP_COMMA",
  ];

  const icStyle = {
    cursor: 'pointer',

    '&:hover': {
      color: '#fd0',
    },
  };
  return (
    <Grid sx={{}} item xs={3}>
      <Paper
        elevation={0}
        sx={{
          padding: '10px',
          border: 'solid 1px #333',
          borderRadius: '10px',
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper
              sx={{
                borderRadius: '5px',
                display: 'flex',
                padding: '10px',
              }}
            >
              <InputBase
                focused="true"
                defaultValue={props.Keys.name}
                size="small"
                variant="filled"
                color="secondary"
                label={`key ${props.Keys.id + 1} name`}
                onChange={(e) => {
                  props.Keys.name = e.target.value;
                  props.onEdit();
                }}
                sx={{ width: '100%' }}
              />
              <Icon
                onClick={() => {
                  props.GetIcon(props.idx);
                }}
                sx={icStyle}
              >
                {props.Keys.icon}
              </Icon>
            </Paper>
          </Grid>



          <Grid item xs={12}>
            <Autocomplete
              disableCloseOnSelect
              multiple
              defaultValue={props.Keys.keys || ''}
              limitTags={2}
              size="small"
              options={keys}
              sx={{ width: '100%' }}
              onChange={(index, value) => {
                props.Keys.keys = value;
                props.onEdit();
              }}
              renderOption={(prps, option) => {
                return (
                  <li {...prps}>
                    <Box component="span" sx={{ display: 'flex' }}>
                      <Typography variant="caption" display="block">
                        {option}
                      </Typography>
                    </Box>
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  variant="filled"
                  InputProps={{
                    ...params.InputProps,
                    style: { fontSize: 15, padding: '3px' },
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
