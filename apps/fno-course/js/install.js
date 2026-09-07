(() => {
  let deferredPrompt = null;
  const $ = (sel) => document.querySelector(sel);

  function isInstalled() {
    return window.matchMedia("(display-mode: standalone)").matches
      || window.navigator.standalone === true;
  }

  function showBanner() {
    const banner = $("#installBanner");
    if (banner && !isInstalled()) banner.hidden = false;
  }

  function hideBanner() {
    const banner = $("#installBanner");
    if (banner) banner.hidden = true;
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showBanner();
  });

  async function installApp() {
    if (!deferredPrompt) {
      $("#installModal").hidden = false;
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (outcome === "accepted") hideBanner();
  }

  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  document.addEventListener("DOMContentLoaded", () => {
    registerSW();

    if (isInstalled()) hideBanner();

    $("#installAppBtn")?.addEventListener("click", installApp);
    $("#installBannerBtn")?.addEventListener("click", installApp);
    $("#installBannerClose")?.addEventListener("click", hideBanner);
    $("#closeInstallModal")?.addEventListener("click", () => {
      $("#installModal").hidden = true;
    });
    $("#installModal")?.addEventListener("click", (e) => {
      if (e.target.id === "installModal") e.target.hidden = true;
    });

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS && !isInstalled()) {
      showBanner();
      setTimeout(() => {
        $("#installModal").hidden = false;
      }, 800);
    } else if (!isInstalled() && /Android/i.test(navigator.userAgent)) {
      showBanner();
    }
  });
})();
