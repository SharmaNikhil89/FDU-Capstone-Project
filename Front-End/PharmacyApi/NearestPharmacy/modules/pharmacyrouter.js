const express = require("express");
const router = express.Router();
const pharmacy = require("../models/pharmacy");

//get nearest pharmacies.
router.get("/getNearbyPharmacies/:latitude/:logitude", (req, res, next) => {
  //input lat and lon for api.
  var userlatitude = req.params.latitude;
  var userlogitude = req.params.logitude;
  try {
    if (!validateInputs(userlatitude, userlogitude).valid)
      res
        .status(400)
        .json({ success: false, msg: validateInputs(userlatitude, userlogitude).msg });
    else {
      //send input to model to get result.
      pharmacy.getNearbyPharmacies(userlatitude, userlogitude, (err, result) => {
        if (err)
          res.status(500).json({
            success: false,
            msg:
              "Something went wrong. (2)"
          });
        else
          res.status(200).json({
            success: true,
            msg: "Total records count : " + result.length,
            data: result
          });
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      msg: "Something went wrong. (3)"
    });
  }
});

//validate input.
var validateInputs = function(userlatitude, userlogitude) {
  if (userlatitude === "" && userlogitude === "")
    return { valid: false, msg: "Latitude and Longitude should not be empty." };
  if (isNaN(userlatitude) || isNaN(userlogitude))
    return {
      valid: false,
      msg: "Latitude and Longitude should be numbers."
    };
  if (!(userlatitude > -90 && userlatitude < 90))
    return { valid: false, msg: "Please enter a valid latitude." };
  if (!(userlogitude > -180 && userlogitude < 180))
    return { valid: false, msg: "Please enter a valid longitude." };
  return { valid: true, msg: "Valid data." };
};

module.exports = router;
