import { styled } from '@mui/system';
import {
  Box
} from '@mui/material';

export const JCode = styled(Box)({
  '&:hover': {
    color: '#fd0',
    transition: 'all .2s ease-in',
  },
  '& pre': {
  },
  '& Button': {
    top: '10px',
    right: '10px',
  },
  '&:active': {
    color: '#fd0',

    transition: 'all .2s ease-out',
  },
  fontStyle: 'italic',
  padding: '40px',
  lineHeight: '150%',
  fontFamily: 'Operator Mono Lig Light',
  fontSize: '.7rem',
  transition: 'all .2s ease-in',
  marginBottom: '20px',
  borderRadius: '10px',
});
