import {createStyles, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      },
      body: {
        height: '100%',
        width: '100%',
      },
      '#app': {
        height: '100%',
        width: '100%',
      },
    },
  }),
);

const GlobalStyles = (): null => {
  useStyles();

  return null;
};

export default GlobalStyles;
