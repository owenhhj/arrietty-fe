import TextField from '@mui/material/TextField';
import {styled} from "@mui/material";

// this is a styling configurator
// use `MUIComponents.js` instead

const defaultMUIStyling = {
  // '& label.Mui-focused': {
  //   // color: '#57068C',
  // },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#57068C',
  },
  '& .MuiOutlinedInput-root': {
    // '& fieldset': {
      // borderColor: '#57068C',
    // },
    // '&:hover fieldset': {
      // borderColor: '#57068C',
    // },
    '&.Mui-focused fieldset': {
      borderColor: '#57068C',
    },
  },
};

export const TTextField = styled(TextField)(defaultMUIStyling);

// export const TTextField = styled(TextField)({
//   '*:after': {borderBottomColor: '#57068C'},
// });


