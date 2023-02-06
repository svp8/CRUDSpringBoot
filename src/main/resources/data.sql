
  with data(surname, first_name, patronymic, position)  as (
     values
        ( 'Папенькин', 'Владислав', 'Сергеевич', 'boss'),
        ( 'Иванов', 'Иван', 'Иванович', 'worker'),
        ( 'Fktrcttd', 'dfsf', 'fsdfs', 'worker in sklad')
  )
--  ,datae(name, phys_address, legal_address)  as (
--           values
--              ( 'Рога и копыта', 'Ленина 123', 'Пушкина 32'),
--              ( 'Яндекс', 'Ленина 13', 'Пушкина 2'),
--              ( 'Гугл',  'fsdfs 12', 'лджлж 32')
--        )
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





