import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
export const JText = styled((props) => (
  <TextField
    InputProps={{
      disableUnderline: true,
      spellCheck: false,
    }}
    {...props}
  />
))(({ theme }) => ({
  '.MuiInputBase-input': {
    userSelect: 'none',

    cursor: 'pointer',
    fontSize: '.7rem',
    lineHeight: '0.8rem',
    fontFamily: 'FantasqueSansMono Nerd Font Mono',
  },
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#fd0',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
