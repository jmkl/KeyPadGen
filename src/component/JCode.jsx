import { styled } from '@mui/system';

export const JCode = styled('div')({
  '&:hover': {
    color: '#fd0',
    transition: 'all .2s ease-in',
  },
  '& pre': {
    position: 'absolute',
  },
  '& Button': {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  '&:active': {
    color: '#fd0',

    transition: 'all .2s ease-out',
  },
  fontStyle: 'italic',
  background: '#333',
  height: '350px',
  position: 'relative',
  padding: '40px',
  lineHeight: '120%',
  fontFamily: 'Operator Mono Lig Light',

  fontSize: '.7rem',
  transition: 'all .2s ease-in',
  marginBottom: '20px',
  borderRadius: '10px',
});
