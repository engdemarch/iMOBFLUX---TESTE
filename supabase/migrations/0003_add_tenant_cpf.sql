-- CPF do titular da conta, coletado no cadastro (app/signup) para fins de
-- identificação/cobrança. Nunca exposto em tenants_public (só seleciona
-- id, slug, status, config) nem em nenhuma outra view pública.
alter table public.tenants add column cpf text;
