-- ImobFlux Fase 3: fecha a brecha em que o dono do tenant podia gravar
-- status/billing diretamente do navegador (ex:
-- supabase.from('tenants').update({status:'active'})), bypassando o Stripe
-- por completo. A partir de agora:
--   - INSERT em tenants só acontece via webhook (service_role, que ignora
--     RLS/GRANTs) — a criação do tenant passa a depender de pagamento confirmado.
--   - UPDATE por authenticated só pode tocar a coluna config (usada por
--     saveConfig() em lib/db.ts), nunca status/billing_*/plan_slug/trial_ends_at.

drop policy "tenant owner inserts own tenant" on public.tenants;
revoke insert on public.tenants from authenticated;

revoke update on public.tenants from authenticated;
grant update (config, updated_at) on public.tenants to authenticated;
