---
pubDate: '2025-09-03T20:38:48+08:00'
title: 'What’s New in v4.0.0'
description: 'AstrBot v4.0.0 introduces multi-profile configuration, hot reload, image captioning, MCP server sync, and more.'
---

![v4.0.0](/source/images/what-is-changed-in-4.0.0/image.png)

Thank you to every developer and user who has supported AstrBot. AstrBot continues to evolve and improve, with the goal of delivering a better user experience and a broader set of capabilities.

## Feature Updates

### Multiple Configuration Profiles

This release introduces a new multi-profile configuration system. You can now **create configuration profiles flexibly and apply them to specific platforms or users**, enabling more granular bot behavior. This includes, but is not limited to, applying different default personas, knowledge bases, default chat models, and plugins across platforms or sessions.

To use this feature, open the WebUI, go to the Configuration Profiles page, and click the dropdown in the upper-left corner.

![](/source/images/what-is-changed-in-4.0.0/QQ_1757222834123.png)

Click **Manage Configuration Profiles**, then create a new profile.

![](/source/images/what-is-changed-in-4.0.0/QQ_1757222940927.png)

As shown above, a configuration profile can be applied to multiple messaging platforms. You can also define custom rules that target a specific scope, down to an individual session. To support this, we introduced the concept of **umo**.

A **umo** is a string that uniquely identifies a session under a messaging platform. Its format is `[messaging platform adapter ID]:[message type (group chat or private chat)]:[session ID]`. The session ID can be obtained with the built-in `/sid` command. For example:

- `telegram_1:GroupMessage:123456` refers to the group chat session with ID `123456` under the adapter `telegram_1`.
- `aiocqhttp_default:FriendMessage:905617992` refers to the private chat session with QQ user `905617992` under the adapter `aiocqhttp_default`.

Wildcards and empty fields are supported for broader matching.

- `satori_1:GroupMessage:*` matches all group chat sessions under the adapter `satori_1`.
- `:FriendMessage:905617992` matches private chat sessions with QQ user `905617992` across all adapters.

Custom rules allow you to define multiple umo rules.

A message event will match only one configuration profile. By default, AstrBot includes a profile named `default`, whose rule is `::`, meaning it applies to all adapters and all sessions. It has the lowest priority, so once you create additional profiles, the `default` profile serves as a fallback.

If rules conflict across multiple profiles — for example, when one message event satisfies more than one profile rule — the WebUI will display a warning. You may still proceed, and AstrBot will use the first matching profile during session resolution.

### Configuration Hot Reload

In v4, we introduced configuration hot reload. Users can update configuration content in real time without restarting the service. This greatly simplifies configuration management and improves system flexibility.

> Note: After modifying a configuration file, you still need to click the save button in the lower-right corner manually. Otherwise, your changes will not take effect.

### Image Captioning

We noticed that some LLMs, such as `deepseek-chat`, do not support multimodal input, yet they are still widely used. AstrBot now provides image captioning, allowing users to configure a dedicated model for describing images. Images are first converted into text by the captioning model, then passed to the chat model.

You can configure the image captioning model inside a configuration profile.

### Sync MCP Servers

Many users have reported that deploying MCP servers locally can be difficult or inconvenient. AstrBot now supports syncing MCP servers from the `ModelScope` platform.

