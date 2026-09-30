export default async function handler(
  req,
  res
) {

  if (
    req.method !== "GET"
  ) {

    return res
      .status(405)
      .json({
        status: false,
        error:
          "Method not allowed."
      });

  }


  const videoId =
    String(
      req.query.vid || ""
    ).trim();


  if (!videoId) {

    return res
      .status(400)
      .json({
        status: false,
        error:
          "Missing video id."
      });

  }


  if (
    !/^[A-Za-z0-9_-]{11}$/.test(
      videoId
    )
  ) {

    return res
      .status(400)
      .json({
        status: false,
        error:
          "Invalid video id."
      });

  }


  const SERVER =
    process.env
      .YT_CONVERTER_SERVER;


  if (!SERVER) {

    return res
      .status(500)
      .json({
        status: false,
        error:
          "YT_CONVERTER_SERVER is not configured."
      });

  }


  try {

    const converterURL =
      `${SERVER.replace(/\/$/, "")}` +
      `/api?vid=${encodeURIComponent(
        videoId
      )}`;


    const response =
      await fetch(
        converterURL,
        {
          headers: {
            Accept:
              "application/json"
          }
        }
      );


    const text =
      await response.text();


    let payload;


    try {

      payload =
        JSON.parse(
          text
        );

    } catch {

      return res
        .status(502)
        .json({
          status: false,
          error:
            "Converter returned invalid JSON."
        });

    }


    return res
      .status(
        response.status
      )
      .json(
        payload
      );

  } catch (error) {

    console.error(
      "YT converter error:",
      error
    );


    return res
      .status(502)
      .json({
        status: false,
        error:
          "Converter server is unavailable."
      });

  }

}
