const FCM = require("fcm-node");
var serverKey = require("./privateKey.json");
var fcm = new FCM(serverKey);
// const driveService = require("./services/notify.servive");
const serviceFCM = {
  sendMessage: (token, title, body) => {
    var message = {
      to: token,
      // collapse_key: '...',
      notification: {
        title: title,
        body: body,
      },
      data: {
        //you can send only notification or only data(or include both)
        my_key: "my value",
        my_another_key: "my another value",
      },
    };

    fcm.send(message, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully sent with response: ", response);
        // driveService.createNotify(object);
        //   createMessage(title, body, status);
      }
    });
  },
};

module.exports = serviceFCM;
