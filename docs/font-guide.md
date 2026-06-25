# MiniStyle font guide

MiniStyle uses a fashion editorial typography direction:

- Display headings: `Editorial New`
- Body and interface: `General Sans`

The project no longer imports Google Fonts. Fonts are configured in `src/styles/fonts.css` and expected as self-hosted `.woff2` files in `public/fonts/`.

## Required files

```text
public/fonts/GeneralSans-Regular.woff2
public/fonts/GeneralSans-Medium.woff2
public/fonts/GeneralSans-Semibold.woff2
public/fonts/EditorialNew-Regular.woff2
public/fonts/EditorialNew-Ultralight.woff2
```

Until these files are added, the site falls back to system fonts with a similar feel:

- Body/UI: `Satoshi`, `Avenir Next`, `Segoe UI`, Arial
- Display: `Didot`, `Bodoni 72`, Georgia

After adding the `.woff2` files, uncomment the `@font-face` blocks in `src/styles/fonts.css`.

## License note

Only add commercial font files to the repository if the font license allows repository storage and web embedding. If the license does not allow committing the files, keep them out of Git and add them during deployment.
