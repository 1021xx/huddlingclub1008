-- Run in Supabase SQL Editor. Existing invitations remain ownerless and private.
begin;

alter table public.invitations add column if not exists host_id uuid references auth.users(id);
create index if not exists invitations_host_id_idx on public.invitations(host_id);
create index if not exists rsvps_invitation_id_idx on public.rsvps(invitation_id);
alter table public.invitations enable row level security;
alter table public.rsvps enable row level security;

-- Remove old permissive policies: permissive policies are combined with OR.
do $$
declare p record;
begin
  for p in select tablename, policyname from pg_policies
    where schemaname = 'public' and tablename in ('invitations', 'rsvps')
  loop
    execute format('drop policy %I on public.%I', p.policyname, p.tablename);
  end loop;
end $$;

revoke all on public.invitations, public.rsvps from anon, authenticated;
grant select on public.invitations to anon, authenticated;
grant insert (title, date, location, body, host_id) on public.invitations to authenticated;
grant insert (invitation_id, name, status, companions) on public.rsvps to anon, authenticated;
grant select on public.rsvps to authenticated;

create policy invitation_public_read on public.invitations
  for select to anon, authenticated using (true);
create policy invitation_host_create on public.invitations
  for insert to authenticated with check (host_id = (select auth.uid()));
create policy rsvp_public_submit on public.rsvps
  for insert to anon, authenticated with check (
    exists (select 1 from public.invitations i where i.id = invitation_id)
    and length(trim(name)) between 1 and 100
    and status in ('yes', 'no') and companions between 0 and 2147483647
  );
create policy rsvp_host_read on public.rsvps
  for select to authenticated using (
    exists (select 1 from public.invitations i
      where i.id = invitation_id and i.host_id = (select auth.uid()))
  );

commit;
