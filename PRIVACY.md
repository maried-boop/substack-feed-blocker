# Privacy

Substack Feed Blocker processes its settings locally in your browser. The extension contains no analytics, advertising, remote scripts or data-collection service.

## Stored data

The extension stores one setting, `feedBlockingEnabled`, in `chrome.storage.local`. It records whether the Notes feed should be hidden. The extension does not use Chrome sync storage or send this setting to a server.

If you configure optional shortcuts, their labels and URLs are stored in your local `content.js` file. They are rendered into the Substack page as ordinary links. Keep that file private if your choices are personal.

## Page access

The extension runs on `https://substack.com/*` to find the region labelled `Notes feed`, hide it when enabled and optionally insert your shortcuts panel. It does not read or store the text of posts, messages or notifications. It does not request access to browser history, cookies or other websites.

## Permissions

- `storage`: save and read the on/off preference.
- `https://substack.com/*`: apply the content script and stylesheet on Substack pages.

The extension does not intercept network traffic or send browsing information to Marie Drouvin or another service. When you click a shortcut, your browser loads its destination normally; that website's privacy practices apply to the visit. Substack continues to operate under its own privacy practices.

## Removing your data

Removing the extension from `chrome://extensions` removes its local extension storage. Any shortcuts you added remain in your downloaded source folder until you edit or delete that folder.

## Scope

This document describes the source published in this repository. Modified copies may behave differently. See the [README](README.md) for installation and the [changelog](CHANGELOG.md) for recorded changes.
