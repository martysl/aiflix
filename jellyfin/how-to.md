# How to install MartyFlix branding in Jellyfin

## 1. Upload the logo

1. Open Jellyfin **Dashboard** (top-right gear icon).
2. Go to **Branding** → **Images**.
3. Upload `logo/martyflix_logo.png` as the **Logo**.
4. Save. Jellyfin now serves it at `/Branding/Logo.png`.

> Alternative: drop the PNG into Jellyfin's branding folder manually
> (`config/branding/logo.png` in the Jellyfin data dir) and restart.

## 2. Apply the custom CSS

1. In the Dashboard go to **General** → **Custom CSS**.
2. Paste the whole contents of `css/custom.css`.
3. **Save** (bottom right).
4. Hard-refresh the web UI (Ctrl+Shift+R) — or open it in a new tab.

## 3. Verify

- Top bar shows the MartyFlix mouse instead of the Jellyfin logo.
- Background is a dreamy purple gradient.
- Cards are rounded and slightly translucent.

## Troubleshooting

| Problem | Fix |
|---|---|
| Logo not showing | Check the URL in the CSS: if Jellyfin is under a subpath, add it: `url('/jellyfin/Branding/Logo.png')` |
| CSS not applying | Make sure you hit **Save** and hard-refresh. Check Dashboard → General → Custom CSS is enabled |
| Logo looks stretched | The CSS forces 200×64px; tweak `width`/`height` in `.headerLogo` |
| TV / apps don't show it | Custom CSS only affects the web UI. Apps use the branding images from step 1 |

## Extras

- Want a different accent color? Change `--accent` at the top of `custom.css`.
- The login-screen logo section is optional — uncomment if you want it there too.
