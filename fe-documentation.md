
## arrietty-fe

Haojia He (Owen), [hh1951](mailto:hh1951@nyu.edu), NYUSH2022\
[Github](https://github.com/juanjuanjks), [GithubEmail](mailto:juanjuanjks@163.com)

## installation & build

[Webstorm by Jetbrains](https://www.jetbrains.com/webstorm/) is recommended.

`npm install` --> install all dependencies

`npm start` --> start interactive local server using environment variables in `.env.development`

`npm run build` --> build the project using environment variables in `.env.production`

## structures

### 1 repo structure

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
        App.js                                   // main application
        index.js                                 // main application wrapper, serving React.Context
    .env.development                             // env variables for `npm start`
    .env.production                              // env variables for `npm run build`

### 2 sample html structure on the route `/home`

    ||---------------------- navbar ----------------------||
    ========================================================
    |-- profile --|------ searchbar ------|--- bulletin ---|
    |-- profile --|---- advertisement ----|--- bulletin ---|
    |-------------|---- advertisement ----|--- bulletin ---|
    |-------------|---- advertisement ----|----------------|
    |-------------|-----------------------|----------------|

### 3 react structure

`index.html` --> `index.js` --> `App.js` --> `RouteHome.js` --> `MyProfile.js`+`AdDisplayColumn.js`+`Bulletin.js`

## key features

### 1 api paths

Defined in `.env.development` and `.env.production` in the root directory to manage APIs and constants used across the site.

### 2 project-wise notification

An on-screen notification function using `context`. Usage scope is wrapped by `GeneralNotiProvider`, currently everything inside `index.js`, aka the entire project.\
Refer to `common/GeneralNotiProvider.js`.

### 3 user information

To provide info on the current user using `context`, useful for getting the user's NetID or name, wrapped by `SiteInfoProvider`.\
Refer to `common/SiteInfoProvider.js`.

### 4 MUI input components

Styled input components using `mui.com/material-ui/`. Customized with arrietty theme colors, `#57068C` & `#36C0C9`. Individual styles may be overwritten with `style` props.\
Refer to `common/MUIComponents.js`.

## documentation for sub directories

### 1 `src/components/adDisplay/`

#### `AdDisplayColumn.js`

The major component serving the entire central column on the homepage, containing the search bar and the search results.\
User's click on the search button calls the component to submit a search query with `pageNum` as 0. 
One search will return at most 10 results. When a user scrolls to the bottom of the page, the component automatically re-submits the previous search query with `pageNum` incremented to 1, 
so that results 11~20 are returned.

#### `AdDisplayCard.js`

The component for each advertisement in the search result.\
HTML markdown inside `.col-3-to-unlock-container` contains the info of the owner of this ad. A user can only see the owner of an ad iff "tapped" it.
Whether an ad has been tapped by myself <--> Whether back-end response contains the field `userNetId`:
```javascript
const [tapped, setTapped] = useState(!!adData.userNetId);
```
If tapped, the owner's info is displayed.

#### `AdListingDetailCard.js`

Clicking on an ad brings up a hovering window using `Modal`, displaying ad info with all pictures of it.

















