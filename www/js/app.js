async function onDeviceReady() {
  let connectwhenBG = null;
  cordova.plugins.backgroundMode.enable();
  cordova.plugins.backgroundMode.overrideBackButton();
  cordova.plugins.backgroundMode.setDefaults({ silent: true });
  cordova.plugins.backgroundMode.setDefaults({
    title: "Background",
    text: "App is running in background",
  });
  cordova.plugins.PowerOptimization.IsIgnoringBatteryOptimizations().then(
    (result) => {
      if (result) {
        console.log("Battery optimizations are already set");
      } else {
        console.log("Requesting user to enable battery optimizations");
        console.log(
          window.localStorage.getItem("ignoreBatteryOptimizationsRequest")
        );
        if (
          window.localStorage.getItem("ignoreBatteryOptimizationsRequest") ===
            "false" ||
          !window.localStorage.getItem("ignoreBatteryOptimizationsRequest")
        ) {
          Swal.fire({
            title: "Battery optimizations are disabled",
            text: "Battery optimizations are required for the app to work properly, request to turn them on?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              cordova.plugins.PowerOptimization.RequestOptimizations().then(
                (result) => {
                  console.log("User has accepted battery optimizations");
                },
                (err) => {
                  console.log("User has denied battery optimizations");
                  window.localStorage.setItem(
                    "ignoreBatteryOptimizationsRequest",
                    true
                  );
                }
              );
            } else if (result.isDenied) {
              console.log(
                "User denied the request to enable battery optimizations"
              );
              //session storage set ignoreBatteryOptimizationsRequest to true
              window.localStorage.setItem(
                "ignoreBatteryOptimizationsRequest",
                true
              );
              console.log(
                window.localStorage.getItem("ignoreBatteryOptimizationsRequest")
              );
            }
          });
        }
      }
    },
    (err) => {
      console.error(err);
    }
  );
  cordova.plugins.backgroundMode.on("activate", function () {
    console.log("Background mode activated");
    connectwhenBG = setInterval(() => {
      if (socket?.disconnected) {
        console.log("connecting");
        socket.connect();
      }
    }, 60000);
  });
  cordova.plugins.backgroundMode.on("deactivate", function () {
    console.log("Background mode deactivated");
    clearInterval(connectwhenBG);
  });
  cordova.plugins.backgroundMode.on("failure", function () {
    console.log("Background mode failed");
  });
  document.addEventListener(
    "pause",
    function () {
      console.log("App Sleeping");
    },
    false
  );
  function setupNotifications() {
    cordova.plugins.firebase.messaging
      .requestPermission({ forceShow: true })
      .then(function () {
        console.log(
          "You'll get foreground notifications when a push message arrives"
        );
      });
  }
}
