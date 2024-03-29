import * as React from 'react';
import Box from '@mui/material/Box';
import {Autocomplete, ButtonGroup, Checkbox, FormControlLabel, InputAdornment} from "@mui/material";
import {TTextField} from "./MUIComponentsThemed";
import {useState} from "react";
import Button from "@mui/material/Button";
import {capFirstLetter} from "./common";

// README props without default values are required from parent, others can be omitted
export function MUITextField({
                               size = 'normal',  // 'normal', 'multiline'
                               minRows = 3,
                               maxRows = 5,
                               identifier,
                               label = '',
                               value = '',
                               defaultValue = '',
                               placeholder = '',
                               styleBox = {},
                               styleInput = {},
                               error = false,
                               helperText = '',
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
          <TTextField label={label} variant={'standard'} placeholder={placeholder} defaultValue={defaultValue}
                      style={{...styleInputDefault, ...styleInput}}
                      error={error} helperText={error ? helperText : null}
                      InputProps={inputProps}
                      onChange={handleInputChange}
          />
        )}
        {size === 'multiline' && (
          <TTextField label={label} variant={'outlined'} placeholder={placeholder} defaultValue={defaultValue}
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
                            styleBox = {},  // e.g. {width: '4em'}
                            styleInput = {},
                            error = false,
                            helperText = '',
                            onChange
                          }) {
  const styleBoxDefault = {
    width: '8em',
  };

  const handleInputChange = (e) => {
    onChange(identifier, e.target.value);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {m: 1, width: '100%', margin: '0'},
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
                              helperText = '',
                              onChange
                            }) {
  const [checked, setChecked] = useState(false);

  const styleCheckboxDefault = {
    color: '#36C0C9'
  };

  const handleInputChange = (e) => {
    let temp = !checked;
    setChecked(temp);  // todo
    onChange(identifier, temp);
  };

  return (
    <>
      <FormControlLabel
        control={<Checkbox
          defaultChecked={false} onChange={handleInputChange}
          style={{...styleCheckboxDefault}}
          error={error} helperText={error ? helperText : null}
        />}
        label={label}
        style={{alignItems: 'start'}}
      />
    </>
  );
}

export function MUITagSelect({
                               identifier,
                               options = [],
                               label = '',
                               style = {},
                               error = false,
                               helperText = '',
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
        sx={{width: '62%', ...style}}
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
                            size = 'medium',
                            variant = 2,  // defined in `buttonVariants`
                            buttonStyle = {},
                            capiFirstLetter = true,
                            onClick
                          }) {
  const buttonVariants = ['text', 'contained', 'outlined', 'outlined'];

  const buttonSxs = [
    {color: '#36C0C9'},
    {backgroundColor: '#36C0C9'},  // submit button
    {color: '#36C0C9', borderColor: '#36C0C9'},
    {color: '#D32F2F', borderColor: '#BEBEBE', backgroundColor: '#F3F4F6'}  // cancel button
  ];

  return (
    <>
      <Button
        sx={{
          ...buttonSxs[variant],
          width: `${label.length - 1}em`,
          height: '2.3em',
          textTransform: capiFirstLetter ? 'capitalize' : 'none',
          ...buttonStyle
        }}
        size={size}
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
                                 capiFirstLetter = true,
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
              sx={{
                ...buttonSxs[index === selected ? 1 : 0],
                textTransform: capiFirstLetter ? 'capitalize' : 'none',
                ...buttonStyle
              }}
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









