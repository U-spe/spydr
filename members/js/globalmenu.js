export function mountMemberNavigation() {
  const sidebar = document.getElementById("member-sidebar");
  const nav = document.getElementById("member-nav");
  const mobileOpen = document.getElementById("mobile-menu-button");
  const mobileClose = document.getElementById("sidebar-close");
  const breadcrumb = document.getElementById("breadcrumb-current");
  if (!sidebar || !nav) return () => {};

  const closeSidebar = () => sidebar.classList.remove("open");
  const navigate = page => {
    const target = document.querySelector('[data-view="' + page + '"]');
    if (!target) return;
    document.querySelectorAll("[data-view]").forEach(view => {
      view.hidden = view.dataset.view !== page;
      view.classList.toggle("active", view.dataset.view === page);
    });
    nav.querySelectorAll("[data-page]").forEach(button => {
      const active = button.dataset.page === page;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    if (breadcrumb) breadcrumb.textContent = page.replace("-", " ");
    history.replaceState(null, "", "#" + page);
    closeSidebar();
    window.dispatchEvent(new CustomEvent("spydr:member-page", { detail: { page } }));
  };

  nav.addEventListener("click", event => {
    const button = event.target.closest("[data-page]");
    if (button) navigate(button.dataset.page);
  });
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-page]");
    if (!button || nav.contains(button)) return;
    navigate(button.dataset.page);
  });
  mobileOpen?.addEventListener("click", () => sidebar.classList.add("open"));
  mobileClose?.addEventListener("click", closeSidebar);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeSidebar();
  });

  const initial = location.hash.replace("#", "");
  navigate(["dashboard", "apps", "friends", "profile", "settings"].includes(initial) ? initial : "dashboard");
  return navigate;
}
