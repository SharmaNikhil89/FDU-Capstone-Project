const csv = require("csvtojson");
const path = require("path");
const _ = require("underscore");

//nearest pharmacies function.
module.exports.getNearbyPharmacies = function(latitude1, lonitude1, callback) {
  //data from csv.
  csv()
    .fromFile(path.join(__dirname, "../data/pharmacies.csv"))
    .then(jsonObj => {
      try {
        //distance from user to pharmacies.
        //append distance to csv object.
        jsonObj.forEach(obj => {
          obj["distance"] = parseFloat(
            distance(
              latitude1,
              lonitude1,
              parseFloat(obj.latitude),
              parseFloat(obj.longitude)
            )
          );
          obj["address"] =
            obj["address"] +
            ", " +
            obj["city"] +
            ", " +
            obj["state"] +
            ", " +
            obj["zip"] +
            ".";
        });
        //sorting distance of pharmacies.
        //fetching info and calling callback function.
        callback(
          null,
          _.map(_.sortBy(jsonObj, "distance"), o =>
            _.pick(o, ["name", "address", "distance"])
          )
        );
      } catch (e) {
        callback(
          "Something went wrong. (1)",
          null
        );
      }
    });
};

//calculate distance between 2 co-ordinates.
var distance = function(userlatitude, userlogitude, pharmacylatitude, pharmacylogitude) {
  //if both latitudes and longitudes are same then return 0.
  if (userlatitude == pharmacylatitude && userlogitude == pharmacylogitude) {
    return 0;
  } else {
    //degrees to radius.
    var radiusOfuserLatitude = (Math.PI * userlatitude) / 180;
    var radiusOpharmacyLatitude = (Math.PI * pharmacylatitude) / 180;
    var theta = userlogitude - pharmacylogitude;
    var radtheta = (Math.PI * theta) / 180;
    //calculating distance.
    var dist =
      Math.sin(radiusOfuserLatitude) * Math.sin(radiusOpharmacyLatitude) +
      Math.cos(radiusOfuserLatitude) *
        Math.cos(radiusOpharmacyLatitude) *
        Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    //convert radius to degree.
    dist = (dist * 180) / Math.PI;
    //convert distance to kilometers.
    dist = dist * 60 * 1.1515 * 1.60934;
    return dist.toFixed(2);
  }
};
