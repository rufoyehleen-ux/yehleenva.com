# Yehleen Rufo Baccal - Portfolio

A static portfolio site (HTML, CSS, JavaScript). No build step is needed, and every path is relative, so it works as a project site (`username.github.io/repo-name/`) or as a user site (`username.github.io`).

## Files

```
index.html               page content
css/style.css            all styles (light and dark mode)
js/main.js               enlarge-on-click viewer and EMR screenshot carousel
assets/img/              profile, workspace, work sample, and EMR screenshots
assets/resume/           downloadable resume (Yehleen_Baccal_Resume.pdf)
assets/favicon.svg       browser tab icon
.nojekyll                tells GitHub Pages to serve the files as they are
```

## Deploy on GitHub Pages

1. On GitHub, create a new repository (for example `portfolio`). Use `yehleen-baccal.github.io`-style naming (`<your-username>.github.io`) only if you want the site at the root address.
2. Upload everything inside this folder to the repository root (drag and drop in the web UI, or use git):
   ```
   git init
   git add .
   git commit -m "Add portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. Go to **Settings > Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, then **Save**.
4. Wait a minute or two. The site appears at `https://<your-username>.github.io/<repo-name>/`.

## Updating content

- **Text:** edit `index.html`.
- **Photos:** replace the files in `assets/img/` with new images of the same name.
- **Resume:** replace `assets/resume/Yehleen_Baccal_Resume.pdf`, keeping the file name.

## Before you publish

GitHub Pages sites are public. The page shows your town, email, phone number, and photos of your home office and power equipment. Remove anything you don't want public in `index.html` before pushing.

## Base path and paths

No base path setting is needed. Every link in `index.html` is relative (`css/style.css`, `js/main.js`, `assets/img/...`, `assets/resume/...`), so the site works from `https://<username>.github.io/<repo-name>/` and from `https://<username>.github.io/`. Do not rename or move the `css`, `js`, or `assets` folders unless you update the paths in `index.html`.

## Optional: deploy with GitHub Actions instead

The steps above (deploy from a branch) are enough. If you prefer Actions, set **Settings > Pages > Source** to **GitHub Actions** and add this file as `.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Troubleshooting

- **Page shows the README or a 404:** check that `index.html` is in the repository root, not inside a subfolder, and that Pages is set to `main` and `/ (root)`.
- **Images or styles missing:** the folder names are case-sensitive on GitHub (`assets`, not `Assets`).
- **Changes not showing:** wait a minute, then hard refresh (Ctrl+Shift+R).
