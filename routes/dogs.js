const express = require("express");
const router = express.Router();
const Dog = require("../models/dog");
const middleware = require("../middleware/index");

// Load 'image-downloader' node package to download image from url
const download = require("image-downloader");
// Load several 'tfjs' node packages to detect image type
const tf = require("@tensorflow/tfjs");
const mobilenet = require("@tensorflow-models/mobilenet");
// require('@tensorflow/tfjs-node-gpu');	// uncomment this if you have nvidia gpu
require("@tensorflow/tfjs-node"); // comment this if you have nvidia gpu

const fs = require("fs");
const jpeg = require("jpeg-js");

const doginfo = require('../doginfo.js')

const dog_array = doginfo.dog_array;

//INDEX - show all dogs
router.get("/", (req, res) => {
  // // Get all dogs from DB
  Dog.find({}, function(err, allDogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("dogs/index", { allDogs: allDogs });
    }
  });
});

//new (get)-  add dog pic form
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("dogs/new");
});

//post the new pic
router.post("/", middleware.isLoggedIn, (req, res) => {
  //get data from form and add to campground array
  const title = req.body.title;
  const image = req.body.image;
  const desc = req.body.descriptionForm;
  const author = {
  	id: req.user._id,
  	username: req.user.username
  };
  var newDog = { title: title , image: image, description: desc, author: author};
  // Download to a directory and save with the original filename
  const options = {
    url: image,
    dest: "dog_images" // Save to /path/to/dest/image.jpg
  };

  download
    .image(options)
    .then(({ filename, image }) => {
      console.log("Saved to", filename); // Saved to /path/to/dest/image.jpg
      //start of changing image to tensor
      const NUMBER_OF_CHANNELS = 3;
      //cannot change all types into numbers directly
      //convert all type to image into bitmap with readImage
      const readImage = path => {
        const buf = fs.readFileSync(path);
        const pixels = jpeg.decode(buf, true);
        return pixels;
      };

      //from bitmap type
      //change every pixels of the image into numbers
      const imageByteArray = (image, numChannels) => {
        const pixels = image.data;
        const numPixels = image.width * image.height;
        const values = new Int32Array(numPixels * numChannels);

        for (let i = 0; i < numPixels; i++) {
          for (let channel = 0; channel < numChannels; ++channel) {
            values[i * numChannels + channel] = pixels[i * 4 + channel];
          }
        }
        return values;
      };
      //combines image height, image width and image numbers(changed by imageByteArray)
      const imageToInput = (image, numChannels) => {
        const values = imageByteArray(image, numChannels);
        const outShape = [image.height, image.width, numChannels];
        const input = tf.tensor3d(values, outShape, "int32");
        return input;
      };

      const imageok = readImage(filename);
      const input = imageToInput(imageok, NUMBER_OF_CHANNELS);
        //end of changing image to tensor
      mobilenet.load().then(model => {
        // classify the image.
        //input is tensor3d image , output is prediction (results)
        model.classify(input).then(predictions => {
          //from prediction, get the dog name
          const images_name = predictions[0].className;
          // .some() check if any of the elements in the array pass a test (provided as function)
          var status = dog_array.some(myfunction);
          function myfunction(value, index, array) {
            return value == images_name;
          }
          // var status = images_name.includes("dogdog");
          if (status == true) {
            //create a new dog and save to DB
            Dog.create(newDog, (err,newlyCreated) => {
              if (err){
                console.log(err);
              } else {
                Dog.find({}, function(err, allDogs) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.render("dogs/index", { allDogs: allDogs, success: "This image is a dog." });
                  }
                });
              }
            });

          } else {
            //redirect to dogs
            res.render("dogs/new", { error: "This image is not a dog." });
          }
        });
      });
    })
    .catch(err => console.error(err));
});
module.exports = router;
