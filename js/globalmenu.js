(() => {
 const container=document.getElementById("global-menu");
 if(!container||new URLSearchParams(location.search).get("embed")==="1")return;
 const current=location.pathname.replace(/\/$/,"")||"/";
 const pages=[
  {icon:"ri-home-4-line",title:"Home",page:"/"},
  {icon:"ri-gamepad-line",title:"Games",page:"/lessons.html"},
  {icon:"ri-apps-2-line",title:"Apps",page:"/flashcards.html"},
  {icon:"ri-global-line",title:"Browser",page:"/search.html"},
  {icon:"ri-sparkling-2-line",title:"AI",page:"/study.html"},
  {icon:"ri-message-3-line",title:"Chat",page:"/review.html"},
  {icon:"ri-settings-3-line",title:"Settings",page:"/settings.html"}
 ];
 const nav=document.createElement("nav");nav.className="dock";nav.setAttribute("aria-label","Main navigation");
 for(const item of pages){const a=document.createElement("a");a.href=item.page;a.dataset.title=item.title;a.setAttribute("aria-label",item.title);a.title=item.title;if(current===item.page||(item.page==="/"&&current==="/index.html")){a.classList.add("active");a.setAttribute("aria-current","page")}const i=document.createElement("i");i.className=item.icon;i.setAttribute("aria-hidden","true");a.appendChild(i);nav.appendChild(a)}
 container.replaceChildren(nav);
 const keys={"1":"/","2":"/lessons.html","3":"/flashcards.html","4":"/search.html","5":"/study.html","6":"/review.html","7":"/settings.html"};
 document.addEventListener("keydown",e=>{if(!e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)return;if(e.target&&/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;const p=keys[e.key];if(!p)return;e.preventDefault();location.assign(p)});
})();