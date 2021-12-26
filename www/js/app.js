function OneSignalInit() {
  // Uncomment to set OneSignal device logging to VERBOSE
  // window.plugins.OneSignal.setLogLevel(6, 0);

  // NOTE: Update the setAppId value below with your OneSignal AppId.
  window.plugins.OneSignal.setAppId("92b3379f-1e34-42d9-90b5-766b6fcaa3e3");
  window.plugins.OneSignal.setNotificationOpenedHandler(function (jsonData) {
    console.log("notificationOpenedCallback: " + JSON.stringify(jsonData));
  });

  // iOS - Prompts the user for notification permissions.
  //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
  window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function (
    accepted
  ) {
    console.log("User accepted notifications: " + accepted);
  });
}
