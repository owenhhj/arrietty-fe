
// s = "Apr 5, 2022, 12:00:00 PM"; fixme really bad imp
export const translateTimeAgo = (s) => {
  let diff = (Date.now() - Date.parse(s)) / 1000 / 60;  // difference in minutes
  if (diff < 15) {
    return 'just now';
  } else if (diff < 60) {
    return '1 hour ago';
  } else if (diff/60 < 12) {
    return '12h ago';
  } else if (diff/60 < 24) {
    return '1 day ago';
  } else if (diff/60/24 < 7) {
    return '1 week ago';
  } else {
    return 'too long ago';
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


