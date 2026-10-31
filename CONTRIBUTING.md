# Contributing

Bug reports and focused pull requests are welcome through [GitHub Issues](https://github.com/maried-boop/substack-feed-blocker/issues) and [Pull requests](https://github.com/maried-boop/substack-feed-blocker/pulls).

## Report a problem

Include your desktop Chrome version, extension version from `manifest.json`, the affected Substack page type and steps to reproduce the problem. Describe what you expected and what happened, including the toolbar badge state.

Remove private messages, account details, personal shortcut lists and other personal information from screenshots and logs before sharing them.

## Make a change

1. Fork or clone this repository and create a branch for your change.
2. Load the folder containing `manifest.json` as an unpacked extension in desktop Chrome, following the [README](README.md#installation).
3. Keep the change focused. Explain why it is needed and update affected documentation.
4. Run the checks below and open a pull request with the results. State any checks you could not complete.

There is no build process or package installation. Keep the distributed `SAFE_LINK_SECTIONS` array empty. Use your own local copy to try optional links; do not commit personal links or account-specific defaults.

## Validation

If Node.js is available, check JavaScript syntax:

```sh
node --check background.js
node --check content.js
```

In desktop Chrome, reload the extension and relevant Substack tabs, then check the behavior affected by the change:

- On a fresh installation, the Notes feed is hidden and the badge shows ON.
- Clicking the toolbar icon toggles the feed and updates the badge in open Substack tabs.
- The setting persists after restarting Chrome.
- Notifications, subscriptions, chat, search, profiles, publishing tools and directly opened posts remain accessible.
- An empty links array creates no shortcuts panel. Temporary example links appear only while blocking is on, with readable light and dark appearances.

Remove temporary links before submitting. For manifest or asset changes, verify every referenced script, stylesheet and icon exists. Explain any requested permission change in the pull request.

## Project scope

The extension hides the Notes feed and optionally replaces it with local shortcuts. Avoid adding telemetry, remote dependencies or broad permissions without discussing the proposed change first.
