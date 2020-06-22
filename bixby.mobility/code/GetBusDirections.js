var http = require('http')
var console = require('console')
var config = require('config')
module.exports.function = function getBusDirections (sourcePoint, destinationPoint) {
  // INICIAR SESIÓN EN LA API DE EMT MADRID PARA CONSEGUIR EL TOKEN 
  var settings = {
    "url": config.get('EMTurlLogin'),
    "method": "GET",
    "timeout": 0,
    "headers": {
      "email": config.get('EMTemail'),
      "password": config.get('EMTpassword'),
      "X-ClientId": config.get('EMTx-clientid'),
      "passKey": config.get('EMTpasskey')
    },
  };
  var response = http.getUrl(config.get('EMTurlLogin'), settings);
  console.log(response);
  response = JSON.parse(response)
  console.log(response.description);
  //var re = /Token (\S+) extend into control-cache/y;
  //var match = re.exec(response.description);
  //token = match[1];
  responseCad = response.description;
  cadena = responseCad.split(" ");
  console.log(cadena);
  token = cadena[1]
  console.log(token);

  // CONSEGUIR EL TRAVELPLAN:

  var settingsTravelplan = {
    "url": config.get('EMTtravelplan'),
    "method": "POST",
    "headers": {
      "accessToken": "952d3a27-7d57-4374-a5f2-a5b843b3e0e1",
    },
    "data" : {
      "routeType":"P",
      "coordinateXFrom":-3.65809,
      "coordinateYFrom":40.416234,
      "coordinateXTo":-3.70577,
      "coordinateYTo":40.41803,
      "originName":"MyPosicion",
      "destinationName":"MyDestino",
      "culture":"ES",
      "itinerary":"true",
      "allowBus":"true",
      "allowBike":"false",
      "Content-Type" : "application/json",
    },
  };
  var responseTravelplan = http.postUrl(config.get('EMTtravelplan'), settingsTravelplan);
  console.log(responseTravelplan)






  return {
    sourcePoint: sourcePoint, 
    destinationPoint: destinationPoint
  }
}
