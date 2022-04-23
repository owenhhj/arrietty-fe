import * as React from 'react';
import Box from '@mui/material/Box';
import {Autocomplete, ButtonGroup, Checkbox, FormControlLabel, InputAdornment} from "@mui/material";
import {TTextField, TButton} from "./MUIComponentsThemed";
import {useState} from "react";
import Button from "@mui/material/Button";

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
    onChange(e.target.value);
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

export function MUIButton({
                            label = 'Submit',
                            variant = 2,  // 'text', 'contained', 'outlined'
                          }) {
  const buttonVariants = ['text', 'contained', 'outlined'];

  const buttonSxs = [
    {},
    {backgroundColor: '#36C0C9'},
    {color: '#36C0C9', borderColor: '#36C0C9'}
  ]

  return (
    <>
      <Button
        sx={{...buttonSxs[variant], width:'6em', height:'2.5em'}}
        variant={buttonVariants[variant]}
      >
        {label}
      </Button>
    </>
  );
}

export function MUIButtonGroup({
                                 labels = ['submit', 'cancel'],
                                 selected = 0,
  buttonStyle={},
                                 callback
                               }) {
  const buttonVariants = ['text', 'contained'];

  const buttonSxs = [
    {color: '#36C0C9', width:'6em', height:'2.5em'},
    {backgroundColor: '#36C0C9', width:'6em', height:'2.5em'}
  ];

  return (
    <>
      <ButtonGroup>
        {labels.map((label, index) => {
          return (
            <Button
              key={index}
              sx={{...buttonSxs[index===selected?1:0], ...buttonStyle}}
              variant={buttonVariants[index===selected?1:0]}
              onClick={()=>{callback(index)}}
            >
              {label}
            </Button>
          );
        })}
      </ButtonGroup>

    </>
  );
}









