-- Create the matching Morbius profile whenever Supabase Auth creates a user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  base_name text;
  safe_name text;
begin
  base_name := pg_catalog.lower(
    pg_catalog.regexp_replace(
      coalesce(
        nullif(new.raw_user_meta_data ->> 'display_name', ''),
        pg_catalog.split_part(coalesce(new.email, ''), '@', 1),
        'builder'
      ),
      '[^a-zA-Z0-9_]',
      '',
      'g'
    )
  );

  if pg_catalog.char_length(base_name) < 3 then
    base_name := 'builder';
  end if;

  safe_name := pg_catalog.left(base_name, 23) || '_' ||
    pg_catalog.left(pg_catalog.replace(new.id::text, '-', ''), 8);

  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    safe_name,
    nullif(new.raw_user_meta_data ->> 'display_name', '')
  );

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
