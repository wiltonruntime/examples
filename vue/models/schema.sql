
-- cat ../js/examples/bootstrap/schema.sql | sqlite3 bootstrapExample.db
begin;

-- postgres sequence
-- drop sequence if exists natproxy_requests_seq;
-- create sequence natproxy_requests_seq;

-- sqlite sequence
drop table if exists bootstrap_users_seq;
create table bootstrap_users_seq(
    value bigint
);
insert into bootstrap_users_seq(value) values(0);

-- users table
drop table if exists bootstrap_users;
create table bootstrap_users(
    id bigint primary key,
    birthday text not null,
    firstname text not null,
    lastname text not null,
    primaryname text not null,
    email text not null,
    allow_spam integer not null
);

-- indices
create index bootstrap_users__fio_idx on bootstrap_users (firstname, lastname, primaryname);

commit;
