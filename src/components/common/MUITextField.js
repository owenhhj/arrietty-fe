import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {InputAdornment} from "@mui/material";

// README props without default values are required from parent, others can be omitted
export function MUITextField({
                               size = 'normal',  // 'normal', 'multiline'
                               minRows = 3,
                               maxRows = 5,
                               identifier,
                               label = '',
                               value = '',
                               placeholder = '',
                               styleBox = {},
                               styleInput = {},
                               onChange
                             }) {
  const styleBoxDefault = {
    width: size === 'multiline' ? '90%' : '62%',
    margin: 0,
    padding: 0
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    onChange(identifier, e.target.value);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          // '& > :not(style)': {m: 1, width: '25ch'},
          '& > :not(style)': {m: 1, width: '100%'},
        }}
        noValidate
        autoComplete="off"
        style={{...styleBoxDefault, ...styleBox}}
      >
        {size === 'normal' && (
          <TextField label={label} variant={'standard'} value={value} placeholder={placeholder} style={{...styleInput}}
                     onChange={handleInputChange}
          />
        )}
        {size === 'multiline' && (
          <TextField label={label} variant={'outlined'} value={value} placeholder={placeholder} style={{...styleInput}}
                     multiline minRows={minRows} maxRows={maxRows}
                     onChange={handleInputChange}
          />
        )}
      </Box>
    </>
  );
}

export function MUINumber({
                            identifier,
                            label = '',
                            value = '',
                            placeholder = '',
                            styleBox = {},
                            styleInput = {},
                            onChange
                          }) {
  const styleBoxDefault = {
    width: '16em',
    margin: 0,
    padding: 0
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    onChange(identifier, e.target.value);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          // '& > :not(style)': {m: 1, width: '25ch'},
          '& > :not(style)': {m: 1, width: '100%'},
        }}
        noValidate
        autoComplete="off"
        style={{...styleBoxDefault, ...styleBox}}
      >
        <TextField label={label} type="number" variant="standard" style={{...styleInput}}
                   // value={value} placeholder={placeholder}
                   endAdornment={<InputAdornment position="end">RMB</InputAdornment>}
                   aria-describedby="outlined-weight-helper-text"
                   InputLabelProps={{
                     shrink: true,
                   }}
        />
      </Box>
    </>
  );
}








