---
date: '2025-09-03T20:38:48+08:00'
title: 'v4.0.0 的新变化'
---

![alt text](/source/images/what-is-changed-in-4.0.0/image.png)

感谢所有的开发者和用户对 AstrBot 的支持。AstrBot 在不断地发展和完善中，致力于为用户提供更好的体验和更多的功能。

## 功能更新

### 多配置文件

我们在这一版本引入了全新的多配置文件管理功能，这意味着，**你可以灵活地创建配置文件，并将配置文件应用到你指定平台或用户**，以实现更加灵活的机器人配置，包括但不限于：不同平台 / 会话应用不同的默认人格、知识库、默认聊天模型、插件。

要使用这个功能，只需要打开 WebUI -> 配置文件页，点击左上角的下拉框。

![](/source/images/what-is-changed-in-4.0.0/QQ_1757222834123.png)

点击「管理配置文件」按钮，然后新建一个新的配置文件。

![](/source/images/what-is-changed-in-4.0.0/QQ_1757222940927.png)

从上图可以看到，一个配置文件可以应用到多个消息平台，也可以自定义规则，自定义规则支持自由指定要应用的范围，精确到某一会话。为了实现这一点，我们抽象出了 umo 这个概念。

umo 是一个字符串，唯一表示某个消息平台下的某个会话。其格式为 `[消息平台适配器 ID]:[消息类型(群聊或私聊)]:[会话 ID]`。其中，会话 ID 可以使用 `/sid` 内置指令获取。例如：

- `telegram_1:GroupMessage:123456` 表示 ID 为 `telegram_1` 的适配器下群组聊天中 ID 为 123456 的会话。
- `aiocqhttp_default:FriendMessage:905617992` 表示 ID 为 `aiocqhttp_default` 的适配器下私聊中 QQ 为 905617992 的会话。

支持通配符或留空来匹配所有内容。

- `satori_1:GroupMessage:*` 表示 ID 为 `satori_1` 的适配器下群组聊天中所有会话。
- `:FriendMessage:905617992` 表示所有适配器下私聊中 QQ 为 905617992 的会话。

自定义规则允许你创建多个 umo 规则。

一个消息事件只会匹配到一个配置文件。默认情况下，AstrBot 自带一个名为 `default` 的配置文件，其规则为 `::`，表示所有适配器、所有会话均使用该配置文件。其优先级也是最低的，当你创建了其他配置文件后，`default` 配置文件就只会作为兜底配置文件使用。

当规则在多个配置文件上冲突时（例如，一个消息事件的 umo 满足多个配置文件），WebUI 会给予警告提示，但你仍然可以继续创建，最终 AstrBot 执行会话匹配时，将使用第一个匹配的配置文件。

### 同步 MCP 服务器

许多用户反应自己无法在本机部署 MCP 服务器，或者部署很麻烦。因此，我们现已支持将 `ModelScope` 平台的 MCP 服务器同步到 AstrBot。

