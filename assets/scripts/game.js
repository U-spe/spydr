function isInIframeAndSameDomain() {
    try {
        if (window.self !== window.parent) {
            if (window.parent.location.hostname === window.location.hostname) {
                return {
                    inIframe: true,
                    sameDomain: true
                };
            } else {
                return {
                    inIframe: true,
                    sameDomain: false
                };
            }
        } else {
            return {
                inIframe: false,
                sameDomain: false
            };
        }
    } catch (e) {
        // Cross-origin iframe
        return {
            inIframe: true,
            sameDomain: false
        };
    }
}

const result = isInIframeAndSameDomain();

let canRedir = true;


/* =========================
   SPYDR URL FLAGS
========================= */

try {
    const params = new URLSearchParams(window.location.search);

    // Keep compatibility with your old ?school=1 behavior
    if (params.get("school") === "1") {
        canRedir = false;
    }

    // Optional Spydr-specific bypass for trusted internal loads
    if (params.get("spydr") === "1") {
        canRedir = false;
    }

} catch (error) {
    console.error("[spydr] query error:", error);
}


/* =========================
   KNOWN CDN / HOST EXCEPTIONS
========================= */

try {

    const host = window.location.hostname;

    if (
        host.includes("-cdn.") ||
        host.includes("github.io") ||
        host.includes("githubusercontent.com")
    ) {
        canRedir = false;
    }

} catch (e) {
    console.error("[spydr] hostname error:", e);
}


/* =========================
   ROOT DOMAIN HELPER
========================= */

const getRootDomain = (hostname) => {
    const parts = hostname.split(".");

    return parts.length > 2
        ? parts.slice(-2).join(".")
        : hostname;
};


/* =========================
   SPYDR DOMAIN GUARD
========================= */

if (
    canRedir &&
    result.inIframe &&
    !result.sameDomain
) {

    const rootDomain = getRootDomain(
        window.location.hostname
    );

    console.log("[spydr] embed detected:", {
        host: window.location.hostname,
        rootDomain,
        iframe: result.inIframe,
        sameDomain: result.sameDomain
    });


    /* -------------------------
       GOOGLE HOSTED ASSETS
    ------------------------- */

    if (
        rootDomain === "googleapis.com" &&
        window.self !== window.parent
    ) {

        console.log("[spydr] google-hosted embed");

        // Keep if you actually have this page
        window.location.href = "./pre-gg.html";
    }


    /* -------------------------
       ALLOWED SPYDR DOMAINS
    ------------------------- */

    else if (
        rootDomain !== "webcreationstudios.org" &&
        rootDomain !== "mjevents.org" &&
        rootDomain !== "vercel.app" &&
        rootDomain !== "github.io" &&
        rootDomain !== "surge.sh" &&
        window.self !== window.parent
    ) {

        console.log(
            "[spydr] unknown embed domain:",
            rootDomain
        );

        /*
         * Optional:
         * If you want unknown iframe hosts to go
         * to a Spydr-themed warning/loader page,
         * uncomment this.
         */

        // window.location.href = "./pre-spydr.html";
    }

    else {
        console.log(
            "[spydr] trusted embed domain:",
            rootDomain
        );
    }
}
