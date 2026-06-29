# Estofkar Dom Elias — Website

Site **one-page** estático (HTML + CSS + JavaScript puro). **Não precisa de instalação nem build**:
basta abrir o `index.html` no navegador, ou alojá-lo em qualquer servidor/hosting.

## Ficheiros

```
index.html      → página principal (PT/ES)
loja.html       → loja pública (produtos à venda)
admin.html      → gestão da loja (login do Elias)
style.css       → estilos (paleta azul/amarelo/branco, responsivo)
script.js       → menu, animações, slider antes/depois, galeria, orçamento
config.js       → contactos, dados do Supabase e categorias da loja
i18n.js         → traduções Português / Espanhol
store.js        → loja pública (lê o Supabase)
admin.js        → gestão de produtos (Supabase Auth + Storage)
assets/         → fotos reais (originais em assets/_originais/)
SUPABASE_SETUP.md → guia para ativar a loja (login + base de dados)
```

## 🛒 Loja com login (Supabase)

A loja e a gestão de produtos estão prontas mas **precisam de ser ativadas** uma vez:
siga o guia **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** (cerca de 10 min) e preencha as
chaves em `config.js`. Enquanto não estiver configurado, a loja mostra "a ser configurada".

- **Idioma:** seletor **PT/ES** no topo de todas as páginas.
- **Gestão:** `admin.html` — o Elias entra e adiciona/remove produtos sozinho.

## ✅ O que falta preencher (procure por `⟦PREENCHER⟧` no código)

1. **Morada e cidade** — em `index.html`, secção *Contactos* e no bloco JSON-LD (topo).
2. **Horário de funcionamento** — secção *Contactos*.
3. **Redes sociais** (Instagram / Facebook) — no rodapé. Remova se não existirem.
4. **Mapa** (opcional) — há um `<iframe>` comentado na secção *Contactos* pronto a ativar.

> As **fotos reais já estão colocadas** (trabalhos da oficina). Os ficheiros originais
> ficaram guardados em `assets/_originais/`. Para trocar uma foto, basta substituir o
> ficheiro em `assets/` mantendo o mesmo nome (ex.: `hero.jpg`, `auto-1.jpg`, `mota-1.jpg`).

## Contactos já configurados

- **WhatsApp / Telefone:** +351 932 236 739
- **Email:** estofkar@gmail.com

Para os alterar, edite o topo de `script.js` (`WHATSAPP`, `EMAIL`) e os links em `index.html`.
