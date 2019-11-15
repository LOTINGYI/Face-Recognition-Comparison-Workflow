// var api_key = 'Vm3FSrUC8fb2E2UGwo-8ai76gaPbQtec'
// var api_secret = 'G1Hv3f54W_HA6J3T8GHWOVZQdphciw5s'

function detectImage() {
    var uriBase = 'https://api-us.faceplusplus.com/facepp/v3/detect'
    var facetoken
    var apiKey = document.getElementById("apiKey").value;
    var apiSecret = document.getElementById("apiSecret").value
    var imgUrl = document.getElementById("imgUrl").value
    var file = document.getElementById("imagefile").value

    console.log(imgUrl)
    $.ajax({
        url: uriBase,
        type: "POST",
        data: { 'api_key': apiKey, 'api_secret': apiSecret, 'image_url': imgUrl },

    })
        .done(function (data) {
            alert("success")
            console.log(data.faces[0].face_token)
            facetoken = data.faces[0].face_token
            $("#facetokeninformation").append(`<img id="faceimage" src=${imgUrl} width="400"/><p id="facetoken">${facetoken}</p> `)
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



function createFaceset() {
    var uriBase = 'https://api-us.faceplusplus.com/facepp/v3/faceset/create'
    var apiKey = document.getElementById("apiKey").value;
    var apiSecret = document.getElementById("apiSecret").value
    var outerId = document.getElementById("facesetid").value
    var facetokens = document.getElementById("facetokens").value

    
    // console.log(JSON.stringify({ 'api_key': apiKey, 'api_secret': apiSecret, 'outer_id': outerId, 'face_tokens': facetokens }))

    $.ajax({
        url: uriBase,
        type: "POST",
        data: { 'api_key': apiKey, 'api_secret': apiSecret, 'outer_id': outerId, 'face_tokens': facetokens },

    })
        .done(function (data) {
            alert("success")
            console.log(data)
            $("#facesettokeninformation").append(`<h2>${outerId}: ${data.faceset_token}</h2>`)
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


function addFace() {
    var uriBase = 'https://api-us.faceplusplus.com/facepp/v3/faceset/addface'
    var apiKey = document.getElementById("apiKey").value;
    var apiSecret = document.getElementById("apiSecret").value
    var outerId = document.getElementById("addfacesetid").value
    var facetokens = document.getElementById("addfacetokens").value

    $.ajax({
        url: uriBase,
        type: "POST",
        data: { 'api_key': apiKey, 'api_secret': apiSecret, 'outer_id': outerId, 'face_tokens': facetokens },

    })
        .done(function (data) {
            alert("success")
            console.log(data)
            // $("#facesettokeninformation").append(`<h2>${outerId}: ${data.faceset_token}</h2>`)
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


function search() {
    var uriBase = 'https://api-us.faceplusplus.com/facepp/v3/search'
    var apiKey = document.getElementById("apiKey").value;
    var apiSecret = document.getElementById("apiSecret").value
    var token = document.getElementById("token").value
    var outer_id = document.getElementById("outerId").value
    var face_image = document.getElementById("faceimage")
    
    console.log(face_image)
    $.ajax({
        url: uriBase,
        type: "POST",
        data: { 'api_key': apiKey, 'api_secret': apiSecret, 'face_token': token, 'outer_id': outer_id },

    })
        .done(function (data) {
            alert("success")
            console.log(data.results[0].confidence)
            $("#result").append(`<h1>${data.results[0].confidence}</h1>`)
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
