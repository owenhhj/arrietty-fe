
## arrietty-fe

Haojia He (Owen), [hh1951](mailto:hh1951@nyu.edu), NYUSH2022, [Github](https://github.com/juanjuanjks)

### repo structure

    public/
        <*.html>
        <*.svg>
    src/
        components/
            common/
                <common-component>
                <utility-function>
            <component-group>/
                <component>
            <top-level-webpage-component>
        App.js                                       // main application
        index.js                                     // main application wrapper, serving React.Context
    .env.development                                 // env variables for `npm start`
    .env.production                                  // env variables for `npm run build`

### html structure

    |----------------------- navbar -----------------------|
    ========================================================
    |-- profile --|------ searchbar ------|--- bulletin ---|
    |-- profile --|---- advertisement ----|--- bulletin ---|
    |-------------|---- advertisement ----|--- bulletin ---|
    |-------------|---- advertisement ----|----------------|
    |-------------|-----------------------|----------------|

### react structure

    index.html --> index.js --> App.js --> RouteHome.js --> MyProfile/AdDisplayColumn/Bulletin

## features

### api paths

Defined in `.env.development` and `.env.production` in the root directory to manage APIs and constants used across the site.

### project-wise notification

An on-screen notification function using `context`. Usage scope is wrapped by `GeneralNotiProvider`, 
currently equivalent to everything inside `index.js`, aka the entire project.\
Refer to `common/GeneralNotiProvider.js`.

### user information

To provide info on the current user using `context`, useful for getting the user's NetID or name.\
Refer to `common/SiteInfoProvider.js`.

### MUI input components

Styled input components using `mui.com/material-ui/`. Customized with arrietty theme colors.
Individual styles may be overwritten with <style> props.\
Refer to `common/MUIComponents.js`.













