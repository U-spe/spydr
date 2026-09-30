const express =
  require("express");

const path =
  require("path");


const app =
  express();


const PORT =
  process.env.PORT ||
  3000;


const ROOT =
  __dirname;


app.use(
  express.static(
    ROOT,
    {
      extensions: [
        "html"
      ]
    }
  )
);


app.get(
  "/",
  (req, res) => {

    res.sendFile(
      path.join(
        ROOT,
        "index.html"
      )
    );

  }
);


app.use(
  (req, res) => {

    res
      .status(404)
      .send(
        "404 - Page not found"
      );

  }
);


app.listen(
  PORT,
  "127.0.0.1",
  () => {

    console.log("");
    console.log(
      "============================"
    );

    console.log(
      "       SPYDR IS ONLINE"
    );

    console.log(
      "============================"
    );

    console.log("");

    console.log(
      `Home: http://localhost:${PORT}`
    );

    console.log(
      `YT Player: http://localhost:${PORT}/yt-player.html`
    );

    console.log("");

  }
);
