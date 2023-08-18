create table user_item
(
    user_item_seq bigint auto_increment
        primary key,
    buy_at        datetime(6)      null,
    item_seq      bigint           null,
    user_seq      bigint           null,
    equipped      bit default b'0' null,
    constraint FKb1lriv2jjkjww4l8rx52v89x9
        foreign key (item_seq) references item (item_seq)
            on delete cascade,
    constraint FKlftjmdhiqt26dh112a1r5xcqs
        foreign key (user_seq) references user (user_seq)
            on delete cascade
);

INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (12, '2023-08-03 16:35:27.162061', 107, 5, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (13, '2023-08-03 16:35:27.248537', 303, 5, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (14, '2023-08-03 16:35:27.318579', 202, 5, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (15, '2023-08-03 16:38:51.970344', 105, 5, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (16, '2023-08-04 13:43:14.145962', 106, 5, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (17, '2023-08-04 13:43:14.231705', 302, 5, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (18, '2023-08-04 13:43:21.504671', 301, 5, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (19, '2023-08-05 14:00:53.854176', 101, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (20, '2023-08-05 14:00:53.918987', 301, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (21, '2023-08-05 14:00:53.962818', 201, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (22, '2023-08-05 14:09:46.334212', 102, 1, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (23, '2023-08-05 14:09:46.399238', 302, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (24, '2023-08-05 14:09:46.444245', 202, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (25, '2023-08-05 14:13:51.644715', 108, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (26, '2023-08-05 14:13:51.718354', 303, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (27, '2023-08-05 14:13:51.764565', 203, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (28, '2023-08-05 14:15:48.359571', 103, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (29, '2023-08-05 14:16:28.738791', 104, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (30, '2023-08-06 04:57:32.749805', 105, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (31, '2023-08-06 04:57:40.278787', 106, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (32, '2023-08-06 04:57:42.490485', 107, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (33, '2023-08-06 04:57:47.678499', 109, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (34, '2023-08-06 04:57:48.643395', 110, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (35, '2023-08-06 04:58:03.565595', 305, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (36, '2023-08-06 04:58:04.660456', 304, 1, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (37, '2023-08-07 12:43:21.474733', 106, 10, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (38, '2023-08-08 23:26:27.538526', 102, 4, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (39, '2023-08-08 23:26:27.615472', 301, 4, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (40, '2023-08-08 23:26:27.661383', 202, 4, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (41, '2023-08-11 22:00:36.948469', 109, 4, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (42, '2023-08-13 16:40:27.573060', 101, 33, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (43, '2023-08-13 16:40:27.626660', 305, 33, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (44, '2023-08-13 16:40:46.631003', 207, 35, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (45, '2023-08-13 16:41:27.428379', 204, 34, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (46, '2023-08-13 17:00:55.004952', 105, 38, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (47, '2023-08-13 17:00:55.062907', 202, 38, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (48, '2023-08-13 17:00:55.106630', 301, 38, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (49, '2023-08-13 17:01:34.972707', 102, 39, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (50, '2023-08-13 17:01:35.026394', 203, 39, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (51, '2023-08-13 17:01:35.070397', 304, 39, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (52, '2023-08-13 17:02:49.610072', 213, 36, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (53, '2023-08-13 17:59:04.565121', 109, 37, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (54, '2023-08-13 18:37:54.039329', 104, 25, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (55, '2023-08-13 18:37:54.093659', 304, 25, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (56, '2023-08-13 19:30:23.491286', 101, 40, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (57, '2023-08-13 19:30:23.551276', 301, 40, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (58, '2023-08-13 19:30:34.883847', 103, 41, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (59, '2023-08-13 19:30:34.943157', 203, 41, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (60, '2023-08-13 19:30:34.990182', 303, 41, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (61, '2023-08-13 23:20:38.882396', 201, 4, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (62, '2023-08-14 11:02:15.168338', 312, 24, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (63, '2023-08-14 11:02:23.459834', 207, 24, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (65, '2023-08-14 20:24:28.881302', 107, 4, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (66, '2023-08-15 00:23:01.718242', 106, 2, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (67, '2023-08-15 00:23:01.776020', 209, 2, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (68, '2023-08-15 00:23:01.820719', 311, 2, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (69, '2023-08-15 00:23:37.171372', 102, 2, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (70, '2023-08-15 00:23:40.281686', 103, 2, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (71, '2023-08-15 00:23:41.785125', 104, 2, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (72, '2023-08-15 00:23:44.963717', 108, 2, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (73, '2023-08-15 00:23:46.471581', 107, 2, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (74, '2023-08-15 00:23:53.236073', 105, 2, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (75, '2023-08-15 00:23:55.247094', 302, 2, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (76, '2023-08-15 00:23:59.130817', 303, 2, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (77, '2023-08-15 00:24:00.886016', 307, 2, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (78, '2023-08-15 00:24:02.863753', 306, 2, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (79, '2023-08-15 00:24:05.486019', 308, 2, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (80, '2023-08-15 10:55:49.978527', 210, 25, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (81, '2023-08-15 14:56:09.457097', 103, 4, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (82, '2023-08-15 14:56:33.524234', 106, 4, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (83, '2023-08-15 15:05:00.746028', 101, 4, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (84, '2023-08-15 15:26:51.049011', 203, 33, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (85, '2023-08-15 15:29:00.502743', 102, 33, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (86, '2023-08-15 19:20:31.944319', 207, 4, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (87, '2023-08-15 19:20:57.736023', 203, 4, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (88, '2023-08-15 19:25:28.373161', 101, 26, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (89, '2023-08-15 19:27:20.400018', 301, 26, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (90, '2023-08-15 19:33:26.803370', 201, 26, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (91, '2023-08-15 19:39:23.080348', 102, 26, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (92, '2023-08-15 19:52:47.219210', 101, 25, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (93, '2023-08-15 19:53:11.858124', 301, 25, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (94, '2023-08-15 19:53:43.120467', 201, 25, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (95, '2023-08-16 00:16:05.959021', 102, 78, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (96, '2023-08-16 00:16:05.959021', 203, 78, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (97, '2023-08-16 00:16:05.959021', 301, 78, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (98, '2023-08-16 00:16:49.558187', 103, 78, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (99, '2023-08-16 00:17:39.886785', 104, 78, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (100, '2023-08-16 00:20:46.911180', 302, 4, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (101, '2023-08-16 00:22:28.720491', 105, 78, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (102, '2023-08-16 11:37:25.871150', 102, 28, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (103, '2023-08-16 11:37:25.958237', 203, 28, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (104, '2023-08-16 11:37:26.000765', 301, 28, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (105, '2023-08-16 13:44:00.528062', 101, 95, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (106, '2023-08-16 13:44:20.540969', 101, 97, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (108, '2023-08-16 14:11:20.939920', 109, 33, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (109, '2023-08-16 14:11:44.468597', 210, 33, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (110, '2023-08-16 14:12:09.307251', 106, 12, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (111, '2023-08-16 14:12:09.358514', 207, 12, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (112, '2023-08-16 14:12:09.399242', 301, 12, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (113, '2023-08-16 14:12:17.359492', 109, 10, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (114, '2023-08-16 14:12:17.410696', 309, 10, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (116, '2023-08-16 14:13:05.711709', 301, 3, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (117, '2023-08-16 14:13:14.966588', 208, 1, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (118, '2023-08-16 14:13:15.016870', 312, 1, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (119, '2023-08-16 14:13:21.280328', 214, 10, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (120, '2023-08-16 14:13:43.972760', 306, 3, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (121, '2023-08-16 16:37:45.120953', 304, 3, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (122, '2023-08-16 16:38:31.739385', 208, 3, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (123, '2023-08-17 00:31:38.223299', 103, 39, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (124, '2023-08-17 10:17:51.306902', 304, 4, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (125, '2023-08-17 10:27:49.081831', 304, 2, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (126, '2023-08-17 12:07:02.900927', 111, 108, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (127, '2023-08-17 12:07:47.173382', 202, 108, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (128, '2023-08-17 12:08:00.875826', 302, 108, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (129, '2023-08-17 12:08:14.994124', 103, 108, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (130, '2023-08-17 12:08:17.025793', 102, 108, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (131, '2023-08-17 12:40:10.278817', 101, 3, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (132, '2023-08-17 12:44:15.731552', 213, 3, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (133, '2023-08-17 19:47:22.286066', 102, 3, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (134, '2023-08-17 20:32:57.198941', 207, 33, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (135, '2023-08-17 20:32:57.250549', 308, 33, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (136, '2023-08-17 20:54:35.610553', 103, 33, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (137, '2023-08-17 20:56:10.273353', 306, 33, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (138, '2023-08-17 23:45:04.359107', 305, 3, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (139, '2023-08-18 00:19:12.470523', 108, 24, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (140, '2023-08-18 00:19:12.525819', 303, 24, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (141, '2023-08-18 00:19:27.845509', 106, 8, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (142, '2023-08-18 00:19:27.898146', 211, 8, false);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (143, '2023-08-18 00:19:27.940436', 312, 8, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (144, '2023-08-18 00:19:43.665779', 106, 7, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (145, '2023-08-18 00:19:43.717372', 211, 7, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (146, '2023-08-18 00:19:43.758503', 306, 7, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (147, '2023-08-18 00:20:18.326895', 105, 6, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (148, '2023-08-18 00:20:18.377924', 214, 6, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (149, '2023-08-18 00:20:18.419847', 301, 6, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (150, '2023-08-18 01:14:44.841489', 107, 8, true);
INSERT INTO s09p12d206.user_item (user_item_seq, buy_at, item_seq, user_seq, equipped) VALUES (151, '2023-08-18 01:14:56.205343', 202, 8, true);
