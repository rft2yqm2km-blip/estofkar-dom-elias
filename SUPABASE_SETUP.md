# Ativar a Loja — Guia Supabase (passo a passo)

A loja (`loja.html`) e a página de gestão (`admin.html`) já estão prontas.
Só falta ligar uma base de dados gratuita **Supabase** para guardar os produtos e as fotos.
São ~10 minutos, uma única vez. Segue exatamente esta ordem.

---

## 1. Criar conta e projeto (grátis)

1. Vá a **https://supabase.com** → **Start your project** → entre com email ou Google.
2. **New project**:
   - **Name:** `estofkar` (ou o que quiser)
   - **Database Password:** crie uma e **guarde-a** (não é a password do Elias).
   - **Region:** `West EU (London)` ou `Frankfurt`.
3. Aguarde 1–2 min até o projeto ficar pronto.

## 2. Copiar as chaves para o site

1. No projeto: menu **⚙️ Project Settings → API**.
2. Copie:
   - **Project URL** (ex.: `https://abcd1234.supabase.co`)
   - **anon public** key (uma chave longa)
3. Abra o ficheiro **`config.js`** do site e substitua:
   ```js
   SUPABASE_URL: "https://abcd1234.supabase.co",
   SUPABASE_ANON_KEY: "a-sua-chave-anon-public",
   ```
   (a chave `anon public` é segura para ir no site — é a chave "de leitura pública".)

## 3. Criar a tabela de produtos

1. No Supabase: menu **SQL Editor → New query**.
2. Cole **todo** o bloco abaixo e carregue em **Run**:

```sql
-- Tabela de produtos da loja
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  title text not null,
  category text not null,
  price numeric not null default 0,
  quantity int not null default 1,
  description text,
  image_url text,
  image_path text,
  sold boolean not null default false
);

alter table public.products enable row level security;

-- Toda a gente pode VER os produtos
create policy "produtos_visiveis_todos"
  on public.products for select using (true);

-- Só quem tem sessão iniciada (o Elias) pode gerir
create policy "produtos_insert_auth"
  on public.products for insert to authenticated with check (true);
create policy "produtos_update_auth"
  on public.products for update to authenticated using (true);
create policy "produtos_delete_auth"
  on public.products for delete to authenticated using (true);
```

## 4. Criar o "armazém" das fotos (Storage)

1. Menu **Storage → New bucket**.
2. Nome: **`produtos`** (tem de ser igual ao `BUCKET` do `config.js`).
3. Marque **Public bucket** ✅ → **Save**.
4. Volte ao **SQL Editor → New query**, cole e **Run**:

```sql
-- Fotos visíveis a todos; upload/apagar só autenticado
create policy "fotos_publicas"
  on storage.objects for select using ( bucket_id = 'produtos' );
create policy "fotos_upload_auth"
  on storage.objects for insert to authenticated with check ( bucket_id = 'produtos' );
create policy "fotos_delete_auth"
  on storage.objects for delete to authenticated using ( bucket_id = 'produtos' );
```

## 5. Criar o login do Elias

1. Menu **Authentication → Users → Add user → Create new user**.
2. **Email** e **Password** que o Elias vai usar para entrar (ex.: o email dele).
3. Marque **Auto Confirm User** ✅ (para entrar logo, sem confirmar email).
4. **Create user**.

## 6. Testar

1. Abra **`admin.html`** do site (ex.: `…github.io/estofkar-dom-elias/admin.html`).
2. Entre com o email/password do passo 5.
3. **Adicionar produto:** nome, categoria, preço, quantidade, foto → **Guardar**.
4. Abra **`loja.html`** → o produto deve aparecer.
5. Carregue em **"Estou interessado"** → abre o WhatsApp com a mensagem pronta. ✅

---

### Notas
- **Endereço da gestão:** `…/admin.html` — guarde como favorito no telemóvel do Elias.
- **Marcar vendido** esconde o produto da loja; **Eliminar** apaga-o de vez (e à foto).
- Tudo isto é **gratuito** no plano free do Supabase (mais que suficiente).
- As categorias da loja mudam-se no `config.js` (lista `CATEGORIES`).
