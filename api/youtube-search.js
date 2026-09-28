export default async function handler(req, res) {

  /* ==========================================
     CORS / METHOD
  ========================================== */

  if (req.method !== "GET") {

    return res.status(405).json({
      error: "Method not allowed."
    });

  }


  /* ==========================================
     QUERY
  ========================================== */

  const query = String(req.query.q || "").trim();

  if (!query) {

    return res.status(400).json({
      error: "Missing search query."
    });

  }


  /* ==========================================
     API KEY
  ========================================== */

  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {

    return res.status(500).json({
      error:
        "YOUTUBE_API_KEY is not configured."
    });

  }


  /* ==========================================
     YOUTUBE SEARCH
  ========================================== */

  try {

    const params = new URLSearchParams({
      part: "snippet",
      type: "video",
      maxResults: "20",
      q: query,
      key: API_KEY,

      safeSearch: "moderate"
    });


    const url =
      "https://www.googleapis.com/youtube/v3/search?" +
      params.toString();


    const response = await fetch(url);

    const data = await response.json();


    if (!response.ok) {

      console.error(
        "YouTube API error:",
        data
      );

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "YouTube API request failed."
      });

    }


    /* ==========================================
       CLEAN RESPONSE
    ========================================== */

    const results = (data.items || [])
      .filter(item => item?.id?.videoId)
      .map(item => ({

        id: item.id.videoId,

        title:
          decodeEntities(
            item.snippet.title
          ),

        description:
          decodeEntities(
            item.snippet.description
          ),

        channel:
          decodeEntities(
            item.snippet.channelTitle
          ),

        publishedAt:
          item.snippet.publishedAt,

        thumbnail:
          item.snippet.thumbnails?.high?.url ||
          item.snippet.thumbnails?.medium?.url ||
          item.snippet.thumbnails?.default?.url ||
          ""

      }));


    return res.status(200).json({
      query,
      results
    });


  } catch (error) {

    console.error(
      "YT Player search error:",
      error
    );

    return res.status(500).json({
      error:
        "Could not search YouTube."
    });

  }

}


/* ==========================================
   HTML ENTITY CLEANER
========================================== */

function decodeEntities(text = "") {

  return text

    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

}
