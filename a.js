const OneSignal = require("onesignal-node");
let client = new OneSignal.Client(
  "92b3379f-1e34-42d9-90b5-766b6fcaa3e3",
  "MmMzOGIzZTAtMDA0Yi00Y2U5LWJkNzUtNTcxMjE4YTQzNGNi"
);
let userID = "gjX2tc4HVecLiSgBXnxdTrP6mkx1";
const notification = {
  headings: {
    en: "InimicalPart",
  },
  contents: { en: "i am lonely" },
  small_icon: "aw_notification_icon",
  large_icon:
    "https://lh3.googleusercontent.com/a-/AOh14GiiPFvmon8K1bxsCLiWIGMnUFVFnGD6FbD4ocLB=s96-c",
  huawei_large_icon:
    "https://lh3.googleusercontent.com/a-/AOh14GiiPFvmon8K1bxsCLiWIGMnUFVFnGD6FbD4ocLB=s96-c",
  buttons: [
    { id: "open", text: "Open" },
    { id: "reply", text: "Reply" },
  ].reverse(),

  filters: [{ field: "tag", key: "userID", relation: "=", value: userID }],
};
while (!true) {}
var prompts = require("prompts");
const questions = [
  {
    type: "text",
    name: "file",
    message: "Which file do you want to use?",
    initial: "FILE commands.js",
  },
];
