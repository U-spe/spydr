// ===============================
// SPYDR WEB - AJAX / FETCH REWRITE ENGINE
// base path: /spydr-web
// ===============================

const BASE = "/spydr-web";

// grab alloy metadata (spydr session context)
let apData = document.getElementById("alloyData");
let urlData = apData ? apData.getAttribute("data-alloyURL") : "";

// -------------------------------
// URL REWRITE HELPER
// -------------------------------
function rewriteURL(url, encoding) {
  let websiteURL;

  if (encoding === "base64") {
    websiteURL = btoa(url.split("/").slice(0, 3).join("/"));
  } else {
    websiteURL = url.split("/").slice(0, 3).join("/");
  }

  const path = "/" + url.split("/").slice(3).join("/");
  return path === "/"
    ? `${BASE}/fetch/${websiteURL}`
    : `${BASE}/fetch/${websiteURL}${path}`;
}

// -------------------------------
// XHR REWRITE
// -------------------------------
const originalOpen = window.XMLHttpRequest.prototype.open;

window.XMLHttpRequest.prototype.open = function (
  method,
  url,
  async,
  user,
  password
) {
  if (!url) return originalOpen.apply(this, arguments);

  if (url.startsWith(`https://${window.location.hostname}`)) {
    // keep
  } else if (url.startsWith("http")) {
    const hostname = url.split("/").slice(0, 3).join("/");
    const path = url.split("/").slice(3).join("/");
    const encodedHost = btoa(hostname);
    url = `${BASE}/fetch/${encodedHost}/${path}`;
  } else if (url.startsWith("//")) {
    url = `${BASE}/alloy/?url=${btoa("http:" + url)}`;
  } else if (url.startsWith("/")) {
    if (!url.startsWith("/fetch") && !url.startsWith("/alloy")) {
      url = `${BASE}/fetch/${urlData}${url}`;
    }
  }

  return originalOpen.apply(this, arguments);
};

// -------------------------------
// FETCH REWRITE
// -------------------------------
const originalFetch = window.fetch;

window.fetch = function (url, opts) {
  if (!url) return originalFetch.apply(this, arguments);

  if (url.startsWith(`https://${window.location.hostname}`)) {
    // keep
  } else if (url.startsWith("http")) {
    const hostname = url.split("/").slice(0, 3).join("/");
    const path = url.split("/").slice(3).join("/");
    url = `${BASE}/fetch/${btoa(hostname)}/${path}`;
  } else if (url.startsWith("//")) {
    url = `${BASE}/alloy/?url=${btoa("http:" + url)}`;
  } else if (url.startsWith("/")) {
    if (!url.startsWith("/fetch") && !url.startsWith("/alloy")) {
      url = `${BASE}/fetch/${urlData}${url}`;
    }
  }

  return originalFetch.apply(this, arguments);
};

// -------------------------------
// ELEMENT CREATION REWRITE
// -------------------------------
const originalCreate = document.createElement;

document.createElement = function (tag) {
  const element = originalCreate.call(document, tag);

  function rewriteAttr(type, value) {
    if (!value) return value;

    if (value.startsWith("/fetch/") || value.startsWith("/alloy/")) return value;
    if (value.startsWith(`https://${window.location.hostname}`)) return value;

    if (value.startsWith("//")) {
      return `${BASE}/alloy/?url=${btoa("http:" + value)}`;
    }

    if (value.startsWith("http://") || value.startsWith("https://")) {
      return `${BASE}/alloy/?url=${btoa(value)}`;
    }

    if (value.startsWith("/")) {
      return `${BASE}/fetch/${urlData}${value}`;
    }

    return value;
  }

  const attach = (prop) => {
    Object.defineProperty(element.__proto__, prop, {
      set(newValue) {
        element.setAttribute(prop, rewriteAttr(prop, newValue));
      },
    });
  };

  if (tag.toLowerCase() === "script") attach("src");
  if (tag.toLowerCase() === "iframe") attach("src");
  if (tag.toLowerCase() === "link") attach("href");

  return element;
};

// -------------------------------
// setAttribute REWRITE
// -------------------------------
const originalSetAttr = window.Element.prototype.setAttribute;

window.Element.prototype.setAttribute = function (name, value) {
  if (!value) return originalSetAttr.apply(this, arguments);

  if (name === "src" || name === "href") {
    if (value.startsWith(`https://${window.location.hostname}`)) {
      return originalSetAttr.apply(this, arguments);
    }

    if (value.startsWith("/fetch") || value.startsWith("/alloy")) {
      return originalSetAttr.apply(this, arguments);
    }

    if (value.startsWith("//")) {
      value = `${BASE}/alloy/?url=${btoa("http:" + value)}`;
    } else if (value.startsWith("/")) {
      value = `${BASE}/fetch/${urlData}${value}`;
    } else if (value.startsWith("http://") || value.startsWith("https://")) {
      value = `${BASE}/alloy/?url=${btoa(value)}`;
    }
  }

  return originalSetAttr.call(this, name, value);
};

// -------------------------------
// HISTORY FIX (SPYDR ROUTING)
// -------------------------------
let previousState = window.history.state;

setInterval(() => {
  if (previousState !== window.history.state) {
    if (!window.location.pathname.startsWith(`${BASE}/fetch/${urlData}/`)) {
      history.pushState(
        "",
        "",
        `${BASE}/fetch/${urlData}/${window.location.href.split("/").slice(3).join("/")}`
      );
    }
    previousState = window.history.state;
  }
}, 100);
