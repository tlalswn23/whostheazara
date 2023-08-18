create table user_level
(
    level_seq bigint auto_increment
        primary key,
    exp       bigint default 0 null,
    level     int    default 1 null,
    user_seq  bigint           not null,
    constraint UK_d69gni1hl8vjlh8eh2d32cw1r
        unique (user_seq),
    constraint FKj3oeqx1pwl3kerod5l53bfh2a
        foreign key (user_seq) references user (user_seq)
);

INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (9, 238, 8, 26);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (10, 1073, 19, 24);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (11, 173, 13, 25);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (12, 132, 9, 43);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (13, 369, 10, 34);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (14, 445, 12, 44);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (15, 29, 11, 35);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (16, 888, 17, 33);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (17, 266, 8, 37);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (18, 230, 9, 36);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (19, 202, 7, 27);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (20, 1588, 24, 4);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (21, 128, 4, 2);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (22, 98, 8, 51);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (23, 163, 1, 47);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (24, 121, 4, 45);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (25, 152, 3, 42);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (26, 118, 4, 46);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (27, 144, 4, 41);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (28, 89, 5, 38);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (29, 75, 3, 40);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (30, 361, 3, 87);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (31, 118, 4, 84);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (32, 115, 7, 50);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (33, 147, 3, 86);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (34, 134, 3, 85);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (35, 52, 4, 83);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (36, 408, 10, 28);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (37, 135, 12, 74);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (38, 375, 13, 75);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (39, 468, 12, 77);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (40, 535, 12, 76);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (41, 175, 1, 92);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (42, 148, 1, 90);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (43, 364, 2, 91);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (44, 271, 5, 89);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (45, 121, 1, 93);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (46, 39, 4, 61);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (47, 34, 2, 60);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (48, 153, 1, 63);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (49, 4, 2, 62);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (50, 138, 2, 59);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (51, 126, 9, 78);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (52, 0, 2, 80);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (53, 964, 20, 1);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (54, 109, 2, 73);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (55, 264, 7, 56);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (56, 284, 7, 5);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (57, 107, 4, 29);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (58, 171, 2, 30);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (59, 12, 2, 98);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (60, 12, 2, 95);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (61, 12, 2, 97);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (62, 159, 1, 99);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (63, 849, 19, 3);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (64, 200, 10, 12);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (65, 956, 19, 10);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (66, 107, 3, 32);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (67, 194, 2, 101);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (68, 160, 1, 100);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (69, 203, 2, 14);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (70, 190, 1, 102);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (71, 180, 4, 65);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (72, 274, 14, 58);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (73, 349, 7, 67);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (74, 85, 2, 103);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (75, 114, 1, 104);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (76, 125, 2, 79);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (77, 175, 3, 55);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (78, 3, 3, 57);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (79, 21, 3, 70);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (80, 284, 6, 71);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (81, 104, 3, 68);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (82, 178, 3, 54);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (83, 180, 3, 72);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (84, 128, 4, 49);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (85, 105, 2, 52);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (86, 144, 3, 31);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (87, 0, 2, 64);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (88, 0, 2, 107);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (89, 0, 2, 108);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (90, 43, 18, 6);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (91, 243, 18, 8);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (92, 779, 16, 7);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (93, 201, 2, 113);
INSERT INTO s09p12d206.user_level (level_seq, exp, level, user_seq) VALUES (94, 176, 2, 39);
