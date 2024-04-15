const csv = require("csvtojson");
const path = require("path");
const _ = require("underscore");

//nearest pharmacies function.
module.exports.getNearestPharmacy = function(lat1, lon1, callback) {
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
              lat1,
              lon1,
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
          "Something went wrong. Please contact system administrator.",
          null
        );
      }
    });
};

//calculate distance between 2 co-ordinates.
var distance = function(userlat, userlog, pharmacylat, pharmacylog) {
  //if both latitudes and longitudes are same then return 0.
  if (userlat == pharmacylat && userlog == pharmacylog) {
    return 0;
  } else {
    //degrees to radius.
    var radiusOfuserLat = (Math.PI * userlat) / 180;
    var radiusOpharmacyLat = (Math.PI * pharmacylat) / 180;
    var theta = userlog - pharmacylog;
    var radtheta = (Math.PI * theta) / 180;
    //calculating distance.
    var dist =
      Math.sin(radiusOfuserLat) * Math.sin(radiusOpharmacyLat) +
      Math.cos(radiusOfuserLat) *
        Math.cos(radiusOpharmacyLat) *
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
