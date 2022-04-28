
// s = "Apr 5, 2022, 12:00:00 PM";
export const translateTimeAgo = (s) => {
  let diff = (Date.now() - Date.parse(s)) / 1000 / 60;  // difference in minutes
  // if (diff < 15) {
  //   return 'just now';
  // } else if (diff < 60) {
  //   return '1 hour ago';
  // } else if (diff/60 < 12) {
  //   return '12h ago';
  // } else if (diff/60 < 24) {
  //   return '1 day ago';
  // } else if (diff/60/24 < 7) {
  //   return '1 week ago';
  // } else {
  //   return 'too long ago';
  // }
  if (diff/60/24/7 > 1) {
    let temp = Math.floor(diff/60/24/7);
    return `${temp} week${temp>1?'s':''} ago`;
  } else if (diff/60/24 > 1) {
    let temp = Math.floor(diff/60/24);
    return `${temp} day${temp>1?'s':''} ago`;
  } else if (diff/60 > 1) {
    let temp = Math.floor(diff/60);
    return `${temp} hour${temp>1?'s':''} ago`;
  } else if (diff > 15) {
    return `30min ago`;
  } else {
    return `just now`;
  }
};

export function dataFetch(url, metaData, successHandler, errorHandler) {
  fetch(url, metaData)
    .then(
      (res) => {
        if (res.ok){
          return res.json();
        }
        throw res;
      }
    )
    .then(
      (data) => {
        if (data.hasOwnProperty("responseStatus")) {
          if (data["responseStatus"]["status"]==="Ok") {
            successHandler(data["body"]);
          } else {
            if (errorHandler===null) {
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
  alert(response["responseStatus"]["message"]);
}


