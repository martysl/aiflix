# Install MartyFlix in Jellyfin

These instructions target current Jellyfin Server/Jellyfin Web releases. Menu labels can differ slightly by server version or screen width.

## 1. Back up the current branding

Before changing anything, copy the existing **Custom CSS** to a text file. Branding affects Jellyfin Web; native TV and mobile clients may use only the uploaded image assets or ignore web-only CSS.

## 2. Logo and splash are built into the CSS

No branding image upload is required. `css/custom.css` contains a small inline SVG wordmark and applies it to Jellyfin's header, login, and startup-splash hooks. It makes no external image request and works with URL-base installations without editing asset paths. The PNG in `logo/` is retained only as original artwork/reference.

## 3. Install the CSS

1. Still on **Dashboard → General → Branding**, find **Custom CSS**.
2. Paste the complete contents of `css/custom.css`.
3. Save and hard-refresh the browser (`Ctrl+Shift+R` / `Cmd+Shift+R`).

The theme deliberately uses current semantic Jellyfin classes plus a few legacy logo hooks. It does not hide navigation, change media metadata, or depend on generated class names.

## 4. Optional JavaScript enhancement

Custom JavaScript is **not** accepted by Jellyfin's Custom CSS field and is not a standard server branding feature. The safest option is to skip this step. If you maintain a custom Jellyfin Web deployment, copy `js/martyflix.js` into its served assets and load it with a deferred script tag immediately before `</body>`:

```html
<script defer src="/web/js/martyflix.js"></script>
```

If your web root is `/jellyfin`, use `/jellyfin/web/js/martyflix.js`. A Jellyfin Web update can replace modified files, so reapply and retest the change after every update. Never paste the script into the Custom CSS box.

The script only:

- adds an accessible name to background-image logos;
- adds one friendly, randomized login message;
- observes Jellyfin's single-page navigation without polling;
- prevents duplicate initialization and disconnects cleanly on page exit.

It does not access credentials, call private Jellyfin APIs, track activity, or load third-party code.

## Verify

- The header and login screen display the CSS-embedded MartyFlix wordmark without stretching.
- A fresh page load displays the CSS-embedded MartyFlix startup splash.
- Cards have a subtle lift on pointer hover and a visible keyboard focus ring.
- With reduced-motion enabled at OS level, card motion is disabled.
- Text and controls remain readable on a narrow/mobile viewport.

## Troubleshooting

| Problem | Fix |
|---|---|
| Old branding remains | Save again, hard-refresh, then clear the site's cached data or test in a private window. |
| Logo is missing | Confirm the entire stylesheet, including the long `--marty-logo-image` line, was copied without truncation. |
| Splash image is missing | Clear the web-client cache and test a fresh page load; the startup splash is brief and is not the login background. Native clients may ignore web CSS. |
| CSS has no effect | Confirm it is in **Custom CSS**, not a browser extension, and check the browser console for a malformed rule copied from other themes. |
| Optional message is missing | Confirm the script URL returns JavaScript rather than an HTML 404 page and that the tag uses `defer`. |
| Update removed the script | Restore the customized web asset/tag or remove the optional script; uploaded branding and Custom CSS are unaffected. |
