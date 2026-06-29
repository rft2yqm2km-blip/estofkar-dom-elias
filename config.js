// ============================================================
// CONFIGURAÇÃO GLOBAL — Estofkar Dom Elias
// Altere aqui os contactos, os dados do Supabase e as categorias.
// ============================================================
window.APP_CONFIG = {
  // Contactos (WhatsApp sem "+" e sem espaços)
  WHATSAPP: "351932236739",
  EMAIL: "estofkar@gmail.com",

  // --- SUPABASE (necessário para a loja) ------------------------------
  // ⟦PREENCHER⟧ — copie de: Supabase → Project Settings → API
  SUPABASE_URL: "⟦PREENCHER_SUPABASE_URL⟧",        // ex.: https://abcd1234.supabase.co
  SUPABASE_ANON_KEY: "⟦PREENCHER_SUPABASE_ANON_KEY⟧", // a chave "anon public"
  BUCKET: "produtos",                                  // bucket de Storage para as fotos

  // Categorias da loja (slug interno + etiquetas PT/ES).
  // Para acrescentar uma categoria, adicione uma linha aqui.
  CATEGORIES: [
    { slug: "automovel",  pt: "Automóvel",                    es: "Automóvil" },
    { slug: "mobiliario", pt: "Sofás & Mobiliário",           es: "Sofás y Mobiliario" },
    { slug: "cadeiras",   pt: "Cadeiras & Clássicos",         es: "Sillas y Clásicos" },
    { slug: "motas",      pt: "Motas & Scooters",             es: "Motos y Scooters" },
    { slug: "materiais",  pt: "Materiais (pele, napa, tecido)", es: "Materiales (piel, napa, tela)" },
    { slug: "outros",     pt: "Outros",                       es: "Otros" }
  ]
};

// Verdadeiro quando o Supabase ainda não foi configurado.
window.APP_CONFIG.supabaseReady = !String(window.APP_CONFIG.SUPABASE_URL).includes("PREENCHER");
