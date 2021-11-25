CREATE TABLE users
(id int auto_increment primary key,name varchar(50) not null);

CREATE TABLE projects
(id int auto_increment primary key,name varchar(50) not null,description varchar(100) not null,status varchar(20) not null,created_at DATETIME DEFAULT CURRENT_TIMESTAMP,updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,project_manager int not null,foreign key(project_manager) references users(id));

CREATE TABLE users_projects
(id int auto_increment primary key,project_id int,user_id int,foreign key(project_id) references projects(id),foreign key(user_id) references users(id));

insert into users(name) values ("admin");
insert into users(name) values ("user1");
insert into users(name) values ("user2");

insert into projects(name,description,status,project_manager) values ("api","node api","open",1);
insert into projects(name,description,status,project_manager) values ("api","node api","open",2);
insert into projects(name,description,status,project_manager) values ("api","node api","open",1);
insert into projects(name,description,status,project_manager) values ("api","node api","open",3);