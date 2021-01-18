$(document).ready(function () {
  let gRows = 6;
  let gColumns = 6;
  let gGap = 20; // distance between tiles
  let gTileSize = 100;

  let myImages = [];
  let imageKeeper = {};
  let playPair = [];
  let busy = false;

  //statistic values
  let startTime = new Date();
  let noGuesses = 0;
  let noFails = 0;

  runGame();

  function runGame() {
    let gImages = [
      "Ant",
      "Dolphin",
      "Mite",
      "Aquarium",
      "Dragonfly",
      "Mosquito",
      "Badger",
      "Duck",
      "Octopus",
      "BatFace",
      "Elephant",
      "Panda",
      "Bear",
      "Falcon",
      "Pig",
      "Beaver",
      "Fish",
      "PigWithLipstick",
      "Bee",
      "FishFood",
      "Prawn",
      "Bird",
      "Fly",
      "Puffin",
      "Bug",
      "Frog",
      "Rabbit",
      "Bull",
      "Giraffe",
      "Rhinoceros",
      "Bumblebee",
      "Gorilla",
      "Seahorse",
      "Butterfly",
      "Grasshopper",
      "Shark",
      "Cat",
      "Hornet",
      "Sheep",
      "CatFootprint",
      "HornetHive",
      "Snail",
      "Caterpillar",
      "Horse",
      "Spider",
      "Chicken",
      "Hummingbird",
      "Starfish",
      "ClownFish",
      "Stork",
      "Corgi",
      "Insect",
      "Tentacles",
      "Cow",
      "Kangaroo",
      "Turtle",
      "Crab",
      "KiwiBird",
      "Unicorn",
      "Deer",
      "Ladybird",
      "Wasp",
      "Dinosaur",
      "Leopard",
      "Whale",
      "Dog",
      "Lion",
      "Wolf",
      "DogPark",
      "Llama",
    ];

    // Icons8Logo

    // initialize
    // build the board and place the tiles
    $("#board").css("grid-template-columns", `repeat(${gColumns}, 1fr`);
    // clening the board
    $("#board").html("");
    $("#playButton").on("click", function () {
      runGame();
    });
    $("#winMessage").css("visibility", "hidden");
    $("#board").css("gap", gGap + "px");
    $("#board").css("padding", 2 * gGap + "px");
    $("#board").css("width", gColumns * (gTileSize + gGap) + gGap + "px");
    $("#board").css("height", gRows * (gTileSize + gGap) + gGap + "px");

    // initialize global variables
    myImages = [];
    imageKeeper = {};
    playPair = [];
    busy = false;
    startTime = new Date();
    noClicks = 0;
    noGuesses = 0;
    noFails = 0;

    // build the tiles
    // background image
    // 2 images of each
    // no repeat the doubles

    for (let i = 0; i < (gRows * gColumns) / 2; i++) {
      let randomIndex = Math.floor(gImages.length * Math.random());
      myImages.push(gImages[randomIndex]);
      myImages.push(gImages[randomIndex]);
      gImages.splice(randomIndex, 1);
    }

    for (let i = 0; i < gRows; i++) {
      for (let j = 0; j < gColumns; j++) {
        let id = "tileId" + i + "_" + j;
        let randomIndex = Math.floor(Math.random() * myImages.length);
        $("#board").append(`<div class="tile" id="${id}"></div>`);
        $("#" + id).css(
          "background-image",
          `url(images/${myImages[randomIndex]}.png)`
        );

        // imageKeeper[id]={}
        // imageKeeper[id].image = myImages[randomIndex]
        // imageKeeper[id].shown = false
        // imageKeeper[id].paired = false

        imageKeeper[id] = {
          image: myImages[randomIndex],
          shown: false,
          paired: false,
        };

        $("#" + id).on("click", function () {
          if (busy) return;
          if (imageKeeper[id].paired) return;
          if (imageKeeper[id].shown) {
            hideTile(id);
          } else {
            showTile(id);
            // console.log("showing: "+id)
            playPair.push(id);
            if (playPair.length === 2) {
              if (
                imageKeeper[playPair[0]].image == imageKeeper[playPair[1]].image
              ) {
                imageKeeper[playPair[0]].paired = true;
                imageKeeper[playPair[1]].paired = true;
                playPair = [];
                noGuesses++;
              } else {
                busy = true;
                setTimeout(function () {
                  hideTile(playPair[0]);
                  hideTile(playPair[1]);
                  playPair = [];
                  busy = false;
                }, 1000);
                noFails++;
              }
            }
          }
          setTimeout(checkGame, 500);
        });
        myImages.splice(randomIndex, 1);
      }
    }
    $(".tile").css("width", gTileSize + "px");
    $(".tile").css("height", gTileSize + "px");
    $(".tile").css("background-size", gTileSize + "px");
    setTimeout(hideAllTiles, 2000);
    startTime = new Date();
    noGuesses = 0;
    noFails = 0;
  }

  function checkGame() {
    let allPaired = true;
    Object.keys(imageKeeper).forEach(function (key) {
      if (!imageKeeper[key].paired) {
        allPaired = false;
      }
    });
    if (allPaired) {
      // console.log("alerting")
      let time = new Date() - startTime;
      time = Math.floor(time / 1000)
      let sec = time % 60;
      let min = Math.floor(time / 60);
      let success = Math.floor((noGuesses * 100) / (noGuesses + noFails))
      $("#statistics").html(`Elapsed time: ${min}min ${sec}sec<br>
            Guesses: ${noGuesses}<br>
            Fails: ${noFails}<br>
            Success rate: ${success}%`);
      $("#winMessage").css("visibility", "visible");
    }
  }
  // hide the tiles

  function hideTile(id) {
    $("#" + id).css("background-image", "url(images/Icons8Logo.png)");
    imageKeeper[id].shown = false;
  }

  function hideAllTiles() {
    for (let i = 0; i < gRows; i++) {
      for (let j = 0; j < gColumns; j++) {
        let id = "tileId" + i + "_" + j;
        hideTile(id);
      }
    }
  }

  // reveal the tiles

  function showTile(id) {
    $("#" + id).css(
      "background-image",
      `url(images/${imageKeeper[id].image}.png)`
    );
    imageKeeper[id].shown = true;
  }
});
