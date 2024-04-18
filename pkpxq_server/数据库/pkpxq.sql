-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2023-12-24 18:14:45
-- 服务器版本： 8.0.12
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `pkpxq`
--

-- --------------------------------------------------------

--
-- 表的结构 `app_config`
--

CREATE TABLE `app_config` (
  `id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `value` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `app_config`
--

INSERT INTO `app_config` (`id`, `name`, `value`) VALUES
(1, 'notice', '{\"path\":\"\",\"text\":\"请遵守社区规则，若违反规则会处理封号处罚。\"}'),
(2, 'banner', '[\"/uploads/other/1703236402231-banner.jpg\"]');

-- --------------------------------------------------------

--
-- 表的结构 `follow`
--

CREATE TABLE `follow` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL COMMENT '粉丝Id',
  `followeeId` int(11) NOT NULL COMMENT '关注的用户id',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1关注0取消',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `follow`
--

INSERT INTO `follow` (`id`, `userId`, `followeeId`, `status`, `createTime`) VALUES
(17, 10001, 10000, 1, '2023-12-23 00:47:23'),
(18, 10002, 10000, 1, '2023-12-23 01:40:32'),
(19, 10002, 10001, 1, '2023-12-23 01:40:35');

-- --------------------------------------------------------

--
-- 表的结构 `post`
--

CREATE TABLE `post` (
  `postId` int(11) NOT NULL COMMENT 'ID',
  `userId` int(11) NOT NULL COMMENT '用户ID',
  `cateId` int(11) NOT NULL COMMENT '分类ID',
  `topic_id` int(11) NOT NULL DEFAULT '1' COMMENT '圈子Id，1:官方',
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '内容',
  `cover_img` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '封面图片',
  `type` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '帖子类型，与小程序区分',
  `media` varchar(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '[]' COMMENT '媒体',
  `tags` varchar(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '标签',
  `viewNum` int(11) NOT NULL DEFAULT '0' COMMENT '浏览量',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `status` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '帖子状态',
  `isDelete` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '是否删除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `post`
--

INSERT INTO `post` (`postId`, `userId`, `cateId`, `topic_id`, `title`, `content`, `cover_img`, `type`, `media`, `tags`, `viewNum`, `createTime`, `updateTime`, `status`, `isDelete`) VALUES
(40, 10000, 3, 1, '如何养成早起习惯', '早起是一个良好的生活习惯，它可以给我们的一天注入更多的活力和效率。首先，早起可以让我们有足够的时间享受早餐，这是一天中最重要的一餐，可以为我们提供所需的能量。其次，早上的空气清新，可以让我们呼吸到新鲜的空气，促进新陈代谢，提高身体的免疫力。此外，早起还可以给我们更多的时间来规划一天的工作和生活，减少焦虑和压力。因此，养成良好的早起习惯，对我们的身心健康和生活质量都有着积极的影响。', NULL, '2', '[]', '[]', 4, '2023-12-22 17:15:21', '2023-12-22 17:16:56', '0', '0'),
(41, 10000, 3, 1, '如何有效管理时间', '时间管理对于提高工作效率和生活质量非常重要。首先，我们需要制定合理的计划和目标，将任务分解为小步骤，并按照优先级进行排序。其次，我们可以使用时间管理工具，如日程表、提醒事项等，帮助我们更好地组织和安排时间。此外，要学会合理分配时间，避免拖延和浪费时间，专注于重要的任务，并设定时间限制来增加工作动力。最后，要学会合理安排休息时间，保持身心的平衡和健康。通过有效管理时间，我们可以提高工作效率，更好地平衡工作和生活。\n', NULL, '2', '[]', '[]', 0, '2023-12-22 17:17:28', '2023-12-22 17:17:28', '0', '0'),
(42, 10000, 2, 1, 'HTML基础', '# CSS 基础\n\n## 什么是 CSS？\nCSS（层叠样式表）是一种用于描述网页样式和布局的样式表语言。它与 HTML 结合使用，可以控制网页元素的外观、排版和交互效果。\n\n## CSS 选择器\n- 元素选择器：通过元素名称选择元素，例如 `p` 选择所有 `<p>` 元素。\n- 类选择器：通过类名选择元素，例如 `.highlight` 选择具有 `highlight` 类的元素。\n- ID 选择器：通过 ID 名称选择元素，例如 `#header` 选择具有 `header` ID 的元素。\n- 属性选择器：通过元素的属性选择元素，例如 `[type=\"text\"]` 选择所有 `type` 属性为 `text` 的元素。\n- 伪类选择器：通过元素的状态或特定位置选择元素，例如 `:hover` 选择鼠标悬停的元素。\n\n## 常用 CSS 属性\n- `color`：设置文本颜色。\n- `font-size`：设置字体大小。\n- `margin`：设置元素的外边距。\n- `padding`：设置元素的内边距。\n- `background-color`：设置背景颜色。\n- `border`：设置边框样式。\n- `width` 和 `height`：设置元素的宽度和高度。\n- `display`：设置元素的显示方式。', NULL, '1', '[]', '[\"前端\"]', 1, '2023-12-22 17:18:39', '2023-12-22 17:18:42', '0', '0'),
(43, 10000, 2, 1, 'Java基础', '# Java 面向对象编程\n\n## 什么是面向对象编程？\n面向对象编程（OOP）是一种编程范式，通过封装、继承和多态等机制来组织代码并提高代码的重用性、可维护性和可扩展性。\n\n## 类与对象\n- 类是一种模板或蓝图，用于描述某个事物的属性和方法。\n- 对象是类的一个实例，拥有类定义的属性和方法。\n\n## 封装\n封装是一种将数据和行为打包在一起的机制，可以隐藏对象的复杂性并保护数据不被非法访问。\n\n## 继承\n继承是一种从已有的类派生出新的类的机制，新类继承了原有类的属性和方法，并可以添加自己的属性和方法。', NULL, '1', '[]', '[\"Java\"]', 0, '2023-12-22 17:19:18', '2023-12-22 17:19:18', '0', '0'),
(44, 10000, 2, 1, '一些常用java方法', '判断字符串是否为空或 null\n```java\npublic static boolean isNullOrEmpty(String str) {\n    return str == null || str.trim().isEmpty();\n}\n```', NULL, '1', '[]', '[\"Java\"]', 22, '2023-12-22 17:20:16', '2023-12-24 13:44:55', '0', '0'),
(45, 10001, 2, 1, '美景视频', '给大家分享一个美景视频', NULL, '3', '[\"/uploads/post/10001/1703264417740-gHskAfstFhrW420dd258b53c52a43661732402cc971a.mp4\"]', '[]', 6, '2023-12-23 00:56:52', '2023-12-23 01:01:41', '0', '0'),
(46, 10001, 2, 1, '遇到一只狗', '今天在路上遇到一只白色的狗，好像是流浪狗\n\n\n-- 其实是假的', NULL, '2', '[\"/uploads/post/10001/1703264571750-VR8W2qWSMX3Me1a1c30f53d1f638bbc66d216aee3e5c.jpg\"]', '[]', 0, '2023-12-23 01:03:04', '2023-12-23 01:03:04', '0', '0'),
(47, 10001, 2, 1, '这周学习计划', '# 学习计划\n\n## 本周任务\n- 完成数学作业\n- 准备英语演讲稿\n- 复习计算机网络\n\n## 下周任务\n1. 开始准备期末考试\n2. 进行科研项目讨论', NULL, '1', '[]', '[\"书籍\"]', 2, '2023-12-23 01:04:08', '2023-12-23 01:40:34', '0', '0'),
(48, 10002, 4, 1, '分享头像', '分享头像', NULL, '2', '[\"/uploads/post/10002/1703266789182-i5otKx317TaZa8f16dcbb4694eaaf85091cc428b7108.png\",\"/uploads/post/10002/1703266789312-akQb0fadXKYV9330f0a55b97fc3ad897199c6b651c2e.jpg\",\"/uploads/post/10002/1703266789358-h9ajSShtST1b6633dafa2f228639fe31da859aaa0e22.jpg\",\"/uploads/post/10002/1703266789413-5rBw60t7wYm43294ce48f0a0063957421345c4412f77.jpg\",\"/uploads/post/10002/1703266789450-OQBSyiQPV0eJf73dd66c2cbd2274ab1ff168422a12f5.jpg\"]', '[]', 3, '2023-12-23 01:40:05', '2023-12-23 01:44:19', '0', '0'),
(49, 10003, 2, 1, '发个今天我们班的成绩', '\n| 学生姓名 | 学号     | 成绩 |\n| -------- | -------- | ---- |\n| 张三     | 2021001  | 90   |\n| 李四     | 2021002  | 85   |\n| 王五     | 2021003  | 92   |', NULL, '1', '[]', '[\"文档\"]', 3, '2023-12-23 01:42:54', '2023-12-23 19:17:18', '0', '0');

-- --------------------------------------------------------

--
-- 表的结构 `post_category`
--

CREATE TABLE `post_category` (
  `cateId` int(11) NOT NULL COMMENT '分类id',
  `cateName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '分类名称',
  `parentId` int(11) DEFAULT '0' COMMENT '父级id',
  `orderNum` int(11) NOT NULL,
  `status` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '状态',
  `isDelete` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0正常,1删除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `post_category`
--

INSERT INTO `post_category` (`cateId`, `cateName`, `parentId`, `orderNum`, `status`, `isDelete`) VALUES
(1, '根分类', 0, 1, '0', 0),
(2, '笔记', 1, 1, '0', 0),
(3, '日常', 1, 2, '0', 0),
(4, '交友', 1, 3, '0', 0);

-- --------------------------------------------------------

--
-- 表的结构 `post_comment`
--

CREATE TABLE `post_comment` (
  `commentId` int(11) NOT NULL,
  `postId` int(11) NOT NULL COMMENT '帖子id',
  `userId` int(11) NOT NULL COMMENT '用户id',
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '内容',
  `parentId` int(11) NOT NULL DEFAULT '0' COMMENT '0:一级评论;其他为一级评论Id',
  `reply_comment_id` int(11) DEFAULT NULL,
  `reply_user_id` int(11) DEFAULT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0正常，1删除',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `post_comment`
--

INSERT INTO `post_comment` (`commentId`, `postId`, `userId`, `content`, `parentId`, `reply_comment_id`, `reply_user_id`, `isDelete`, `createTime`) VALUES
(1, 44, 10003, '感谢管理员', 0, NULL, NULL, 0, '2023-12-23 01:43:12'),
(2, 48, 10003, '好好看', 0, NULL, NULL, 0, '2023-12-23 01:44:26');

-- --------------------------------------------------------

--
-- 表的结构 `post_comment_thumb`
--

CREATE TABLE `post_comment_thumb` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `post_comment_thumb`
--

INSERT INTO `post_comment_thumb` (`id`, `userId`, `commentId`, `status`, `createTime`) VALUES
(31, 10001, 1, 1, '2023-12-23 19:56:42');

-- --------------------------------------------------------

--
-- 表的结构 `post_favour`
--

CREATE TABLE `post_favour` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL COMMENT '收藏的用户id',
  `postId` int(11) NOT NULL COMMENT '被收藏的帖子id',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1收藏0未收藏',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `post_favour`
--

INSERT INTO `post_favour` (`id`, `userId`, `postId`, `status`, `createTime`) VALUES
(22, 10001, 44, 1, '2023-12-23 00:55:03'),
(23, 10001, 47, 1, '2023-12-23 01:07:21'),
(24, 10003, 49, 1, '2023-12-23 01:43:01'),
(25, 10003, 48, 1, '2023-12-23 01:44:22');

-- --------------------------------------------------------

--
-- 表的结构 `post_thumb`
--

CREATE TABLE `post_thumb` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL COMMENT '点赞的用户id',
  `postId` int(11) NOT NULL COMMENT '被点赞的postId',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0取消,1点赞',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='文章点赞表';

--
-- 转存表中的数据 `post_thumb`
--

INSERT INTO `post_thumb` (`id`, `userId`, `postId`, `status`, `createTime`) VALUES
(24, 10001, 47, 1, '2023-12-23 01:07:20'),
(25, 10003, 49, 1, '2023-12-23 01:43:02'),
(26, 10003, 48, 1, '2023-12-23 01:44:21');

-- --------------------------------------------------------

--
-- 表的结构 `sys_menu`
--

CREATE TABLE `sys_menu` (
  `menuId` bigint(20) NOT NULL COMMENT '菜单ID',
  `menuName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '菜单名称',
  `parentId` bigint(20) DEFAULT '0' COMMENT '父菜单ID',
  `orderNum` int(4) DEFAULT '0' COMMENT '显示顺序',
  `path` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '路由地址',
  `component` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '组件路径',
  `query` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '路由参数',
  `isCache` char(1) COLLATE utf8_unicode_ci DEFAULT '0' COMMENT '是否缓存（0缓存 1不缓存）',
  `menuType` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '菜单类型（M目录 C菜单 F按钮）',
  `visible` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '0' COMMENT '菜单状态（0显示 1隐藏）',
  `status` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `perms` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '权限标识',
  `icon` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '#' COMMENT '菜单图标',
  `createBy` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '创建者',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateBy` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '更新者',
  `updateTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='菜单权限表';

--
-- 转存表中的数据 `sys_menu`
--

INSERT INTO `sys_menu` (`menuId`, `menuName`, `parentId`, `orderNum`, `path`, `component`, `query`, `isCache`, `menuType`, `visible`, `status`, `perms`, `icon`, `createBy`, `createTime`, `updateBy`, `updateTime`, `remark`) VALUES
(1, '系统管理', 0, 8, 'system', NULL, '', '0', 'M', '0', '0', '', 'system', 'admin', '2023-12-14 09:44:31', 'admin', '2023-12-17 21:20:55', '系统管理目录'),
(3, '系统工具', 0, 9, 'tool', NULL, '', '0', 'M', '1', '1', '', 'tool', 'admin', '2023-12-14 09:44:31', 'admin', '2023-12-21 09:55:20', '系统工具目录'),
(4, '帖子管理', 0, 1, 'post', NULL, NULL, '0', 'M', '0', '0', NULL, 'post', 'admin', '2023-12-17 21:21:47', '', NULL, ''),
(5, '用户管理', 0, 2, 'user', NULL, NULL, '0', 'M', '0', '0', NULL, 'user', 'admin', '2023-12-18 00:48:35', '', NULL, ''),
(100, '用户管理', 1, 1, 'user', 'system/user/index', '', '0', 'C', '0', '0', 'system:user:list', 'user', 'admin', '2023-12-14 09:44:31', '', NULL, '用户管理菜单'),
(101, '角色管理', 1, 2, 'role', 'system/role/index', '', '0', 'C', '0', '0', 'system:role:list', 'peoples', 'admin', '2023-12-14 09:44:31', '', NULL, '角色管理菜单'),
(102, '菜单管理', 1, 3, 'menu', 'system/menu/index', '', '0', 'C', '0', '0', 'system:menu:list', 'tree-table', 'admin', '2023-12-14 09:44:31', '', NULL, '菜单管理菜单'),
(115, '表单构建', 3, 1, 'build', 'tool/build/index', '', '0', 'C', '0', '0', 'tool:build:list', 'build', 'admin', '2023-12-14 09:44:31', '', NULL, '表单构建菜单'),
(116, '缓存列表', 1, 4, 'cache', 'system/cache/index', NULL, '0', 'C', '0', '0', 'system:cache:list', 'redis-list', 'admin', '2023-12-17 16:12:33', 'admin', '2023-12-17 19:54:29', ''),
(117, '文件管理', 1, 5, 'upload', 'system/upload/index', NULL, '0', 'C', '0', '0', 'system:upload:list', 'upload', 'admin', '2023-12-17 19:55:17', 'admin', '2023-12-17 19:55:40', ''),
(118, '内容管理', 4, 1, 'post', 'post/post/index', NULL, '0', 'C', '0', '0', NULL, 'post', 'admin', '2023-12-17 21:22:43', 'admin', '2023-12-17 23:29:24', ''),
(119, '分类管理', 4, 2, 'category', 'post/category/index', NULL, '0', 'C', '0', '0', NULL, 'cascader', 'admin', '2023-12-17 22:43:02', '', NULL, ''),
(120, '用户管理', 5, 1, 'user', 'user/user/index', NULL, '0', 'C', '0', '0', NULL, 'list', 'admin', '2023-12-18 00:49:34', 'admin', '2023-12-18 00:49:58', ''),
(121, '标签管理', 4, 3, 'tag', 'post/tag/index', NULL, '0', 'C', '0', '0', NULL, 'build', 'admin', '2023-12-18 23:10:04', '', NULL, ''),
(122, '页面配置', 1, 6, 'app', 'system/app/index', NULL, '0', 'C', '0', '0', NULL, 'server', 'admin', '2023-12-20 15:43:31', '', NULL, ''),
(1002, '用户修改', 100, 3, '', '', '', '0', 'F', '0', '0', 'system:user:edit', '#', 'admin', '2023-12-14 09:44:32', '', NULL, ''),
(1003, '用户删除', 100, 4, '', '', '', '0', 'F', '0', '0', 'system:user:remove', '#', 'admin', '2023-12-14 09:44:32', '', NULL, ''),
(1004, '用户导出', 100, 5, '', '', '', '0', 'F', '0', '0', 'system:user:export', '#', 'admin', '2023-12-14 09:44:32', '', NULL, ''),
(1006, '重置密码', 100, 7, '', '', '', '0', 'F', '0', '0', 'system:user:resetPwd', '#', 'admin', '2023-12-14 09:44:32', '', NULL, ''),
(1007, '角色查询', 101, 1, '', '', '', '0', 'F', '0', '0', 'system:role:query', '#', 'admin', '2023-12-14 09:44:32', '', NULL, ''),
(1008, '角色新增', 101, 2, '', '', '', '0', 'F', '0', '0', 'system:role:add', '#', 'admin', '2023-12-14 09:44:32', '', NULL, ''),
(1009, '角色修改', 101, 3, '', '', '', '0', 'F', '0', '0', 'system:role:edit', '#', 'admin', '2023-12-14 09:44:32', '', NULL, ''),
(1010, '角色删除', 101, 4, '', '', '', '0', 'F', '0', '0', 'system:role:remove', '#', 'admin', '2023-12-14 09:44:32', '', NULL, ''),
(1011, '角色导出', 101, 5, '', '', '', '0', 'F', '0', '0', 'system:role:export', '#', 'admin', '2023-12-14 09:44:32', '', NULL, ''),
(1012, '菜单查询', 102, 1, '', '', '', '0', 'F', '0', '0', 'system:menu:query', '#', 'admin', '2023-12-14 09:44:32', '', NULL, ''),
(1013, '菜单新增', 102, 2, '', '', '', '0', 'F', '0', '0', 'system:menu:add', '#', 'admin', '2023-12-14 09:44:32', '', NULL, '');

-- --------------------------------------------------------

--
-- 表的结构 `sys_role`
--

CREATE TABLE `sys_role` (
  `roleId` bigint(20) NOT NULL COMMENT '角色ID',
  `roleName` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '角色名称',
  `roleKey` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '角色权限字符串',
  `roleSort` int(4) NOT NULL COMMENT '显示顺序',
  `dataScope` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '1' COMMENT '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）',
  `menuCheckStrictly` tinyint(1) DEFAULT '1' COMMENT '菜单树选择项是否关联显示',
  `status` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '角色状态（0正常 1停用）',
  `isDelete` tinyint(1) DEFAULT '0' COMMENT '删除标志（0代表存在 1代表删除）',
  `createBy` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '创建者',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateBy` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '更新者',
  `updateTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='角色信息表';

--
-- 转存表中的数据 `sys_role`
--

INSERT INTO `sys_role` (`roleId`, `roleName`, `roleKey`, `roleSort`, `dataScope`, `menuCheckStrictly`, `status`, `isDelete`, `createBy`, `createTime`, `updateBy`, `updateTime`, `remark`) VALUES
(1, '超级管理员', 'admin', 1, '1', 1, '0', 0, 'admin', '2023-12-14 09:44:31', '', NULL, '超级管理员'),
(2, '小程序管理', 'app', 2, '2', 1, '0', 0, 'admin', '2023-12-14 09:44:31', 'admin', '2023-12-24 14:24:50', '普通角色'),
(8, '帖子管理员', 'post', 3, '1', 1, '0', 0, 'admin', '2023-12-24 14:25:05', 'admin', '2023-12-24 14:25:11', NULL),
(9, '用户管理员', 'user', 4, '1', 1, '0', 0, 'admin', '2023-12-24 14:42:12', '', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `sys_role_menu`
--

CREATE TABLE `sys_role_menu` (
  `roleId` bigint(20) NOT NULL COMMENT '角色ID',
  `menuId` bigint(20) NOT NULL COMMENT '菜单ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='角色和菜单关联表';

--
-- 转存表中的数据 `sys_role_menu`
--

INSERT INTO `sys_role_menu` (`roleId`, `menuId`) VALUES
(2, 1),
(2, 122),
(8, 4),
(8, 118),
(8, 119),
(8, 121),
(9, 5),
(9, 120);

-- --------------------------------------------------------

--
-- 表的结构 `sys_upload`
--

CREATE TABLE `sys_upload` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `adminId` int(11) DEFAULT NULL,
  `path` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `downTimes` int(11) NOT NULL DEFAULT '0',
  `isDelete` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='下载记录表';

--
-- 转存表中的数据 `sys_upload`
--

INSERT INTO `sys_upload` (`id`, `userId`, `adminId`, `path`, `createTime`, `downTimes`, `isDelete`) VALUES
(111, 10000, NULL, '/uploads/avatar/1703236293299-5tbIFqTtA5EH502ab4f260ee3d430470eae2a230819b.jpeg', '2023-12-22 17:11:33', 0, 0),
(112, NULL, 1, '/uploads/other/1703236402231-banner.jpg', '2023-12-22 17:13:22', 0, 0),
(114, 10001, NULL, '/uploads/avatar/1703263637748-LC8cGY5dRhelbc5472aa5f4cde4aae53d51df5b5bdc6.jpg', '2023-12-23 00:47:17', 0, 0),
(115, 10001, NULL, '/uploads/post/10001/1703264417740-gHskAfstFhrW420dd258b53c52a43661732402cc971a.mp4', '2023-12-23 01:00:17', 0, 0),
(116, 10001, NULL, '/uploads/post/10001/1703264571750-VR8W2qWSMX3Me1a1c30f53d1f638bbc66d216aee3e5c.jpg', '2023-12-23 01:02:51', 0, 0),
(117, 10002, NULL, '/uploads/avatar/1703266743121-kKLm6tAccwHw3d6de213bfd5fd1f1ec876cdd3b9d1b1.jpg', '2023-12-23 01:39:03', 0, 0),
(118, 10002, NULL, '/uploads/post/10002/1703266789182-i5otKx317TaZa8f16dcbb4694eaaf85091cc428b7108.png', '2023-12-23 01:39:49', 0, 0),
(119, 10002, NULL, '/uploads/post/10002/1703266789312-akQb0fadXKYV9330f0a55b97fc3ad897199c6b651c2e.jpg', '2023-12-23 01:39:49', 0, 0),
(120, 10002, NULL, '/uploads/post/10002/1703266789358-h9ajSShtST1b6633dafa2f228639fe31da859aaa0e22.jpg', '2023-12-23 01:39:49', 0, 0),
(121, 10002, NULL, '/uploads/post/10002/1703266789413-5rBw60t7wYm43294ce48f0a0063957421345c4412f77.jpg', '2023-12-23 01:39:49', 0, 0),
(122, 10002, NULL, '/uploads/post/10002/1703266789450-OQBSyiQPV0eJf73dd66c2cbd2274ab1ff168422a12f5.jpg', '2023-12-23 01:39:49', 0, 0),
(123, 10003, NULL, '/uploads/avatar/1703266920925-OeustK9vJ33B01d4c293356cc13c580cacea421e245e.jpg', '2023-12-23 01:42:00', 0, 0),
(124, 10004, NULL, '/uploads/avatar/1703330002446-ZDvSAorjFP2G2b98d62a5e22f02056e9f09731f66b1c.jpeg', '2023-12-23 19:13:22', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `sys_user`
--

CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '头像',
  `status` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '账号状态0正常1停用',
  `isDelete` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0正常，1删除',
  `createBy` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateBy` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `remark` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='管理员账号表' ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `sys_user`
--

INSERT INTO `sys_user` (`id`, `username`, `password`, `nickname`, `avatar`, `status`, `isDelete`, `createBy`, `createTime`, `updateBy`, `updateTime`, `remark`) VALUES
(1, 'admin', '$2a$10$H1oYxXgJv0qN8kiWy2cEWO.Ant/zFyUFSC7anRUeeoUB.0LK6jwkK', '皮卡皮', '', '0', 0, NULL, '2023-12-16 19:06:16', 'admin', '2023-12-23 17:46:17', NULL),
(2, 'app', '$2a$10$H1oYxXgJv0qN8kiWy2cEWO.Ant/zFyUFSC7anRUeeoUB.0LK6jwkK', '小程序配置管理员', NULL, '0', 0, NULL, '2023-12-16 20:58:07', 'admin', '2023-12-24 14:46:18', '管理小程序的页面配置信息'),
(15, '帖子管理员', '$2a$10$c2NIQpA2tPCsRV5BE61Of.D5Q176cHVi6S0QKHHBjiAi4k.PQtToS', 'post', NULL, '0', 1, 'admin', '2023-12-24 14:44:03', 'admin', '2023-12-24 14:45:30', '帖子管理员'),
(16, 'post', '$2a$10$c2NIQpA2tPCsRV5BE61Of.D5Q176cHVi6S0QKHHBjiAi4k.PQtToS', '帖子管理员', NULL, '0', 0, 'admin', '2023-12-24 14:45:55', NULL, NULL, NULL),
(17, 'user', '$2a$10$c2NIQpA2tPCsRV5BE61Of.D5Q176cHVi6S0QKHHBjiAi4k.PQtToS', '用户管理员', NULL, '0', 0, 'admin', '2023-12-24 14:46:07', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `sys_user_role`
--

CREATE TABLE `sys_user_role` (
  `userId` bigint(20) NOT NULL COMMENT '用户ID',
  `roleId` bigint(20) NOT NULL COMMENT '角色ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户和角色关联表';

--
-- 转存表中的数据 `sys_user_role`
--

INSERT INTO `sys_user_role` (`userId`, `roleId`) VALUES
(1, 1),
(2, 2),
(15, 8),
(16, 8),
(17, 9);

-- --------------------------------------------------------

--
-- 表的结构 `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tagList` varchar(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `isDelete` tinyint(1) NOT NULL DEFAULT '0',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `tag`
--

INSERT INTO `tag` (`id`, `name`, `tagList`, `status`, `isDelete`, `createTime`) VALUES
(1, '热门', '[\"前端\",\"工具\",\"书籍\",\"GitHub\",\"网页\",\"Java\",\"产品\",\"运营\",\"教程\",\"项目\",\"Javascript\",\"后端\",\"Go\",\"B站\",\"文档\",\"Python\",\"视频\",\"面试题挑战\",\"简历\",\"综合门户\",\"测试\",\"文章\",\"Vue\",\"实习\",\"框架\",\"算法\",\"面试\",\"C++\",\"人工智能\",\"校招\",\"开源\",\"CSS\",\"产品设计\",\"信息安全\",\"数据库\",\"社招\",\"设计\",\"软件\",\"Android\",\"交流社区\",\"Linux\",\"牛客\",\"随笔\",\"React\",\"阿里\",\"插件\",\"腾讯\"]', '0', 0, '2023-12-19 00:16:02'),
(2, '其他', '[\"运维\",\"测试\",\"快乐水\"]', '0', 0, '2023-12-19 00:16:02');

-- --------------------------------------------------------

--
-- 表的结构 `topic`
--

CREATE TABLE `topic` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '名字',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '描述',
  `notice` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT '公告',
  `back_img` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '圈子状态：0正常 ，1 关闭',
  `isDelete` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `topic`
--

INSERT INTO `topic` (`id`, `userId`, `name`, `description`, `notice`, `back_img`, `status`, `isDelete`, `createTime`) VALUES
(1, 10000, '官方圈子', NULL, NULL, NULL, '0', '0', '2023-12-10 03:00:49');

-- --------------------------------------------------------

--
-- 表的结构 `topic_top`
--

CREATE TABLE `topic_top` (
  `id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `topic_top`
--

INSERT INTO `topic_top` (`id`, `topic_id`, `postId`, `createTime`) VALUES
(10032, 1, 44, '2023-12-22 17:54:58');

-- --------------------------------------------------------

--
-- 表的结构 `topic_user`
--

CREATE TABLE `topic_user` (
  `id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `topic_user`
--

INSERT INTO `topic_user` (`id`, `topic_id`, `userId`, `createTime`) VALUES
(6, 1, 10000, '2023-12-22 17:11:10'),
(7, 1, 10001, '2023-12-22 17:57:22'),
(8, 1, 10002, '2023-12-23 01:31:35'),
(9, 1, 10003, '2023-12-23 01:41:00'),
(10, 1, 10004, '2023-12-23 18:09:11');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `openid` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '小程序用户唯一标识',
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户名',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '密码',
  `mobile` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '电话号码',
  `sex` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '性别1男2女0未知',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '头像',
  `brief` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '简介',
  `terminal` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '注册渠道: [1-微信小程序 2-微信公众号 3-H5  4-苹果APP 5-安卓APP]',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `status` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '状态',
  `isDelete` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '状态0正常，1删除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `openid`, `username`, `password`, `mobile`, `sex`, `age`, `nickname`, `avatar`, `brief`, `terminal`, `createTime`, `updateTime`, `status`, `isDelete`) VALUES
(10000, '', 'pkpbp1', 'pkpbp1', '18259560131', '0', NULL, '管理员', '/uploads/avatar/1703236293299-5tbIFqTtA5EH502ab4f260ee3d430470eae2a230819b.jpeg', NULL, '1', '2023-12-22 17:11:10', '2023-12-23 18:08:29', '0', '0'),
(10001, 'o0vPy4mUkU6jofzHN5nx3fN0Wd0g', 'pkpbp2', 'pkpbp', '18259560131', '1', 18, '熙', '/uploads/avatar/1703263637748-LC8cGY5dRhelbc5472aa5f4cde4aae53d51df5b5bdc6.jpg', '我爱吃卤肉饭', '3', '2023-12-22 17:57:22', '2023-12-23 19:28:21', '0', '0'),
(10002, '', 'pkpbp3', 'pkpbp3', '18259560131', '0', NULL, '趣跑乐', '/uploads/avatar/1703266743121-kKLm6tAccwHw3d6de213bfd5fd1f1ec876cdd3b9d1b1.jpg', NULL, '3', '2023-12-23 01:31:35', '2023-12-23 18:08:55', '0', '0'),
(10003, '', 'pkpbp4', 'pkpbp4', '18259560131', '0', NULL, '星球崛起', '/uploads/avatar/1703266920925-OeustK9vJ33B01d4c293356cc13c580cacea421e245e.jpg', NULL, '1', '2023-12-23 01:41:00', '2023-12-23 18:09:00', '0', '0'),
(10004, '', NULL, NULL, '18259560131', '0', NULL, '小熊', '/uploads/avatar/1703330002446-ZDvSAorjFP2G2b98d62a5e22f02056e9f09731f66b1c.jpeg', NULL, '1', '2023-12-23 18:09:11', '2023-12-23 19:28:16', '0', '0');

--
-- 转储表的索引
--

--
-- 表的索引 `app_config`
--
ALTER TABLE `app_config`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`);

--
-- 表的索引 `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`,`followeeId`),
  ADD KEY `follow_ibfk_2` (`followeeId`);

--
-- 表的索引 `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`postId`),
  ADD KEY `cateId` (`cateId`),
  ADD KEY `userId` (`userId`,`cateId`);

--
-- 表的索引 `post_category`
--
ALTER TABLE `post_category`
  ADD PRIMARY KEY (`cateId`);

--
-- 表的索引 `post_comment`
--
ALTER TABLE `post_comment`
  ADD PRIMARY KEY (`commentId`),
  ADD KEY `postId` (`postId`,`userId`),
  ADD KEY `reply_comment_id` (`reply_comment_id`,`reply_user_id`),
  ADD KEY `post_comment_ibfk_1` (`userId`);

--
-- 表的索引 `post_comment_thumb`
--
ALTER TABLE `post_comment_thumb`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`,`commentId`),
  ADD KEY `commentId` (`commentId`);

--
-- 表的索引 `post_favour`
--
ALTER TABLE `post_favour`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`,`postId`),
  ADD KEY `postId` (`postId`);

--
-- 表的索引 `post_thumb`
--
ALTER TABLE `post_thumb`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `postId` (`postId`);

--
-- 表的索引 `sys_menu`
--
ALTER TABLE `sys_menu`
  ADD PRIMARY KEY (`menuId`);

--
-- 表的索引 `sys_role`
--
ALTER TABLE `sys_role`
  ADD PRIMARY KEY (`roleId`);

--
-- 表的索引 `sys_role_menu`
--
ALTER TABLE `sys_role_menu`
  ADD PRIMARY KEY (`roleId`,`menuId`);

--
-- 表的索引 `sys_upload`
--
ALTER TABLE `sys_upload`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`userId`),
  ADD KEY `adminId` (`adminId`);

--
-- 表的索引 `sys_user`
--
ALTER TABLE `sys_user`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `sys_user_role`
--
ALTER TABLE `sys_user_role`
  ADD PRIMARY KEY (`userId`,`roleId`);

--
-- 表的索引 `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- 表的索引 `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- 表的索引 `topic_top`
--
ALTER TABLE `topic_top`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`),
  ADD KEY `topic_id` (`topic_id`);

--
-- 表的索引 `topic_user`
--
ALTER TABLE `topic_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topic_id` (`topic_id`),
  ADD KEY `userId` (`userId`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `openid` (`openid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `app_config`
--
ALTER TABLE `app_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 使用表AUTO_INCREMENT `post`
--
ALTER TABLE `post`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=51;

--
-- 使用表AUTO_INCREMENT `post_category`
--
ALTER TABLE `post_category`
  MODIFY `cateId` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类id', AUTO_INCREMENT=21;

--
-- 使用表AUTO_INCREMENT `post_comment`
--
ALTER TABLE `post_comment`
  MODIFY `commentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `post_comment_thumb`
--
ALTER TABLE `post_comment_thumb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- 使用表AUTO_INCREMENT `post_favour`
--
ALTER TABLE `post_favour`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- 使用表AUTO_INCREMENT `post_thumb`
--
ALTER TABLE `post_thumb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- 使用表AUTO_INCREMENT `sys_menu`
--
ALTER TABLE `sys_menu`
  MODIFY `menuId` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '菜单ID', AUTO_INCREMENT=1063;

--
-- 使用表AUTO_INCREMENT `sys_role`
--
ALTER TABLE `sys_role`
  MODIFY `roleId` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '角色ID', AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `sys_upload`
--
ALTER TABLE `sys_upload`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- 使用表AUTO_INCREMENT `sys_user`
--
ALTER TABLE `sys_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用表AUTO_INCREMENT `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- 使用表AUTO_INCREMENT `topic`
--
ALTER TABLE `topic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `topic_top`
--
ALTER TABLE `topic_top`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10033;

--
-- 使用表AUTO_INCREMENT `topic_user`
--
ALTER TABLE `topic_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10005;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
