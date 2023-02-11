
  with data(surname, first_name, patronymic, position)  as (
     values
        ( 'abc', 'abc', 'abc', 'boss'),
        ( 'csa', 'cba', 'cba', 'worker'),
        ( 'Fktrcttd', 'dfsf', 'fsdfs', 'worker in sklad')
  )

  insert into employee (surname, first_name, patronymic, position)
  select d.surname, d.first_name, d.patronymic, d.position
  from data d
  where not exists (SELECT * FROM employee);

  insert into organisation (name, phys_address, legal_address)
    select d.name, d.phys_address, d.legal_address
    from (select 'Рога и копыта' as name, 'Ленина 123' as phys_address, 'Пушкина 32' as legal_address
     union all
        select 'Яндекс', 'Ленина 13', 'Пушкина 2'
        union all
               select 'Гугл',  'fsdfs 12', 'лджлж 32'
     ) as d
    where not exists (SELECT * FROM organisation);
  insert into department (name, contact_info, manager_id)
        select d.name, d.contact_info, d.manager_id
        from (select 'IT' as name, '21321' as contact_info, 1 as manager_id
         union all
            select 'Money', '1213', 1
            union all
                   select 'Security',  '1111', 1
         ) as d
        where not exists (SELECT * FROM department);





