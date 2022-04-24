import * as React from 'react';
import Box from '@mui/material/Box';
import {Autocomplete, ButtonGroup, Checkbox, FormControlLabel, InputAdornment} from "@mui/material";
import {TTextField} from "./MUIComponentsThemed";
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
                               error = false,
                               helperText = 'Invalid entry',
                               readOnly = false,
                               onChange
                             }) {
  const styleBoxDefault = {
    width: size === 'multiline' ? '100%' : '62%',
    margin: 0,
    padding: 0
  };

  const styleInputDefault = {
    margin: 0,
    padding: 0
  };

  const inputProps = {readOnly: readOnly};

  const handleInputChange = (e) => {
    onChange(identifier, e.target.value);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {m: 1, width: '100%'},
        }}
        noValidate
        autoComplete="off"
        style={{...styleBoxDefault, ...styleBox}}
      >
        {size === 'normal' && (
          <TTextField label={label} variant={'standard'} placeholder={placeholder}
                      style={{...styleInputDefault, ...styleInput}}
                      error={error} helperText={error ? helperText : null}
                      InputProps={inputProps}
                      onChange={handleInputChange}
          />
        )}
        {size === 'multiline' && (
          <TTextField label={label} variant={'outlined'} placeholder={placeholder}
                      style={{...styleInputDefault, ...styleInput}}
                      multiline minRows={minRows} maxRows={maxRows}
                      error={error} helperText={error ? helperText : null}
                      InputProps={inputProps}
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
                            error = false,
                            helperText = 'Invalid entry',
                            onChange
                          }) {
  const styleBoxDefault = {
    width: '6em',
    margin: 0,
    padding: 0
  };

  const handleInputChange = (e) => {
    onChange(identifier, e.target.value);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
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
                    error={error} helperText={error ? helperText : null}
                    onChange={handleInputChange}
        />
      </Box>
    </>
  );
}

export function MUICheckbox({
                              identifier,
                              label = '',
                              value = false,
                              error = false,
                              helperText = 'Invalid entry',
                              onChange
                            }) {
  const [checked, setChecked] = useState(false);

  const styleCheckboxDefault = {
    // color: '#57068C',
    color: '#36C0C9'
  }

  const handleInputChange = (e) => {
    let temp = !checked;
    setChecked(temp);  // todo
    onChange(identifier, temp);
  };

  return (
    <>
      <FormControlLabel
        control={<Checkbox
          defaultChecked={false} style={{...styleCheckboxDefault}} onChange={handleInputChange}
          error={error} helperText={error ? helperText : null}
        />}
        label={label}/>
    </>
  );
}

export function MUITagSelect({
                               identifier,
                               options = [],
                               label = '',
                               error = false,
                               helperText = 'Invalid entry',
                               onChange
                             }) {
  const handleInputChange = (newOption) => {
    onChange(identifier, newOption ? newOption.id : null);
  };

  return (
    <>
      <Autocomplete
        disablePortal
        size={'small'}
        options={options}
        sx={{width: '20em'}}
        isOptionEqualToValue={(option, value) => option.id === value.id}  // to avoid some error
        onChange={(e, newOption) => {
          handleInputChange(newOption);
        }}
        renderInput={(params) => (
          <TTextField
            {...params} label={label}
            error={error} helperText={error ? helperText : null}
          />
        )}
      />
    </>
  );
}

export function MUIButton({
                            label = 'Submit',
                            variant = 2,  // 'text', 'contained', 'outlined'
                            onClick
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
        sx={{...buttonSxs[variant], width: `${label.length - 1}em`, height: '2.5em'}}
        variant={buttonVariants[variant]}
        onClick={onClick}
      >
        {label}
      </Button>
    </>
  );
}

export function MUIButtonGroup({
                                 labels = ['submit', 'cancel'],
                                 selected = 0,
                                 buttonStyle = {},
                                 onChange
                               }) {
  const buttonVariants = ['text', 'contained'];

  const buttonSxs = [
    {color: '#36C0C9', width: '6em', height: '2.5em'},
    {backgroundColor: '#36C0C9', width: '6em', height: '2.5em'}
  ];

  return (
    <>
      <ButtonGroup>
        {labels.map((label, index) => {
          return (
            <Button
              key={index}
              sx={{...buttonSxs[index === selected ? 1 : 0], ...buttonStyle}}
              variant={buttonVariants[index === selected ? 1 : 0]}
              onClick={() => {
                onChange(index)
              }}
            >
              {label}
            </Button>
          );
        })}
      </ButtonGroup>

    </>
  );
}









