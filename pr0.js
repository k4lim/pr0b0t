var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
module.exports = {
  cutId: function(message) {
    // Cut input so we only get the id
    var cut = message.match(/\d+$/);
    var id = cut[0];
    return id;
  },

  postObject: function(id) {
    // Get info from api
    var requestGeneral = new XMLHttpRequest();
    var urlGeneral = "https://pr0gramm.com/api/items/get?id=";
    requestGeneral.open("GET", urlGeneral+id+"&flags=7", false);
    requestGeneral.send(null);

    var general = JSON.parse(requestGeneral.responseText);
    var up = general["items"]["0"]["up"];
    var down = general["items"]["0"]["down"];
    var image = general["items"]["0"]["image"];
    var flags = general["items"]["0"]["flags"];
    var user = general["items"]["0"]["user"];

    var requestDetail = new XMLHttpRequest();
    var urlDetail= "https://pr0gramm.com/api/items/info?itemId=";
    requestDetail.open("GET", urlDetail+id+"&flags=7", false);
    requestDetail.send(null);

    var detail = JSON.parse(requestDetail.responseText);
//    console.log(detail["tags"][0]["confidence"]);
    var tags = [];


    for (var item in detail["tags"]) {
      if (detail.hasOwnProperty(item)) {
        console.log(detail[item]);
      }
    }

    console.log(tags);

    var post = {
      id: id,
      up: up,
      down: down,
      image: image,
      flags: flags,
      user: user,
      /*tags: {
        first: first,
        second: second,
        third: third
      }*/
    }
    return post;
  }};

