var subscription = '';


function submit() {
    subscription = document.getElementById("inputSubscriptionKey").value
    $("#submitSuccess").html('<h2>submit success</h2>')
}
function createGroup() {
    var uriBase = 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0/persongroups'
    var groupName = document.getElementById("inputGroupName").value;
    var groupId = document.getElementById("inputGroupId").value

    var params = {
        personGroupId: `${groupId}`
    }

    $.ajax({
        url: uriBase + "/" + params.personGroupId,
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscription);
        },
        type: "PUT",
        // Request body
        data: `{"name":"${groupName}"}`,
    })
        .done(function (data) {
            $(".personGroupId").append(groupId)
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
}



var personIds = []
function createPersonGroup() {

    var uriBase = 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0/persongroups'

    var groupId = document.getElementById("inputPersonGroupId").value;
    var personName = document.getElementById("inputPersonName").value;

    var params = {
        personGroupId: `${groupId}`
    };



    $.ajax({
        url: `${uriBase}/${params.personGroupId}/persons`,
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscription);
        },
        type: "POST",
        // Request body
        data: `{"name":"${personName}"}`,
    })
        .done(function (data) {
            personIds.push(data)


            $.each(personIds, (i, n) => {
                str = `<li class="person">${personName}:${n.personId}</li>`
            })

            $(".personIds").append(str)
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
}


var persistedFaceIds = []
function addFace() {
    var uriBase = 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0/persongroups'
    var groupId = document.getElementById("PersonGroupId").value;
    var personId = document.getElementById("PersonId").value;
    var url = document.getElementById("url").value;

    var params = {
        personGroupId: `${groupId}`,
        personId: `${personId}`
    }

    var persons = getPersonData(groupId, personId)


    $.ajax({
        url: `${uriBase}/${params.personGroupId}/persons/${params.personId}/persistedFaces`,
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscription);
        },
        type: "POST",
        // Request body
        data: `{"url":"${url}"}`,
    })
        .done(function (data) {
            persons.map(person => {
                // console.log(person)
                persistedFaceIds.push(data)

                $.each(persistedFaceIds, (i, n) => {
                    str = `<li>${person.name}:${n.persistedFaceId}</li>`
                })
                $(".persistedFaceIds").append(str)
            })

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
}



function getPersonData(personGroupId, personId) {
    var uriBase = 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0/persongroups'

    var persons = []

    $.ajax({
        url: `${uriBase}/${personGroupId}/persons/${personId}`,
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscription);
        },
        type: "GET",

    })
        .done(function (data) {
            // console.log(data)
            persons.push(data)
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });

    return persons
}


function train() {
    var uriBase = 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0/persongroups'

    var groupId = document.getElementById("TrainPersonGroupId").value


    $.ajax({
        url: `${uriBase}/${groupId}/train`,
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscription);
        },
        type: "POST",

    })
        .done(function (data) {
            alert("success");
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });

}



var faceIds = []
var processImage = () => {
    var uriBase = "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false"
    };

    // Display the image.
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;

    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscription);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

        .done(function (data) {
            // Show formatted JSON on webpage.
            faceIds.push({ image: sourceImageUrl, faceId: data[0].faceId })
            $("#information").empty()
            faceIds.map(faceId => {
                $("#information").append(`<img src="${faceId.image}" id="informationimage"  width="400"/><p>${faceId.faceId}</p>`)
            })

            // console.log(faceIds)
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
        })

        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });

}




function identify() {
    var uriBase = 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0/identify'

    var identifyPersonGroupId = document.getElementById("identifyPersonGroupId").value.toString();
    // var information = document.getElementById("informationimage")
    // console.log(information)
    var faceIds = document.getElementById("bodyFaceId").value.split('\n')
    var faceIdsArray = []
    faceIds.map(faceId => {
        faceIdsArray.push(faceId)
    })


    $.ajax({
        url: uriBase,
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscription);
        },
        type: "POST",
        // Request body
        data: JSON.stringify({ "personGroupId": `${identifyPersonGroupId}`, "faceIds": faceIdsArray, "maxNumOfCandidatesReturned ": 5, "confidenceThreshold": 0.7 })
    })
        .done(function (data) {
            alert("success");
            $("#confidence").empty();
            data.map(result => {
                result.candidates.map(candidate => {
                    console.log(candidate)
                    $("#confidence").append(`<h1>${candidate.confidence}</h1>`);
                })
            })
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
}




// ,"maxNumOfCandidatesReturned":1,"confidenceThreshold":0.7

// '{"personGroupId":"'+identifyPersonGroupId+'",'+'"faceIds":"'+faceIdsArray+'"'+'}'