var http = require('http')
var console = require('console')
var config = require('config')

module.exports.function = function getPlaces (sourcePoint) {
  var response = http.getUrl(config.get('WHEurlLugaresCercanos') + '?appToken='+ config.get('WHEtoken') + '&latitude=' +sourcePoint.point.latitude +'&longitude='+ sourcePoint.point.longitude +'&accuracy=1000&includePlacesWithoutAccessibility=1' , { format: 'json' });
  console.log(response)
  features2 = response.features
  console.log(features2)
  //features2 = features[0]
  //console.log(features2)
  return {
    sourcePoint: sourcePoint,
    features2 : features2
  } 
}