Go to [ModelScope](https://www.modelscope.cn/mcp), find the MCP server you want to use, open its detail page, fill in the form on the right, and click connect. This creates your own MCP server instance on ModelScope, without requiring local deployment.

![](/source/images/what-is-changed-in-4.0.0/QQ_1757224113760.png)

After the instance is created, open WebUI -> MCP, click **Sync Server** in the upper-right corner, and follow the prompts to complete the sync.

![](/source/images/what-is-changed-in-4.0.0/QQ_1757224038927.png)

We plan to add support for more integration platforms, such as Smithery and MCP.SO.

### Built-in Web Search Now Supports Tavily

In v3, web search was performed locally. Since it primarily relied on Google and worked in practice like a crawler, stability could not be fully guaranteed. In v4, AstrBot includes built-in support for Tavily. Tavily is a powerful search engine API that provides a more stable search experience.

To switch to Tavily, open the web search section in a configuration profile and set the web search provider to `tavity`. You can also select `default` to continue using the built-in search engine.

![](/source/images/what-is-changed-in-4.0.0/QQ_1757224486421.png)

### Dedicated Persona Management

To better support role-play and persona-driven use cases, v4 introduces a dedicated WebUI page for persona configuration. Users can now manage and configure different personas more easily.

Personas can now also select LLM function tools, enabling richer role-play workflows.

![](/source/images/what-is-changed-in-4.0.0/QQ_1757225029046.png)

![](/source/images/what-is-changed-in-4.0.0/QQ_1757224928476.png)

You can specify the default chat persona in the persona section of a configuration profile.

### Custom T2I Templates

> Co-authored by [@RC-CHN](https://github.com/RC-CHN).

Users can now customize T2I templates to support personalized text-to-image services.

Open Configuration Profile -> System, find the custom text-to-image template setting, and click **Custom T2I Template** to edit the jinja2 template used for T2I generation.

This feature requires a basic understanding of HTML.

![](/source/images/what-is-changed-in-4.0.0/QQ_1757225536066.png)

### New Satori Adapter

> Co-authored by [@shangxueink](https://github.com/shangxueink).

In this release, AstrBot can connect to Satori protocol implementations, enabling integration with more messaging platforms.

![](/source/images/what-is-changed-in-4.0.0/QQ_1757225351834.png)

### Other Updates

We also added many new features and optimizations, including but not limited to:

* Refactor: use sqlmodel (SQLAlchemy + Pydantic) as the ORM framework and switch to async-based SQLite operations by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2294
* Fix: context could become mixed or shared when multiple instances of the same messaging platform were deployed by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2298
* Improve: introduce a new persona management model by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2305
* Feature: add support for syncing MCP servers from ModelScope by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2313
* Feature: remove logic related to the MCP marketplace by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2314
* Refactor: redesign configuration profile management to support more flexible session-level profile isolation based on umo parts by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2328
* Feature: add image captioning provider configuration and support user-defined model modality capabilities by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2422
* Feature: improve WebSearch page crawling speed and support Tavily as a search engine by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2427
* Feature: add URL-to-knowledge-base support by @RC-CHN in https://github.com/AstrBotDevs/AstrBot/pull/2280
* Feature: add conditional display logic to improve visibility management for plugin configuration items by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2433
* Feature: support configuring a default knowledge base from the WebUI configuration profile page by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2437
* Feature: refactor Function Tool management and introduce early Multi-Agent and Agent Handoff mechanisms by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2454
* Feature: add a data migration assistant and related migration methods by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2477
* Refactor: redesign the SharedPreference class and replace JSON storage with database-backed storage by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2482
* Feature: support configuring a reranking model in vLLM API format for scoring tasks by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2496
* Feature: support configuring available plugin groups in configuration profiles by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2505
* Feature: support MCP `CallToolResult` return values in the `llm_tool` decorator by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2507
* Feature: add random load balancing across multiple T2I services by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2529
* Improve: expand the customizability of configuration profile scopes down to the session level by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2532
* Feature: support visual customization of T2I templates by @Soulter in https://github.com/AstrBotDevs/AstrBot/pull/2581

## Important Bug Fixes

### Starting Multiple Adapters of the Same Messaging Platform Could Cause Context Confusion

Root cause: in v3, the `platform_id` field in the umo used to identify sessions was incorrectly set to the messaging platform type string. As a result, multiple instances of the same platform type could share the same umo in the same session, which also meant sharing the same chat context and causing confusion.

Solution: in v4, we corrected how `platform_id` is assigned, ensuring that each messaging platform instance has an independent context.

## Upgrading to v4.0.0

In most cases, open the WebUI, click update in the upper-right corner, and switch to v4.0.0.

After the upgrade succeeds, the WebUI will automatically open the data migration assistant. If you want to keep previous message records, make sure to complete the migration.

![](/source/images/what-is-changed-in-4.0.0/QQ_1757225830279.png)
