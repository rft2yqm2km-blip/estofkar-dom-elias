// ============================================================
// LOJA PÚBLICA — lê os produtos do Supabase e mostra-os.
// Botão "Estou interessado" → abre o WhatsApp com a mensagem pronta.
// ============================================================
(function () {
  "use strict";
  const cfg = window.APP_CONFIG;
  const grid = document.getElementById("store-grid");
  const filters = document.getElementById("store-filters");
  const stateEl = document.getElementById("store-state");
  let products = [];
  let activeCat = "todos";

  const money = (v) =>
    new Intl.NumberFormat(I18N.lang === "es" ? "es-ES" : "pt-PT",
      { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(v || 0);

  function setState(msg) { stateEl.textContent = msg || ""; stateEl.style.display = msg ? "block" : "none"; }

  function renderFilters() {
    const cats = cfg.CATEGORIES;
    filters.innerHTML =
      `<button class="filter ${activeCat === "todos" ? "is-active" : ""}" data-cat="todos">${I18N.t("loja.filterAll")}</button>` +
      cats.map((c) => `<button class="filter ${activeCat === c.slug ? "is-active" : ""}" data-cat="${c.slug}">${I18N.catLabel(c.slug)}</button>`).join("");
    filters.querySelectorAll(".filter").forEach((b) =>
      b.addEventListener("click", () => { activeCat = b.dataset.cat; renderFilters(); renderGrid(); }));
  }

  function waLink(p) {
    const msg = I18N.t("loja.msg", { title: p.title, price: money(p.price) });
    return "https://wa.me/" + cfg.WHATSAPP + "?text=" + encodeURIComponent(msg);
  }

  function renderGrid() {
    const list = products.filter((p) => activeCat === "todos" || p.category === activeCat);
    if (!list.length) { grid.innerHTML = ""; setState(I18N.t("loja.empty")); return; }
    setState("");
    grid.innerHTML = list.map((p) => `
      <article class="prod">
        <div class="prod-img">${p.image_url ? `<img src="${p.image_url}" alt="${escapeHtml(p.title)}" loading="lazy">` : ""}</div>
        <div class="prod-body">
          <span class="prod-cat">${I18N.catLabel(p.category)}</span>
          <h3 class="prod-title">${escapeHtml(p.title)}</h3>
          ${p.description ? `<p class="prod-desc">${escapeHtml(p.description)}</p>` : ""}
          <div class="prod-meta">
            <span class="prod-price">${money(p.price)}</span>
            ${p.quantity ? `<span class="prod-qty">${I18N.t("loja.qty")}: ${p.quantity}</span>` : ""}
          </div>
          <a class="btn btn-primary prod-cta" href="${waLink(p)}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M.06 24l1.69-6.16a11.87 11.87 0 01-1.6-5.95C.16 5.34 5.5 0 12.06 0a11.82 11.82 0 018.4 3.49 11.74 11.74 0 013.48 8.4c0 6.55-5.34 11.89-11.9 11.89a11.9 11.9 0 01-5.68-1.45L.06 24zm6.6-3.8c1.68.99 3.28 1.59 5.4 1.59 5.45 0 9.89-4.43 9.89-9.88 0-5.46-4.44-9.9-9.89-9.9-5.46 0-9.9 4.44-9.9 9.9 0 2.23.65 3.9 1.74 5.64l-.99 3.61 3.75-.96z"/></svg>
            <span>${I18N.t("loja.interested")}</span>
          </a>
        </div>
      </article>`).join("");
  }

  async function load() {
    if (!cfg.supabaseReady) { renderFilters(); setState(I18N.t("loja.config")); return; }
    setState(I18N.t("loja.loading"));
    try {
      const sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
      const { data, error } = await sb.from("products").select("*").eq("sold", false).order("created_at", { ascending: false });
      if (error) throw error;
      products = data || [];
      renderFilters();
      renderGrid();
    } catch (e) {
      console.error(e);
      renderFilters();
      setState(I18N.t("loja.config"));
    }
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // Re-renderiza quando muda o idioma
  document.addEventListener("i18n:change", () => { renderFilters(); renderGrid(); });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load);
  else load();
})();
