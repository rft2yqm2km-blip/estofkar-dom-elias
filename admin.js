// ============================================================
// ADMIN DA LOJA — login (Supabase Auth) + gestão de produtos.
// Só o Elias (utilizador criado no Supabase) consegue entrar.
// ============================================================
(function () {
  "use strict";
  const cfg = window.APP_CONFIG;
  let sb = null;

  const $ = (id) => document.getElementById(id);
  const loginView = $("login-view");
  const appView = $("app-view");
  const loginForm = $("login-form");
  const loginErr = $("login-err");
  const listEl = $("admin-list");
  const msgEl = $("admin-msg");
  const addForm = $("add-form");

  const money = (v) => new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(v || 0);
  const msg = (txt, ok) => { msgEl.textContent = txt || ""; msgEl.className = "admin-msg" + (ok ? " is-ok" : txt ? " is-err" : ""); };

  // -- Arranque --------------------------------------------------------
  async function init() {
    fillCategories();
    if (!cfg.supabaseReady) {
      loginView.hidden = false;
      loginView.innerHTML = `<p class="admin-config">${I18N.t("admin.configMissing")}</p>`;
      return;
    }
    sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    const { data } = await sb.auth.getSession();
    if (data && data.session) showApp(); else showLogin();
  }

  function fillCategories() {
    const sel = $("f-category");
    if (!sel) return;
    sel.innerHTML = cfg.CATEGORIES.map((c) => `<option value="${c.slug}">${I18N.catLabel(c.slug)}</option>`).join("");
  }

  function showLogin() { loginView.hidden = false; appView.hidden = true; }
  function showApp() { loginView.hidden = true; appView.hidden = false; loadProducts(); }

  // -- Login -----------------------------------------------------------
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginErr.textContent = "";
    const email = $("login-email").value.trim();
    const password = $("login-pass").value;
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) { loginErr.textContent = I18N.t("admin.loginErr"); return; }
    showApp();
  });

  $("logout").addEventListener("click", async () => { await sb.auth.signOut(); showLogin(); });

  // -- Listar / renderizar --------------------------------------------
  async function loadProducts() {
    listEl.innerHTML = "…";
    const { data, error } = await sb.from("products").select("*").order("created_at", { ascending: false });
    if (error) { listEl.innerHTML = ""; msg(error.message); return; }
    renderProducts(data || []);
  }

  function renderProducts(list) {
    if (!list.length) { listEl.innerHTML = `<p class="admin-empty">${I18N.t("admin.empty")}</p>`; return; }
    listEl.innerHTML = list.map((p) => `
      <div class="admin-row ${p.sold ? "is-sold" : ""}">
        <div class="admin-thumb">${p.image_url ? `<img src="${p.image_url}" alt="">` : ""}</div>
        <div class="admin-info">
          <strong>${esc(p.title)}</strong>
          <span>${I18N.catLabel(p.category)} · ${money(p.price)} · ${I18N.t("admin.fQty")}: ${p.quantity || 0}${p.sold ? " · ✔ " + I18N.t("admin.markSold") : ""}</span>
        </div>
        <div class="admin-actions">
          ${p.sold ? "" : `<button class="btn btn-outline btn-sm" data-sold="${p.id}">${I18N.t("admin.markSold")}</button>`}
          <button class="btn btn-sm admin-del" data-del="${p.id}" data-path="${p.image_path || ""}">${I18N.t("admin.delete")}</button>
        </div>
      </div>`).join("");
    listEl.querySelectorAll("[data-sold]").forEach((b) => b.addEventListener("click", () => markSold(b.dataset.sold)));
    listEl.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", () => removeProduct(b.dataset.del, b.dataset.path)));
  }

  // -- Mostrar o nome da foto escolhida --------------------------------
  const photoName = $("f-photo-name");
  $("f-photo").addEventListener("change", () => {
    const f = $("f-photo").files[0];
    photoName.textContent = f ? f.name : I18N.t("admin.noFile");
  });

  // -- Adicionar -------------------------------------------------------
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg("");
    const title = $("f-name").value.trim();
    const category = $("f-category").value;
    const price = parseFloat($("f-price").value);
    const quantity = parseInt($("f-qty").value || "1", 10);
    const description = $("f-desc").value.trim();
    const file = $("f-photo").files[0];

    if (!title || !category || isNaN(price)) { msg(I18N.t("admin.required")); return; }

    const submitBtn = addForm.querySelector('button[type="submit"]');
    const original = submitBtn.textContent;
    submitBtn.disabled = true; submitBtn.textContent = I18N.t("admin.saving");

    try {
      let image_url = null, image_path = null;
      if (file) {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        image_path = Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
        const up = await sb.storage.from(cfg.BUCKET).upload(image_path, file, { cacheControl: "3600", upsert: false });
        if (up.error) throw up.error;
        image_url = sb.storage.from(cfg.BUCKET).getPublicUrl(image_path).data.publicUrl;
      }
      const ins = await sb.from("products").insert([{ title, category, price, quantity, description, image_url, image_path, sold: false }]);
      if (ins.error) throw ins.error;
      addForm.reset();
      photoName.textContent = I18N.t("admin.noFile");
      msg(I18N.t("admin.saved"), true);
      loadProducts();
    } catch (err) {
      console.error(err);
      msg(I18N.t("admin.errSave") + " " + (err.message || ""));
    } finally {
      submitBtn.disabled = false; submitBtn.textContent = original;
    }
  });

  // -- Marcar vendido / eliminar --------------------------------------
  async function markSold(id) {
    const { error } = await sb.from("products").update({ sold: true }).eq("id", id);
    if (error) { msg(error.message); return; }
    loadProducts();
  }

  async function removeProduct(id, path) {
    if (!confirm(I18N.t("admin.confirmDel"))) return;
    if (path) { try { await sb.storage.from(cfg.BUCKET).remove([path]); } catch (e) { /* segue mesmo assim */ } }
    const { error } = await sb.from("products").delete().eq("id", id);
    if (error) { msg(error.message); return; }
    loadProducts();
  }

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  // Atualizar etiquetas ao mudar idioma
  document.addEventListener("i18n:change", () => { fillCategories(); if (sb && !appView.hidden) loadProducts(); });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
