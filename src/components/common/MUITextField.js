import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function MUITextField({
  identifier='dfIdentifier',
  label='dfLabel',
  variant='standard',
  onChange=null
                                     }) {

  const handleInputChange = (e) => {
    e.preventDefault();
    onChange(identifier, e.target.value);
  }




  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {/*<TextField id="standard-basic" label={label} variant={variant} onChange={handleInputChange}/>*/}
      <TextField id="standard-basic" variant={variant} placeholder={label} onChange={handleInputChange}/>
    </Box>
  );
}