你需要在 [ModelScope](https://www.modelscope.cn/mcp) 上找到你想要使用的 MCP 服务器，然后进入服务器详情页，填写右边的表单并点击连接，以在 ModelScope 上新建自己的 MCP 服务器实例，而不需要本地部署。

![](/source/images/what-is-changed-in-4.0.0/QQ_1757224113760.png)

新建完成后，进入 WebUI -> MCP，点击右上角的 「同步服务器」，按照提示完成同步。

![](/source/images/what-is-changed-in-4.0.0/QQ_1757224038927.png)

我们未来将增加更多对接平台的支持，如 Smithery、MCP.SO 等，敬请期待。

### 内置网页搜索支持 Tavily

v3 版本中，网页搜索的过程在本地进行，由于主要使用 Google，并且本质上是以爬虫的方式获取内容，所以稳定性无法得到保证。在 v4 版本中，我们内置了对 Tavily 的支持。Tavily 是一个强大的搜索引擎 API，可以提供更稳定的搜索服务。

要更换为使用 Tavily，只需在配置文件中找到网页搜索一节，然后选择网页搜索提供商为 `tavity` 即可。除此之外，你还可以选择 `default`，也就是使用内置的搜索引擎。

![](/source/images/what-is-changed-in-4.0.0/QQ_1757224486421.png)

### 独立的人格设定

考虑到用户对角色扮演更高的需求，在 v4 版本，我们将人格设定独立为单独的 WebUI 页面，用户可以更方便地管理和配置不同的人格设定。

并且，人格设定现已支持选择 LLM 函数工具，以服务更好的角色扮演体验。

![](/source/images/what-is-changed-in-4.0.0/QQ_1757225029046.png)

![](/source/images/what-is-changed-in-4.0.0/QQ_1757224928476.png)

你可以在配置文件的人格一节中指定默认的聊天人格。

### 自定义 T2I 模版

> Co-Authored by [@RC-CHN](https://github.com/RC-CHN).

用户可以根据自己的需求，自定义 T2I 模版，以实现个性化的文本转图像服务。

只需要打开配置文件 -> 系统，然后找到文本转图像自定义模版配置项，点击「自定义 T2I 模版」即可编辑 T2I 所需要的 jinja2 模版。

该功能需要一定的 HTML 编程基础。

![](/source/images/what-is-changed-in-4.0.0/QQ_1757225536066.png)

### 新增 Satori 适配器

> Co-Authored by [@shangxueink](https://github.com/shangxueink).

在新版本，我们支持接入 Satori 协议实现端，以支持更多消息平台的接入。

![](/source/images/what-is-changed-in-4.0.0/QQ_1757225351834.png)


### 其他功能

我们还增加了许多新的功能和优化，包括但不限于：


* Refactor: using sqlmodel(sqlchemy+pydantic) as ORM framework and switch to async-based sqlite operation by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2294
* Fix: 当多个相同消息平台实例部署时上下文可能混乱（共享） by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2298
* Improve: 引入全新的人格管理模式 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2305
* Feature: Add support to sync MCP servers from ModelScope by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2313
* Feature: 移除 MCP 市场相关逻辑 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2314
* Refactor: 重构配置文件管理，以支持更灵活的、会话粒度的（基于 umo part）配置文件隔离 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2328
* Feature: 增加图片转述提供商配置、支持用户自定义模型模态能力 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2422
* Feature: 优化 WebSearch 的爬取网页速度并且支持使用 Tavily 作为搜索引擎 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2427
* Feature: 添加url转知识库功能 by @RC-CHN in https://github.com/AstrBotDevs/AstrBot/pull/2280
* Feature: 添加条件显示逻辑以优化插件配置项的可见性管理 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2433
* Feature: 支持在 WebUI 配置文件页中配置默认知识库 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2437
* Feature: 重构 Function Tool 管理并初步引入 Multi Agent 及 Agent Handsoff 机制  by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2454
* feat: 添加数据迁移助手以及相关迁移方法 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2477
* Refactor: 重构 SharedPreference 类并采用数据库存储替换 json 存储 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2482
* Feature: 支持配置重排序模型（vLLM API 格式）用于 score 任务 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2496
* Feature: 支持在配置文件配置可用的插件组 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2505
* Feature: llm_tool 装饰器返回值支持 mcp 库的 tool 返回值类型 (mcp.type.CallToolResult) by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2507
* Feature: 多 t2i 服务的随机负载均衡 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2529
* Improve: 扩大配置文件生效范围的自定义程度到会话粒度 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2532
* Feature: 支持可视化自定义 T2I 模版 by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2581

## 升级到 v4.0.0

一般情况下，您只需要打开 WebUI，点击右上角的更新，然后切换到 v4.0.0 版本即可。

当升级成功后，WebUI 会自动弹出数据迁移助手，如果您要保留之前的消息记录，请务必迁移。

![](/source/images/what-is-changed-in-4.0.0/QQ_1757225830279.png)