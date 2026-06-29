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

    // Tradução: usa o motor i18n se existir, senão devolve o próprio texto
    const T = (k, v) => (window.I18N ? I18N.t(k, v) : k);
    const lbl = (k) => (k ? T(k) : "—"); // k = chave i18n da opção escolhida

    const goTo = (n) => {
      current = Math.max(1, Math.min(total, n));
      steps.forEach((s) =>
        s.classList.toggle("is-active", Number(s.dataset.step) === current)
      );
      bar.style.width = (current / total) * 100 + "%";
      backBtn.hidden = current === 1;
      countEl.textContent = T("quote.stepOf", { n: current, t: total });
      if (current === total) buildSummary();
    };

    // Selecionar opção em passos 1–3 → guarda a CHAVE i18n e avança
    $$(".opts", quote).forEach((group) => {
      const key = group.dataset.group; // peca | material | acabamento
      $$(".opt", group).forEach((opt) => {
        opt.addEventListener("click", () => {
          $$(".opt", group).forEach((o) => o.classList.remove("is-selected"));
          opt.classList.add("is-selected");
          data[key] = opt.dataset.key; // guarda a chave (ex.: "quote.o.auto")
          setTimeout(() => goTo(current + 1), 180);
        });
      });
    });

    // Passo 4 → campos de texto; avança com botão "Ver resumo"
    const detalhesEl = $("#q-detalhes");
    const nomeEl = $("#q-nome");

    const step4 = $('.quote-step[data-step="4"]', quote);
    const nextBtn = document.createElement("button");
    nextBtn.className = "btn btn-primary";
    nextBtn.type = "button";
    nextBtn.textContent = T("quote.seeSummary");
    nextBtn.style.marginTop = "6px";
    nextBtn.addEventListener("click", () => {
      data.detalhes = (detalhesEl.value || "").trim();
      data.nome = (nomeEl.value || "").trim();
      goTo(current + 1);
    });
    step4.appendChild(nextBtn);

    backBtn.addEventListener("click", () => goTo(current - 1));

    const summaryList = $("#summary-list");
    const waBtn = $("#send-wa");
    const mailBtn = $("#send-mail");

    const buildSummary = () => {
      const rows = [
        [T("quote.s.peca"), lbl(data.peca)],
        [T("quote.s.material"), lbl(data.material)],
        [T("quote.s.acab"), lbl(data.acabamento)],
        [T("quote.s.det"), data.detalhes || "—"],
      ];
      if (data.nome) rows.push([T("quote.s.nome"), data.nome]);

      summaryList.innerHTML = rows
        .map((r) => `<li><strong>${escapeHtml(r[0])}:</strong><span>${escapeHtml(r[1])}</span></li>`)
        .join("");

      const lines = [
        T("quote.msgIntro"),
        "• " + T("quote.s.peca") + ": " + lbl(data.peca),
        "• " + T("quote.s.material") + ": " + lbl(data.material),
        "• " + T("quote.s.acab") + ": " + lbl(data.acabamento),
        "• " + T("quote.s.det") + ": " + (data.detalhes || "—"),
      ];
      if (data.nome) lines.push("• " + T("quote.s.nome") + ": " + data.nome);
      const message = lines.join("\n");

      waBtn.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message);

      const subject = T("quote.mailSubject") + " — " + lbl(data.peca);
      mailBtn.href =
        "mailto:" + EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(message);
    };

    // Atualizar textos dinâmicos quando muda o idioma
    document.addEventListener("i18n:change", () => {
      nextBtn.textContent = T("quote.seeSummary");
      countEl.textContent = T("quote.stepOf", { n: current, t: total });
      if (current === total) buildSummary();
    });

    goTo(1);
  }

  /* Pequena ajuda para escapar HTML no resumo */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }
})();
