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
        error:
          "Method not allowed."
      });

  }


  const query =
    String(
      req.query.q || ""
    ).trim();


  if (!query) {

    return res
      .status(400)
      .json({
        error:
          "Missing search query."
      });

  }


  const API_KEY =
    process.env
      .YOUTUBE_API_KEY;


  if (!API_KEY) {

    return res
      .status(500)
      .json({
        error:
          "YOUTUBE_API_KEY is not configured."
      });

  }


  try {

    const url =
      new URL(
        "https://www.googleapis.com/youtube/v3/search"
      );


    url.searchParams.set(
      "key",
      API_KEY
    );


    url.searchParams.set(
      "part",
      "snippet"
    );


    url.searchParams.set(
      "type",
      "video"
    );


    url.searchParams.set(
      "maxResults",
      "20"
    );


    url.searchParams.set(
      "safeSearch",
      "moderate"
    );


    url.searchParams.set(
      "q",
      query
    );


    const response =
      await fetch(
        url
      );


    const payload =
      await response.json();


    if (!response.ok) {

      console.error(
        "YouTube API error:",
        payload
      );


      return res
        .status(
          response.status
        )
        .json({
          error:
            payload?.error?.message ||
            "YouTube search failed."
        });

    }


    const results =
      (payload.items || [])
        .map(
          (item) => {

            const snippet =
              item.snippet || {};


            return {

              id:
                item?.id?.videoId ||
                "",

              title:
                decodeEntities(
                  snippet.title ||
                  ""
                ),

              description:
                decodeEntities(
                  snippet.description ||
                  ""
                ),

              channel:
                decodeEntities(
                  snippet.channelTitle ||
                  ""
                ),

              publishedAt:
                snippet.publishedAt ||
                "",

              thumbnail:
                snippet?.thumbnails?.high?.url ||
                snippet?.thumbnails?.medium?.url ||
                snippet?.thumbnails?.default?.url ||
                ""

            };

          }
        )
        .filter(
          (video) =>
            video.id
        );


    return res
      .status(200)
      .json({
        query,
        results
      });

  } catch (error) {

    console.error(
      "YouTube search error:",
      error
    );


    return res
      .status(500)
      .json({
        error:
          "Could not reach the YouTube Data API."
      });

  }

}


function decodeEntities(
  value = ""
) {

  return String(
    value
  )
    .replaceAll(
      "&amp;",
      "&"
    )
    .replaceAll(
      "&quot;",
      '"'
    )
    .replaceAll(
      "&#39;",
      "'"
    )
    .replaceAll(
      "&lt;",
      "<"
    )
    .replaceAll(
      "&gt;",
      ">"
    );

}
