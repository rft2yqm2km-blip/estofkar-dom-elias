/* ===============================================================
   ESTOFKAR DOM ELIAS — script.js  (vanilla JS, sem dependências)
   =============================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     CONFIG — alterar aqui o contacto se mudar
     Número WhatsApp: sem "+" e sem espaços.
     --------------------------------------------------------------- */
  const WHATSAPP = "351932236739";
  const EMAIL = "estofkar@gmail.com";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ===============================================================
     1. Ano corrente no footer
     =============================================================== */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===============================================================
     2. Menu mobile (hambúrguer)
     =============================================================== */
  const navToggle = $("#nav-toggle");
  const nav = $("#main-nav");
  if (navToggle && nav) {
    const closeNav = () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menu");
    };
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    // Fechar ao clicar num link
    $$("a", nav).forEach((a) => a.addEventListener("click", closeNav));
  }

  /* ===============================================================
     3. Revelação ao fazer scroll (IntersectionObserver)
     =============================================================== */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ===============================================================
     4. Slider Antes & Depois
     =============================================================== */
  $$("[data-ba]").forEach((slider) => {
    const range = $(".ba-range", slider);
    const before = $(".ba-before", slider);
    const handle = $(".ba-handle", slider);
    if (!range) return;
    const apply = (v) => {
      slider.style.setProperty("--pos", v + "%");
      if (before) before.style.setProperty("--pos", v + "%");
      if (handle) handle.style.left = v + "%";
    };
    apply(range.value);
    range.addEventListener("input", () => apply(range.value));
  });

  /* ===============================================================
     5. Galeria — filtros + lightbox
     =============================================================== */
  // Filtros
  const filters = $$(".filter");
  const galItems = $$(".gal-item");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const cat = btn.dataset.filter;
      galItems.forEach((item) => {
        const show = cat === "todos" || item.dataset.cat === cat;
        item.classList.toggle("is-hidden", !show);
      });
    });
  });

  // Lightbox
  const lightbox = $("#lightbox");
  const lbImg = $("#lb-img");
  const lbClose = $("#lb-close");
  const lbPrev = $("#lb-prev");
  const lbNext = $("#lb-next");
  let lbIndex = 0;

  const visibleItems = () => galItems.filter((i) => !i.classList.contains("is-hidden"));

  const openLightbox = (item) => {
    const list = visibleItems();
    lbIndex = list.indexOf(item);
    showLb();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  };
  const showLb = () => {
    const list = visibleItems();
    if (!list.length) return;
    const img = $("img", list[lbIndex]);
    lbImg.src = img.src;
    lbImg.alt = img.alt;
  };
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  const step = (dir) => {
    const list = visibleItems();
    lbIndex = (lbIndex + dir + list.length) % list.length;
    showLb();
  };

  galItems.forEach((item) =>
    item.addEventListener("click", () => openLightbox(item))
  );
  if (lightbox) {
    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", () => step(-1));
    lbNext.addEventListener("click", () => step(1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  /* ===============================================================
     6. Construtor de Orçamento por passos
     =============================================================== */
  const quote = $("#quote");
  if (quote) {
    const steps = $$(".quote-step", quote);
    const total = steps.length; // 5 (4 perguntas + resumo)
    const bar = $("#quote-bar");
    const backBtn = $("#quote-back");
    const countEl = $("#quote-count");
    let current = 1;

    const data = { peca: "", material: "", acabamento: "", detalhes: "", nome: "" };

    const goTo = (n) => {
      current = Math.max(1, Math.min(total, n));
      steps.forEach((s) =>
        s.classList.toggle("is-active", Number(s.dataset.step) === current)
      );
      bar.style.width = (current / total) * 100 + "%";
      backBtn.hidden = current === 1;
      countEl.textContent = "Passo " + current + " de " + total;
      if (current === total) buildSummary();
    };

    // Selecionar opção em passos 1–3 → guarda e avança
    $$(".opts", quote).forEach((group) => {
      const key = group.dataset.group; // peca | material | acabamento
      $$(".opt", group).forEach((opt) => {
        opt.addEventListener("click", () => {
          $$(".opt", group).forEach((o) => o.classList.remove("is-selected"));
          opt.classList.add("is-selected");
          data[key] = opt.dataset.value;
          setTimeout(() => goTo(current + 1), 180); // pequena pausa para feedback visual
        });
      });
    });

    // Passo 4 → campos de texto; avança com botão "Ver resumo"
    const detalhesEl = $("#q-detalhes");
    const nomeEl = $("#q-nome");

    // Adiciona botão "Ver resumo" ao passo 4 dinamicamente
    const step4 = $('.quote-step[data-step="4"]', quote);
    const nextBtn = document.createElement("button");
    nextBtn.className = "btn btn-primary";
    nextBtn.type = "button";
    nextBtn.textContent = "Ver resumo →";
    nextBtn.style.marginTop = "6px";
    nextBtn.addEventListener("click", () => {
      data.detalhes = (detalhesEl.value || "").trim();
      data.nome = (nomeEl.value || "").trim();
      goTo(current + 1);
    });
    step4.appendChild(nextBtn);

    backBtn.addEventListener("click", () => goTo(current - 1));

    // Construir resumo + links de envio
    const summaryList = $("#summary-list");
    const waBtn = $("#send-wa");
    const mailBtn = $("#send-mail");

    const buildSummary = () => {
      const rows = [
        ["Peça", data.peca || "—"],
        ["Material", data.material || "—"],
        ["Acabamento", data.acabamento || "—"],
        ["Detalhes", data.detalhes || "—"],
      ];
      if (data.nome) rows.push(["Nome", data.nome]);

      summaryList.innerHTML = rows
        .map((r) => `<li><strong>${r[0]}:</strong><span>${escapeHtml(r[1])}</span></li>`)
        .join("");

      // Texto da mensagem (igual para WhatsApp e email)
      const lines = [
        "Olá Estofkar Dom Elias! Gostaria de um orçamento.",
        "• Peça: " + (data.peca || "—"),
        "• Material: " + (data.material || "—"),
        "• Acabamento: " + (data.acabamento || "—"),
        "• Detalhes: " + (data.detalhes || "—"),
      ];
      if (data.nome) lines.push("• Nome: " + data.nome);
      const message = lines.join("\n");

      // WhatsApp
      waBtn.href =
        "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message);

      // Email
      const subject = "Pedido de orçamento — " + (data.peca || "Estofagem");
      mailBtn.href =
        "mailto:" + EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(message);
    };

    goTo(1);
  }

  /* Pequena ajuda para escapar HTML no resumo */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }
})();
