

export function dataFetch(url, metaData, successHandler, errorHandler){
    fetch(url, metaData)
        .then(
            response=>{
                if (response.ok){
                    return response.json();
                }
                throw response;
            }
        )
        .then(
            data=>{
                if(data.hasOwnProperty("responseStatus")){
                    if(data["responseStatus"]["status"]==="Ok"){
                        successHandler(data["body"]);
                    }
                    else{
                        if(errorHandler===null){
                            defaultErrorHandler(data);
                        }
                        else{
                            errorHandler(data);
                        }
                    }
                }
                else{
                    console.log("corrupted data format");
                    throw data;
                }

            }
        );
}


function defaultErrorHandler(response){
    alert(response["responseStatus"]["message"]);
}


