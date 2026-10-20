# Kareem Ismail - Portfolio

Personal portfolio site with pixel-art flair, live at
**https://kareemtahaismail.github.io/portfolio/**

Built with React, TypeScript, Vite, and MUI. Navigate between pages by
scrolling, swiping, or using the arrow keys.

## Editing content

All copy (bio, jobs, projects, links) lives in [`src/content.ts`](src/content.ts).
Update it alongside the resume in `src/assets/docs/`; the components only render it.

`public/og-image.png` is the link-preview image (1200x630). If the hero copy
changes, regenerate it so shared links match the site.

## Sprites

The fighter and Thef animations come from the FRIST game's Aseprite files, exported
with only the `Character` layer as horizontal 128x128 strips into
`src/assets/images/sprites/`. Frame timings live in [`src/sprites.ts`](src/sprites.ts):

```sh
aseprite -b --layer Character player_side_kick.aseprite \
  --sheet sideKick.png --sheet-type horizontal --data sideKick.json
```

## Development

```sh
npm install
npm run dev      # start the dev server
npm run lint     # lint the source
npm run build    # type-check and build to dist/
npm run deploy   # build and publish dist/ to GitHub Pages
```
