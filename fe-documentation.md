
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

### 1 `src/components/myProfile/`

#### `MyProfile.js`

The major component serving either `MyProfileDisplay` or `MyProfileEdit` at a time.

#### `MyProfileDisplay.js`

To display my profile, also containing the button to create a new ad.

#### `MyProfileEdit.js`

To edit (username and class year) or (avatar picture), posted separately to the back end.

### 2 `src/components/adUploadForm/`

#### `AdUploadForm.js`

The pinnacle of the WET _(Write Everything Twice)_ principle in this project, as opposed to DRY _(Don't Repeat Yourself)_.\
Arrietty supports two types of advertisements, `textbook` or `other`. The latter can be categorized into sub tags such as `furniture`, `electronics`, etc.\
A button is placed in the upload window to switch ad type. Every time this button is pressed, `React` forces the component to re-mount, leading to unexpected data management issues.
To cope with this, the otherwise only upload window is duplicated into a `AdUploadFormMUITextbook.js` and a `AdUploadFormMUIOther.js`. 
When the button is pressed, the whole window is switched between these two.\
The form variable is defined outside the React component to avoid interference between `handleInputChange`, `handleValidate` and `handleResetVali`, when `React` forces the component to re-mount.

#### `AdUploadFormDragDrop.js`

Drag and drop component for managing the order of pictures when creating a new advertisement, using the `react-beautiful-dnd` library.
The order of the files in the form object when being submitted to the back end determines the order of the appearance when displayed to other users.

### 3 `src/components/adDisplay/`

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

### 4 `src/components/searchBar/`











### 5 `src/components/favorite/`

#### `FavoriteColumn.js`

The major component serving the entire section on the "favorite" page. 
This component directly calls `AdDisplayCard.js` to render the user's "marked" advertisements.

### 6 `src/components/myPosts/`

#### `MyPostsCanvas.js`

The major component serving the entire section on the "my posts" page.
A user can edit or delete advertisements uploaded before.

#### `MyPostsEditFormMUI.js`

Yet another WET implementation of the advertisement upload form.\
Only the images, price and comment are allowed to be edited.
For images, previous images are fetched and pushed into the drag-and-drop component for managing the ordering. 
After the edit, all pictures in the new version of the advertisement will be posted to the back end, overwriting the database, 
regardless of whether they are previous pictures or newly uploaded pictures.

### 7 `src/components/notification/`

#### `NotificationColumn.js`

The major component serving the entire section on the "notification" page.
A user can see, by whom and when, a specific advertisement was "tapped".

### 8 `src/components/admin/`

#### ``
















