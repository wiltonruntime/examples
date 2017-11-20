
-- user queries

/** idUpdate */
update bootstrap_users_seq
    set value = value + 1

/** idSelect */
select value as id
from bootstrap_users_seq

/** insert */
insert into bootstrap_users (id, birthday, firstname, lastname, primaryname, email, allow_spam)
    values(:id, :birthday, :firstname, :lastname, :primaryname, :email, :spam)

/** selectById */
select
    id as "id",
    birthday,
    firstname,
    lastname,
    primaryname,
    email as "email",
    allow_spam as "spam"
from bootstrap_users
    where id = :id

/** select */
select
    id as "id",
    birthday,
    firstname,
    lastname,
    primaryname,
    email as "email",
    allow_spam as "spam"
from bootstrap_users
    where 
    ((:birthday is null) or (birthday = :birthday))
    and
    ((:firstname is null) or (firstname = :firstname))
    and
    ((:lastname is null) or (lastname = :lastname))
    and
    ((:primaryname is null) or (primaryname = :primaryname))
    and
    ((:email is null) or (email = :email))
    and 
    ((:spam is null) or (allow_spam = :spam))
order by ${sortType} ${sortDirection}
-- cannot make real parameters work with sqlite
-- on postgres always use real parameters
limit ${limit}
offset ${offset}

/** count */
select count(1) as count from bootstrap_users
