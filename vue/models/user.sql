
-- user queries

/** idUpdate */
update bootstrap_users_seq
    set value = value + 1

/** idSelect */
select value as id
from bootstrap_users_seq

/** insert */
insert into bootstrap_users (id, date_added, nick, email, allow_spam)
    values(:id, :dateAdded, :nick, :email, :spam)

/** selectById */
select
    id as "id",
    date_added as "dateAdded",
    nick as "nick",
    email as "email",
    allow_spam as "spam"
from bootstrap_users
    where id = :id

/** select */
select
    id as "id",
    nick as "nick",
    email as "email",
    allow_spam as "spam"
from bootstrap_users
    where 
    ((:dateAdded is null) or (date_added = :dateAdded))
    and
    ((:nick is null) or (nick = :name))
    and
    ((:email is null) or (email = :email))
    and 
    ((:spam is null) or (allow_spam = :spam))
order by id desc
-- cannot make real parameters work with sqlite
-- on postgres always use real parameters
limit ${limit}
offset ${offset}

/** count */
select count(1) as count from bootstrap_users
