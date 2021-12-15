(async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBXksQoBsWZkS8Dw_P90mb9BP-wt9XaMrg", //<- lemfao
    authDomain: "authworria.firebaseapp.com",
    databaseURL:
      "https://authworria-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "authworria",
    storageBucket: "authworria.appspot.com",
    messagingSenderId: "635623599897",
    appId: "1:635623599897:web:0ee18f2824aa3b764e5f88",
    measurementId: "G-P84R1SCWJB",
  };
  let app = null;

  if (!firebase.apps.length) {
    app = await firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }
  const inviteCode = escapeHtml(
    new URLSearchParams(window.location.search).get("code")
  );
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      let socket = io("https://ws.inimicalpart.com:4242");
      socket.on("connect", () => {
        socket.emit("confirmIdent", {
          token: firebase.auth().currentUser.xa,
        });
      });
      socket.on("confirmIdentRes", (a) => {
        // if error, show error and quit
        if (a.err) return alert(a.err);
        // server accepted our identification
        // now we can ask for the server details
        socket.emit("getCodeInfo", { code: inviteCode });
      });
      let serverID;

      socket.on("getCodeInfoRes", (a) => {
        let server = a.serverData;

        const name = server.name;
        serverID = server.id;
        const description = server.description;
        const memberCount = server.memberCount;
        const serverPicture = server.serverPicture;

        // const serverBanner = server.serverBanner;
        console.log(name, description, memberCount, serverID, serverPicture);
        document.getElementsByName("name")[0].innerText = name;
        // document.getElementsByName("description")[0].value = description;
        document.getElementsByName("memberCount")[0].innerText = memberCount;
        // document.getElementsByName("serverId")[0].value = serverId;
        document.getElementsByName("serverImage")[0].src = serverPicture;
        // document.getElementsByName("serverBanner")[0].src = serverBanner;
        if (!server.limitHit) {
          document.getElementsByName("confirm")[0].removeAttribute("disabled");
          //on click
          document.getElementsByName("confirm")[0].onclick = async () => {
            //send request to server
            socket.emit("joinServer", {
              token: firebase.auth().currentUser.xa,
              code: inviteCode,
            });
          };
        }
      });
      socket.on("joinServerRes", (a) => {
        if (a.err !== "Already in server") alert(a.err);
        //server accepted our request
        //now we can join the server
        window.location.href =
          window.location.protocol +
          "//" +
          window.location.host +
          `/app?server=${serverID}`;
      });
    }
  });
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
