
// backend+shanghaiOffset = UTC = frontend+browserOffset
// also used in MyPostsCard
export const convertTimeBackToFront = (s) => {
  let d = new Date();  // browser Date()
  let backendTimeInBrowser = Date.parse(s) / 1000 / 60 - 480 - d.getTimezoneOffset();
  return new Date(backendTimeInBrowser * 1000 * 60);
};

// s = 'Apr 5, 2022, 12:00:00 PM' = back-end timestamp in ChinaStandardTime = UTC+480
export const translateTimeAgo = (s) => {
  let diff = (Date.now() - convertTimeBackToFront(s).getTime()) / 1000 / 60;  // differences in minutes
  if (diff / 60 / 24 / 7 > 1) {
    let temp = Math.floor(diff / 60 / 24 / 7);
    return `${temp} week${temp > 1 ? 's' : ''} ago`;
  } else if (diff / 60 / 24 > 1) {
    let temp = Math.floor(diff / 60 / 24);
    return `${temp} day${temp > 1 ? 's' : ''} ago`;
  } else if (diff / 60 > 1) {
    let temp = Math.floor(diff / 60);
    return `${temp} hour${temp > 1 ? 's' : ''} ago`;
  } else if (diff > 15) {
    return `30min ago`;
  } else {
    return `just now`;
  }
};

export const fileSizeCheck = (files) => {
  if (!files || files.length < 1) {
    return true;
  }
  let ans = true;
  files.forEach(f => {
    if (f.size / 1024 / 1024 >= process.env.REACT_APP_DEFAULT_IMAGE_SIZE) {
      ans = false;
    }
  });
  return ans;
};

export const capFirstLetter = (s) => {
  if (s.length < 1) {
    return s;
  }
  return `${s.charAt(0).toUpperCase()}${s.slice(1,)}`;
};

export const getModalStyles = (cus = {}) => {
  return {
    content: {
      position: "absolute",
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      border: "none",
      background: "transparent",
      overflowY: 'hidden',
      ...cus
    }
  };
};

export function dataFetch(url, metaData, successHandler, errorHandler) {
  fetch(url, metaData)
    .then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      }
    )
    .then(
      (data) => {
        if (data.hasOwnProperty("responseStatus")) {
          if (data["responseStatus"]["status"] === "Ok") {
            successHandler(data["body"]);
          } else {
            if (errorHandler === null) {
              defaultErrorHandler(data);
            } else {
              errorHandler(data);
            }
          }
        } else {
          console.log("corrupted data format");
          throw data;
        }
      }
    );
}

function defaultErrorHandler(response) {
  // alert(response["responseStatus"]["message"]);
}


