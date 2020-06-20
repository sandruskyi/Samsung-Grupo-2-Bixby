var http = require('http')
var console = require('console')
var config = require('config')

module.exports.function = function getWheelchairDirections (sourcePoint, destinationPoint) {
  // La siguiente línea estaría bien si openroute estuviera implementado no solo para el centro de Madrid
  //var response = http.getUrl(config.get('urlOpenroute') + '?api_key='+ config.get('keyOpenroute') + '&start='+ sourcePoint.point.latitude+','+ sourcePoint.point.longitude+'&end='+ destinationPoint.point.latitude+','+ destinationPoint.point.longitude , { format: 'json' });
  
  // Funcionalidad de muestra desde el punto "Parque del Retiro": 40.415751, -3.688703 
  var response = http.getUrl(config.get('urlOpenroute') + '?api_key='+ config.get('keyOpenroute') + '&start=-3.68705,40.418332&end='+ destinationPoint.point.longitude +','+ destinationPoint.point.latitude , { format: 'json' });
  retiroPoint = {latitude:40.418332, longitude:-3.68705};

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
  for(var i=0; i < steps.length; i++){
    //if(steps[i].instruction == 'Head north'){
    //  steps[i].instruction = 'Ve hacia el Norte';
    //}else if(steps[i].instruction == 'Head north'){
    
    //REGEX: 
    steps[i].instruction = steps[i].instruction.replace(/Head north/gi, 'Dirígete hacia el Norte');
    steps[i].instruction = steps[i].instruction.replace(/Head south/gi, 'Dirígete hacia el Sur');
    steps[i].instruction = steps[i].instruction.replace(/Head east/gi, 'Dirígete hacia el Este');
    steps[i].instruction = steps[i].instruction.replace(/Head west/gi, 'Dirígete hacia el Oeste');
    steps[i].instruction = steps[i].instruction.replace(/Turn left onto/gi, 'Gire a la izquierda en');
    steps[i].instruction = steps[i].instruction.replace(/Turn right onto/gi, 'Gire a la derecha en');
    steps[i].instruction = steps[i].instruction.replace(/Turn left/gi, 'Gire a la izquierda');
    steps[i].instruction = steps[i].instruction.replace(/Turn right/gi, 'Gire a la derecha');
    steps[i].instruction = steps[i].instruction.replace(/Turn slight left/gi, 'Gire levemente a la izquierda');
    steps[i].instruction = steps[i].instruction.replace(/Turn slight right/gi, 'Gire levemente a la derecha');
    steps[i].instruction = steps[i].instruction.replace(/Turn sharp left/gi, 'Gire bruscamente a la izquierda');
    steps[i].instruction = steps[i].instruction.replace(/Turn sharp right/gi, 'Gire bruscamente a la derecha');
    steps[i].instruction = steps[i].instruction.replace(/Keep left/gi, 'Manténgase a la izquierda');
    steps[i].instruction = steps[i].instruction.replace(/Keep right/gi, 'Manténgase a la derecha');
    steps[i].instruction = steps[i].instruction.replace(/Continue straight onto/gi, 'Continúa recto hacia');
    steps[i].instruction = steps[i].instruction.replace(/Arrive at your destination, on the left/gi, 'Llegue a su destino, a la izquierda');
    steps[i].instruction = steps[i].instruction.replace(/Arrive at your destination, on the right/gi, 'Llegue a su destino, a la derecha');
    steps[i].instruction = steps[i].instruction.replace(/Arrive at your destination/gi, 'Llegue a su destino');
    steps[i].instruction = steps[i].instruction.replace(/onto/gi, 'en');
  }

  console.log(newCoordinates);
  return {
    sourcePoint: sourcePoint, 
    retiroPoint : retiroPoint,
    destinationPoint: destinationPoint,
    steps: steps,
    summary : summary,
    newCoordinates : newCoordinates
  }
}
