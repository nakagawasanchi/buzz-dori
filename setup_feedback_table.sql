-- しゅりさんメモ用テーブル（レビュー期間だけ使用・ローンチ時に削除可）
-- Supabase SQL Editor（tracingmapプロジェクト）に貼り付けてRunしてください
create table if not exists public.buzzdori_feedback (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  body text not null,
  created_at timestamptz not null default now()
);
alter table public.buzzdori_feedback enable row level security;
create policy "bf_select" on public.buzzdori_feedback for select using (true);
create policy "bf_insert" on public.buzzdori_feedback for insert with check (true);
create policy "bf_delete" on public.buzzdori_feedback for delete using (true);
grant select, insert, delete on public.buzzdori_feedback to anon;
