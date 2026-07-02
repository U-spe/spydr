const cloaks = {

  spydr: {
    title: "spydr",
    icon: "/assets/images/favicon.png"
  },

  google: {
    title: "Google",
    icon: "https://www.google.com/favicon.ico"
  },

  classroom: {
    title: "Home - Classroom",
    icon: "https://ssl.gstatic.com/classroom/favicon.png"
  },

  securly: {
    title: "Create Pass - Securly Pass",
    icon: "https://pass.securly.com/favicon.ico"
  },

  wayground: {
    title: "Playing a Game - Wayground",
    icon: "https://wayground.com/favicon.ico"
  },

  studysync: {
    title: "StudySync",
    icon: "https://www.studysync.com/static/favicon.ico"
  },

  classlink: {
    title: "My Apps - Classlink",
    icon: "https://lh3.googleusercontent.com/eZN3KtQ96nLtnBk6vNJWNe8lAGQ_v4fWGTH7URUqzMyQ9BiDuxqpt1uSkIU-OaRhxw"
  }

};


/* APPLY CLOAK */
(function () {

  const saved = localStorage.getItem("spydr_cloak"); // FIXED NAME

  if (saved && cloaks[saved]) {

    const cloak = cloaks[saved];

    // TITLE
    document.title = cloak.title;

    // FAVICON
    let favicon = document.querySelector("link[rel='icon']");

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }

    favicon.href = cloak.icon;
  }

})();
