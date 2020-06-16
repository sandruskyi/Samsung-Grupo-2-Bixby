var http = require('http')
var console = require('console')
var config = require('config')

module.exports.function = function getWheelchairDirections (sourcePoint, destinationPoint) {
  // La siguiente línea estaría bien si openroute estuviera implementado no solo para el centro de Madrid
  //var response = http.getUrl(config.get('urlOpenroute') + '?api_key='+ config.get('keyOpenroute') + '&start='+ sourcePoint.point.latitude+','+ sourcePoint.point.longitude+'&end='+ destinationPoint.point.latitude+','+ destinationPoint.point.longitude , { format: 'json' });
  
  // Funcionalidad de muestra desde el punto "Parque del Retiro": 40.415751, -3.688703 
  var response = http.getUrl(config.get('urlOpenroute') + '?api_key='+ config.get('keyOpenroute') + '&start=-3.68705,40.418332&end='+ destinationPoint.point.longitude +','+ destinationPoint.point.latitude , { format: 'json' });

  console.log(response);
  return {
    sourcePoint: sourcePoint, 
    destinationPoint: destinationPoint
  };
}
