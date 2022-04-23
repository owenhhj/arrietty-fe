import * as React from 'react';
import Box from '@mui/material/Box';
import {Autocomplete, Checkbox, FormControlLabel, InputAdornment} from "@mui/material";
import {TTextField} from "./MUIComponentsThemed";
import {useState} from "react";

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

  const styleInputDefault = {
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
          <TTextField label={label} variant={'standard'} placeholder={placeholder}
            // value={value}
                      style={{...styleInputDefault, ...styleInput}}
                      onChange={handleInputChange}
          />
        )}
        {size === 'multiline' && (
          <TTextField label={label} variant={'outlined'} placeholder={placeholder}
            // value={value}
                      style={{...styleInputDefault, ...styleInput}}
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
                            value = 0,
                            placeholder = '',
                            styleBox = {},
                            styleInput = {},
                            onChange
                          }) {
  const styleBoxDefault = {
    width: '6em',
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
        <TTextField label={label} type="number" variant="standard" placeholder={placeholder} style={{...styleInput}}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">RMB</InputAdornment>,
                    }}
                    InputLabelProps={{
                      // shrink: true,
                    }}
        />
      </Box>
    </>
  );
}

export function MUICheckbox({
                              identifier,
                              label = '',
                              value = false,
                              onChange
                            }) {
  const [checked, setChecked] = useState(false);

  const styleCheckboxDefault = {
    color: '#57068C',
  }

  const handleInputChange = () => {
    setChecked(!checked);  // todo
    // onChange(identifier, e.target.value);
  };

  return (
    <>
      <FormControlLabel
        control={<Checkbox defaultChecked={false} style={{...styleCheckboxDefault}} onChange={handleInputChange}/>}
        label={label}/>
    </>
  );
}

export function MUITagSelect({
                               identifier,
                               options = [],
                               label = '',
                               onChange
                             }) {
  const handleInputChange = (v) => {
    // onChange(identifier, v)
  };

  return (
    <>
      <Autocomplete
        disablePortal
        size={'small'}
        options={options}
        sx={{width: 300}}
        onChange={(e, newValue) => {
          handleInputChange(newValue)
        }}
        renderInput={(params) => <TTextField {...params} label={label}/>}
      />
    </>
  );
}









