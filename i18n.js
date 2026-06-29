// ============================================================
// i18n — Português / Espanhol
// Aplica traduções a [data-i18n], [data-i18n-html], [data-i18n-ph],
// [data-i18n-aria]. Persiste a escolha e avisa quem precisar via evento.
// ============================================================
(function () {
  "use strict";

  const DICT = {
    pt: {
      // -- Navegação / barra --
      "nav.servicos": "Serviços", "nav.trabalhos": "Trabalhos", "nav.orcamento": "Orçamento",
      "nav.contactos": "Contactos", "nav.loja": "Loja", "nav.cta": "Pedir orçamento",
      "bar.call": "Ligar", "bar.whats": "WhatsApp",

      // -- Hero --
      "hero.eyebrow": "Estofador Profissional · Estofados em Geral",
      "hero.title1": "Estofos à medida,", "hero.title2": "feitos com mãos de mestre.",
      "hero.sub": "Qualidade em serviços de estofados para mais conforto e estilo na sua vida — automóveis, sofás, cadeiras e motas.",
      "hero.ctaWhats": "Pedir orçamento por WhatsApp", "hero.ctaWorks": "Ver trabalhos",
      "hero.badge": "Trabalho 100% à medida",

      // -- Serviços --
      "serv.kicker": "O que fazemos", "serv.title": "Serviços de estofagem",
      "serv.lead": "Do banco de um clássico ao seu sofá favorito — devolvemos conforto, estilo e durabilidade.",
      "serv.auto.t": "Automóvel", "serv.auto.d": "Bancos, painéis de porta e interiores completos, repostos com rigor de origem ou à sua medida.",
      "serv.sofa.t": "Sofás & Mobiliário", "serv.sofa.d": "Reestofagem de sofás e mobiliário de sala com enchimentos novos e tecidos à sua escolha.",
      "serv.cad.t": "Cadeiras & Clássicos", "serv.cad.d": "Restauro de mobiliário clássico, preservando o caráter da peça com acabamentos impecáveis.",
      "serv.mota.t": "Motas & Scooters", "serv.mota.d": "Assentos de mota e scooter reestofados para mais conforto, aderência e um visual renovado.",
      "serv.comp.t": "Bancos de Competição", "serv.comp.d": "Bancos desportivos e de competição com acabamentos resistentes e detalhes personalizados.",
      "serv.pers.t": "Personalizado", "serv.pers.d": "Trabalhos à medida em pele, napa e tecido — diga-nos a ideia e tornamo-la realidade.",

      // -- Antes & Depois --
      "ba.kicker": "Restauro", "ba.title": "Antes & Depois", "ba.lead": "Arraste a barra para revelar a transformação.",
      "ba.before": "Antes", "ba.after": "Depois",

      // -- Trabalhos --
      "work.kicker": "Portefólio", "work.title": "Trabalhos", "work.lead": "Uma amostra do que fazemos. Clique para ver em grande.",
      "filter.todos": "Todos", "filter.automovel": "Automóvel", "filter.mobiliario": "Mobiliário",
      "filter.classicos": "Clássicos", "filter.motas": "Motas",

      // -- Orçamento --
      "quote.kicker": "Funcionalidade estrela", "quote.title": "Orçamento por medida",
      "quote.lead": "Em 4 passos rápidos preparamos a sua mensagem. Escolhe enviar por WhatsApp ou email.",
      "quote.q1": "1. Que peça quer estofar?", "quote.q2": "2. Que material prefere?",
      "quote.q3": "3. Que acabamento?", "quote.q4": "4. Quantidade e detalhes",
      "quote.o.auto": "🚗 Automóvel", "quote.o.sofa": "🛋️ Sofá / Mobiliário", "quote.o.cad": "🪑 Cadeira",
      "quote.o.mota": "🏍️ Mota / Scooter", "quote.o.outro": "✨ Outro",
      "quote.o.pele": "Pele natural", "quote.o.napa": "Napa (pele sintética)", "quote.o.tecido": "Tecido",
      "quote.o.naosei": "Não sei, aconselhem-me",
      "quote.o.capit": "Capitonné (losango)", "quote.o.liso": "Liso", "quote.o.outroac": "Outro / Não sei",
      "quote.detLabel": "Descreva o trabalho", "quote.detPh": "Ex.: 2 bancos da frente de um Golf",
      "quote.nameLabel": "O seu nome", "quote.nameOpt": "(opcional)", "quote.namePh": "Ex.: João",
      "quote.summaryTitle": "Resumo do seu pedido",
      "quote.sendWhats": "Enviar por WhatsApp", "quote.sendMail": "Enviar por email",
      "quote.seeSummary": "Ver resumo →", "quote.back": "← Voltar", "quote.stepOf": "Passo {n} de {t}",
      "quote.s.peca": "Peça", "quote.s.material": "Material", "quote.s.acab": "Acabamento",
      "quote.s.det": "Detalhes", "quote.s.nome": "Nome",
      "quote.msgIntro": "Olá Estofkar Dom Elias! Gostaria de um orçamento.",
      "quote.mailSubject": "Pedido de orçamento",

      // -- Porquê --
      "why.kicker": "Porquê nós", "why.title": "Porquê a Estofkar Dom Elias",
      "why.1t": "100% à medida", "why.1d": "Cada trabalho é pensado para a sua peça e para o seu gosto, sem soluções de prateleira.",
      "why.2t": "Materiais de qualidade", "why.2d": "Pele, napa e tecidos selecionados para durar e envelhecer bem.",
      "why.3t": "Acabamentos de mestre", "why.3d": "Detalhes como o capitonné executados com precisão e paciência.",
      "why.4t": "Atenção ao detalhe", "why.4d": "Anos de experiência ao serviço de um acabamento impecável, costura a costura.",

      // -- Contactos --
      "contact.kicker": "Falar connosco", "contact.title": "Contactos",
      "contact.lead": "Solicite o seu orçamento — respondemos com gosto.",
      "contact.whats": "WhatsApp", "contact.phone": "Telefone", "contact.email": "Email", "contact.address": "Morada",
      "contact.hoursLabel": "Horário:", "contact.hoursValue": "Seg–Sex 09:00–18:00 · Sáb e Dom encerrado",

      // -- Footer --
      "footer.desc": "Estofador profissional · Estofos à medida em automóveis, sofás, cadeiras e motas.",
      "footer.contacts": "Contactos", "footer.social": "Redes sociais",
      "footer.rights": "© {year} Estofkar Dom Elias. Todos os direitos reservados.",

      // -- Loja (pública) --
      "loja.kicker": "À venda", "loja.title": "Loja", "loja.lead": "Materiais e peças disponíveis. Veja e fale connosco pelo WhatsApp.",
      "loja.filterAll": "Todos", "loja.empty": "Sem produtos disponíveis de momento. Volte em breve!",
      "loja.interested": "Estou interessado", "loja.qty": "Quantidade", "loja.backToSite": "← Voltar ao site",
      "loja.loading": "A carregar produtos…",
      "loja.config": "A loja está a ser configurada. Volte em breve.",
      "loja.msg": "Olá Estofkar Dom Elias! Tenho interesse neste produto: {title} — {price}. Ainda está disponível?",

      // -- Admin --
      "admin.title": "Gestão da Loja", "admin.subtitle": "Estofkar Dom Elias",
      "admin.loginTitle": "Entrar", "admin.email": "Email", "admin.password": "Palavra-passe",
      "admin.loginBtn": "Entrar", "admin.loginErr": "Email ou palavra-passe incorretos.",
      "admin.logout": "Sair", "admin.welcome": "Sessão iniciada",
      "admin.addTitle": "Adicionar produto", "admin.fName": "Nome do produto", "admin.fNamePh": "Ex.: Pele bege capitonné",
      "admin.fCategory": "Categoria", "admin.fPrice": "Preço (€)", "admin.fQty": "Quantidade",
      "admin.fDesc": "Descrição (opcional)", "admin.fDescPh": "Detalhes, medidas, estado…",
      "admin.fPhoto": "Foto", "admin.save": "Guardar produto", "admin.saving": "A guardar…",
      "admin.listTitle": "Produtos publicados", "admin.empty": "Ainda não há produtos.",
      "admin.delete": "Eliminar", "admin.markSold": "Marcar vendido", "admin.confirmDel": "Eliminar este produto?",
      "admin.configMissing": "Falta configurar o Supabase no ficheiro config.js. Veja o guia SUPABASE_SETUP.md.",
      "admin.saved": "Produto adicionado!", "admin.errSave": "Erro ao guardar. Tente novamente.",
      "admin.required": "Preencha o nome, categoria e preço."
    },

    es: {
      "nav.servicos": "Servicios", "nav.trabalhos": "Trabajos", "nav.orcamento": "Presupuesto",
      "nav.contactos": "Contacto", "nav.loja": "Tienda", "nav.cta": "Pedir presupuesto",
      "bar.call": "Llamar", "bar.whats": "WhatsApp",

      "hero.eyebrow": "Tapicero Profesional · Tapizados en General",
      "hero.title1": "Tapizados a medida,", "hero.title2": "hechos con manos de maestro.",
      "hero.sub": "Calidad en servicios de tapicería para más confort y estilo en su vida — automóviles, sofás, sillas y motos.",
      "hero.ctaWhats": "Pedir presupuesto por WhatsApp", "hero.ctaWorks": "Ver trabajos",
      "hero.badge": "Trabajo 100% a medida",

      "serv.kicker": "Lo que hacemos", "serv.title": "Servicios de tapicería",
      "serv.lead": "Del asiento de un clásico a su sofá favorito — devolvemos confort, estilo y durabilidad.",
      "serv.auto.t": "Automóvil", "serv.auto.d": "Asientos, paneles de puerta e interiores completos, restaurados con rigor de origen o a su medida.",
      "serv.sofa.t": "Sofás y Mobiliario", "serv.sofa.d": "Retapizado de sofás y mobiliario de salón con rellenos nuevos y telas a su elección.",
      "serv.cad.t": "Sillas y Clásicos", "serv.cad.d": "Restauración de mobiliario clásico, preservando el carácter de la pieza con acabados impecables.",
      "serv.mota.t": "Motos y Scooters", "serv.mota.d": "Asientos de moto y scooter retapizados para más confort, agarre y un aspecto renovado.",
      "serv.comp.t": "Asientos de Competición", "serv.comp.d": "Asientos deportivos y de competición con acabados resistentes y detalles personalizados.",
      "serv.pers.t": "Personalizado", "serv.pers.d": "Trabajos a medida en piel, napa y tela — díganos su idea y la hacemos realidad.",

      "ba.kicker": "Restauración", "ba.title": "Antes y Después", "ba.lead": "Arrastre la barra para revelar la transformación.",
      "ba.before": "Antes", "ba.after": "Después",

      "work.kicker": "Portafolio", "work.title": "Trabajos", "work.lead": "Una muestra de lo que hacemos. Haga clic para ampliar.",
      "filter.todos": "Todos", "filter.automovel": "Automóvil", "filter.mobiliario": "Mobiliario",
      "filter.classicos": "Clásicos", "filter.motas": "Motos",

      "quote.kicker": "Función estrella", "quote.title": "Presupuesto a medida",
      "quote.lead": "En 4 pasos rápidos preparamos su mensaje. Elija enviarlo por WhatsApp o email.",
      "quote.q1": "1. ¿Qué pieza quiere tapizar?", "quote.q2": "2. ¿Qué material prefiere?",
      "quote.q3": "3. ¿Qué acabado?", "quote.q4": "4. Cantidad y detalles",
      "quote.o.auto": "🚗 Automóvil", "quote.o.sofa": "🛋️ Sofá / Mobiliario", "quote.o.cad": "🪑 Silla",
      "quote.o.mota": "🏍️ Moto / Scooter", "quote.o.outro": "✨ Otro",
      "quote.o.pele": "Piel natural", "quote.o.napa": "Napa (piel sintética)", "quote.o.tecido": "Tela",
      "quote.o.naosei": "No sé, aconséjenme",
      "quote.o.capit": "Capitoné (rombo)", "quote.o.liso": "Liso", "quote.o.outroac": "Otro / No sé",
      "quote.detLabel": "Describa el trabajo", "quote.detPh": "Ej.: 2 asientos delanteros de un Golf",
      "quote.nameLabel": "Su nombre", "quote.nameOpt": "(opcional)", "quote.namePh": "Ej.: Juan",
      "quote.summaryTitle": "Resumen de su solicitud",
      "quote.sendWhats": "Enviar por WhatsApp", "quote.sendMail": "Enviar por email",
      "quote.seeSummary": "Ver resumen →", "quote.back": "← Volver", "quote.stepOf": "Paso {n} de {t}",
      "quote.s.peca": "Pieza", "quote.s.material": "Material", "quote.s.acab": "Acabado",
      "quote.s.det": "Detalles", "quote.s.nome": "Nombre",
      "quote.msgIntro": "¡Hola Estofkar Dom Elias! Me gustaría un presupuesto.",
      "quote.mailSubject": "Solicitud de presupuesto",

      "why.kicker": "Por qué nosotros", "why.title": "Por qué Estofkar Dom Elias",
      "why.1t": "100% a medida", "why.1d": "Cada trabajo se piensa para su pieza y su gusto, sin soluciones genéricas.",
      "why.2t": "Materiales de calidad", "why.2d": "Piel, napa y telas seleccionadas para durar y envejecer bien.",
      "why.3t": "Acabados de maestro", "why.3d": "Detalles como el capitoné ejecutados con precisión y paciencia.",
      "why.4t": "Atención al detalle", "why.4d": "Años de experiencia al servicio de un acabado impecable, costura a costura.",

      "contact.kicker": "Hablar con nosotros", "contact.title": "Contacto",
      "contact.lead": "Solicite su presupuesto — le respondemos con gusto.",
      "contact.whats": "WhatsApp", "contact.phone": "Teléfono", "contact.email": "Email", "contact.address": "Dirección",
      "contact.hoursLabel": "Horario:", "contact.hoursValue": "Lun–Vie 09:00–18:00 · Sáb y Dom cerrado",

      "footer.desc": "Tapicero profesional · Tapizados a medida en automóviles, sofás, sillas y motos.",
      "footer.contacts": "Contacto", "footer.social": "Redes sociales",
      "footer.rights": "© {year} Estofkar Dom Elias. Todos los derechos reservados.",

      "loja.kicker": "A la venta", "loja.title": "Tienda", "loja.lead": "Materiales y piezas disponibles. Véalos y hable con nosotros por WhatsApp.",
      "loja.filterAll": "Todos", "loja.empty": "No hay productos disponibles por ahora. ¡Vuelva pronto!",
      "loja.interested": "Estoy interesado", "loja.qty": "Cantidad", "loja.backToSite": "← Volver al sitio",
      "loja.loading": "Cargando productos…",
      "loja.config": "La tienda se está configurando. Vuelva pronto.",
      "loja.msg": "¡Hola Estofkar Dom Elias! Estoy interesado en este producto: {title} — {price}. ¿Sigue disponible?",

      "admin.title": "Gestión de la Tienda", "admin.subtitle": "Estofkar Dom Elias",
      "admin.loginTitle": "Entrar", "admin.email": "Email", "admin.password": "Contraseña",
      "admin.loginBtn": "Entrar", "admin.loginErr": "Email o contraseña incorrectos.",
      "admin.logout": "Salir", "admin.welcome": "Sesión iniciada",
      "admin.addTitle": "Añadir producto", "admin.fName": "Nombre del producto", "admin.fNamePh": "Ej.: Piel beige capitoné",
      "admin.fCategory": "Categoría", "admin.fPrice": "Precio (€)", "admin.fQty": "Cantidad",
      "admin.fDesc": "Descripción (opcional)", "admin.fDescPh": "Detalles, medidas, estado…",
      "admin.fPhoto": "Foto", "admin.save": "Guardar producto", "admin.saving": "Guardando…",
      "admin.listTitle": "Productos publicados", "admin.empty": "Aún no hay productos.",
      "admin.delete": "Eliminar", "admin.markSold": "Marcar vendido", "admin.confirmDel": "¿Eliminar este producto?",
      "admin.configMissing": "Falta configurar Supabase en el archivo config.js. Vea la guía SUPABASE_SETUP.md.",
      "admin.saved": "¡Producto añadido!", "admin.errSave": "Error al guardar. Inténtelo de nuevo.",
      "admin.required": "Rellene el nombre, la categoría y el precio."
    }
  };

  let lang = localStorage.getItem("idioma");
  if (lang !== "pt" && lang !== "es") lang = "pt";

  function t(key, vars) {
    let s = (DICT[lang] && DICT[lang][key]) || DICT.pt[key] || key;
    if (vars) for (const k in vars) s = s.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
    return s;
  }

  function catLabel(slug) {
    const c = (window.APP_CONFIG.CATEGORIES || []).find((x) => x.slug === slug);
    return c ? (lang === "es" ? c.es : c.pt) : slug;
  }

  function apply() {
    document.documentElement.lang = lang;
    const auto = { year: new Date().getFullYear() }; // {year} disponível em qualquer string
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.getAttribute("data-i18n"), auto); });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.getAttribute("data-i18n-html"), auto); });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"))); });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    // Estado ativo dos botões de idioma
    document.querySelectorAll(".lang-switch [data-lang]").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
    });
    // Avisar scripts dinâmicos (ex.: construtor de orçamento, loja)
    document.dispatchEvent(new CustomEvent("i18n:change", { detail: { lang } }));
  }

  function set(newLang) {
    if (newLang !== "pt" && newLang !== "es") return;
    lang = newLang;
    localStorage.setItem("idioma", lang);
    apply();
  }

  // API pública
  window.I18N = {
    t: t, catLabel: catLabel, apply: apply, set: set,
    get lang() { return lang; }
  };

  // Ligar botões de idioma e aplicar ao carregar
  function init() {
    document.querySelectorAll(".lang-switch [data-lang]").forEach((b) => {
      b.addEventListener("click", () => set(b.getAttribute("data-lang")));
    });
    apply();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
