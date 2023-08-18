create table job
(
    job_seq     bigint auto_increment
        primary key,
    created_at  datetime(6)  null,
    description varchar(255) not null,
    name        varchar(255) not null,
    updated_at  datetime(6)  null
);

INSERT INTO s09p12d206.job (job_seq, created_at, description, name, updated_at) VALUES (1, '2023-07-25 10:23:45.404463', '능력 없음', 'Citizen', '2023-07-25 10:23:45.404463');
INSERT INTO s09p12d206.job (job_seq, created_at, description, name, updated_at) VALUES (2, '2023-07-25 13:13:40.000000', '밤 - 지목한 1인을 죽일 수 있음', 'Mafia', '2023-07-25 13:14:06.000000');
INSERT INTO s09p12d206.job (job_seq, created_at, description, name, updated_at) VALUES (3, '2023-07-25 10:24:16.641608', '밤 - 마피아에게 지목당한 사람을 살릴 수 있음', 'Doctor', '2023-07-25 10:24:16.641608');
INSERT INTO s09p12d206.job (job_seq, created_at, description, name, updated_at) VALUES (4, '2023-07-25 10:24:30.526859', '밤 - 한 명을 지목하여 마피아인지 아닌지 확인할 수 있음', 'Police', '2023-07-25 10:24:30.526859');
INSERT INTO s09p12d206.job (job_seq, created_at, description, name, updated_at) VALUES (5, '2023-07-25 10:24:44.905973', '낮 - 투표할 때 2표로 반영됨', 'Politician', '2023-07-25 10:24:44.905973');
INSERT INTO s09p12d206.job (job_seq, created_at, description, name, updated_at) VALUES (6, '2023-07-25 10:25:01.780525', '밤 - 마피아의 공격을 한 번 버틸 수 있음', 'Soldier', '2023-07-25 10:25:01.780525');
INSERT INTO s09p12d206.job (job_seq, created_at, description, name, updated_at) VALUES (7, '2023-07-25 10:25:26.892640', '밤 - 한 명을 지목하여 다음날 투표하지 못하게 할 수 있음', 'Gangster', '2023-07-25 10:25:26.892640');
