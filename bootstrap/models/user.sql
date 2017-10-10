
-- user queries

/** userIdUpdate */
update bootstrap_users_seq
    set value = value + 1

/** userIdSelect */
select value as id
from bootstrap_users_seq

/** userInsert */
insert into bootstrap_users (id, nick, email, allow_spam)
    values(:id, :nick, :email, :spam)

/** userSelectById */
select 
    id as id,
    nick as nick,
    email as email,
    allow_spam as spam
from bootstrap_users
    where id = :id

/** userSelect */
select 
    id as id,
    nick as nick,
    email as email,
    allow_spam as spam
from bootstrap_users
    where 
    ((:nick is NULL) or (nick = :name))
    and
    ((:email is NULL) or (email = :email))
    and 
    ((:spam is NULL) or (allow_spam = :spam))
order by id
