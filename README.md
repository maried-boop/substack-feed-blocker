Created by Codex, on [[2026-06-21-Sun]]

# Substack Feed Blocker

Use Substack without the Notes feed.

A small Chrome extension that hides the scrolling Notes feed while keeping subscriptions, notifications, chat, search, profiles and writing tools available. Bring the feed back whenever you want with one click.

[Download Substack Feed Blocker](https://github.com/maried-boop/substack-feed-blocker/archive/refs/heads/main.zip)

![Substack with the Notes feed hidden](docs/screenshots/feed-hidden.png)

*Illustrative sample page rendered with the extension's actual code. The screenshots use example content.*

## Who this is for

Substack Feed Blocker is for people who want to read their subscriptions, write, or check in with particular writers without getting pulled into the Notes feed.

You can keep using Substack for the things you came to do, and choose when to turn the feed back on.

## What it does

- Hides the Notes feed automatically
- Keeps the rest of Substack accessible
- Toggles blocking from the extension's toolbar icon
- Shows an ON/OFF badge and remembers your choice locally
- Optionally replaces the empty space with shortcuts you choose
- Supports light and dark appearances for the optional links panel

![An optional shortcuts panel with example links](docs/screenshots/optional-links.png)

The shortcuts above are examples of what you can add. The extension starts with the feed hidden and no shortcuts panel.

## How it works

1. The extension runs on Substack pages and hides the region labelled `Notes feed`.
2. Clicking its toolbar icon switches blocking on or off and saves that choice locally.
3. If you add your own shortcuts in `content.js`, a links panel appears in place of the feed while blocking is on.

There is no account setup, API key, build step or package installation.

## Installation

### Google Chrome on desktop

1. [Download the extension](https://github.com/maried-boop/substack-feed-blocker/archive/refs/heads/main.zip) and extract the ZIP.
2. Move the extracted folder somewhere you intend to keep it.
3. Open `chrome://extensions` in Chrome.
4. Turn on **Developer mode**.
5. Click **Load unpacked** and select the extracted folder containing `manifest.json`.
6. Pin **Substack Feed Blocker** from Chrome's Extensions menu if you want the toggle in your toolbar.
7. Reload any open Substack tabs.

Keep the folder in place while the extension is installed. This download is an unpacked extension; it is not a Chrome Web Store listing.

### Using the toggle

| Toolbar badge | What happens |
| --- | --- |
| **ON** | The Notes feed is hidden. Optional shortcuts appear if you have configured them. |
| **OFF** | The Notes feed is visible and the shortcuts panel is hidden. |

Click the toolbar icon to switch between them. The setting stays saved when you restart Chrome.

![The Notes feed visible with blocking switched off](docs/screenshots/feed-visible.png)

## Everyday uses

- Open your subscriptions and choose something to read without browsing the homepage feed.
- Check notifications or chat without entering the Notes stream.
- Open Substack to write, then leave when you are done.
- Turn the feed back on for a deliberate browse, then hide it again.

## Add your own shortcuts

Open `content.js` in a text editor and replace the empty `SAFE_LINK_SECTIONS` array with your own groups and links. For example:

```js
const SAFE_LINK_SECTIONS = [
  {
    title: "My places",
    links: [
      { label: "My newsletter", url: "https://example.org/newsletter" },
      { label: "Reading list", url: "https://example.org/reading" }
    ]
  },
  {
    title: "People to browse",
    links: [
      { label: "A writer I follow", url: "https://example.org/writer" }
    ]
  }
];
```

Replace the example labels and URLs with your choices. Save the file, click **Reload** for the extension at `chrome://extensions`, then reload Substack.

Leave the array empty if you only want the feed hidden. Keep personal link lists in your own local copy when contributing to this repository.

## Privacy and permissions

- Runs only on `https://substack.com/*`
- Uses Chrome's local storage to remember whether blocking is enabled
- Does not collect browsing data, use analytics or send data to an external service
- Opens any shortcuts you configure as ordinary browser links

The declared permissions are local preference storage and access to Substack pages.

## Compatibility and limitations

The documented installation is for desktop Google Chrome using Manifest V3. Other browsers and mobile installations have not been verified.

The extension identifies the feed by Substack's accessible `Notes feed` region. If Substack changes that structure, its selector may need updating in `content.css` and `content.js`. The extension's toolbar toggle controls the feed; it does not change your Substack subscriptions or notification settings.

## What's included

```text
substack-feed-blocker/
|-- manifest.json
|-- background.js
|-- content.js
|-- content.css
|-- icons/
`-- docs/screenshots/
```

Current extension version: **1.4.8**.

## Author

Built by Marie Drouvin with Codex.
