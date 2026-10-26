(() => {
  const cfg = window.SITE_CONFIG || {};
  const bot = String(cfg.TELEGRAM_BOT_USERNAME || "").trim().replace(/^@/, "");
  const admin = String(cfg.ADMIN_USERNAME || "").trim().replace(/^@/, "");

  function setTelegramLink(id, username) {
    const el = document.getElementById(id);
    if (!el) return;
    if (username && !/^(BOT_USERNAME|YOUR_BOT_USERNAME|THAY_USERNAME_ADMIN)$/i.test(username)) {
      el.href = "https://t.me/" + encodeURIComponent(username);
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    } else {
      el.href = "#contact";
      el.removeAttribute("target");
      el.removeAttribute("rel");
      el.textContent = "Hãy cập nhật username trong config.js";
    }
  }
  setTelegramLink("openBot", bot);
  setTelegramLink("panelBotLink", bot);

  const adminEl = document.getElementById("adminUsername");
  const contact = document.getElementById("contactButton");
  if (admin && !/^(THAY_USERNAME_ADMIN|ADMIN_USERNAME)$/i.test(admin)) {
    if (adminEl) adminEl.textContent = "@" + admin;
    if (contact) contact.href = "https://t.me/" + encodeURIComponent(admin);
  } else {
    if (adminEl) adminEl.textContent = "Chưa cấu hình username quản trị viên";
    if (contact) { contact.href = "#contact"; contact.textContent = "Cập nhật config.js"; }
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const qr = document.getElementById("paymentQr");
  const fallback = document.getElementById("qrFallback");
  if (qr && fallback) qr.addEventListener("error", () => { qr.hidden = true; fallback.hidden = false; });

  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }
})();
