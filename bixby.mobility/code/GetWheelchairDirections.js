var http = require('http')
var console = require('console')
var config = require('config')

module.exports.function = function getWheelchairDirections (sourcePoint, destinationPoint) {
  // La siguiente línea estaría bien si openroute estuviera implementado no solo para el centro de Madrid
  //var response = http.getUrl(config.get('urlOpenroute') + '?api_key='+ config.get('keyOpenroute') + '&start='+ sourcePoint.point.latitude+','+ sourcePoint.point.longitude+'&end='+ destinationPoint.point.latitude+','+ destinationPoint.point.longitude , { format: 'json' });
  
  // Funcionalidad de muestra desde el punto "Parque del Retiro": 40.415751, -3.688703 
  var response = http.getUrl(config.get('urlOpenroute') + '?api_key='+ config.get('keyOpenroute') + '&start=-3.68705,40.418332&end='+ destinationPoint.point.longitude +','+ destinationPoint.point.latitude , { format: 'json' });

  console.log(response);
  console.log(response.features);
  console.log(response.features[0].properties.segments[0].steps);
  steps = response.features[0].properties.segments[0].steps;
  console.log(response.features[0].properties.summary);
  summary = response.features[0].properties.summary;
  console.log(response.features[0].geometry);
  geometry = response.features[0].geometry.coordinates;
  console.log("OK " + geometry.length);
  newCoordinates = new Array(geometry.length);
  for(var i = 0; i < geometry.length; i++){
    newCoordinates[i] = {latitude:geometry[i][1],longitude:geometry[i][0]};
  }

  console.log(newCoordinates);
  return {
    sourcePoint: sourcePoint, 
    destinationPoint: destinationPoint,
    steps: steps,
    summary : summary,
    newCoordinates : newCoordinates
  }
}
