This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
suit-try-on-web
├─ .next
│  └─ types
│     ├─ cache-life.d.ts
│     ├─ routes.d.ts
│     └─ validator.ts
├─ AGENTS.md
├─ CLAUDE.md
├─ README.md
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ assets
│  │  ├─ female_suit_1.png
│  │  ├─ female_suit_2.png
│  │  ├─ male_suit_1.png
│  │  ├─ male_suit_2.png
│  │  └─ pose_landmarker_lite.task
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  ├─ wasm
│  │  ├─ vision_wasm_internal.js
│  │  ├─ vision_wasm_internal.wasm
│  │  ├─ vision_wasm_nosimd_internal.js
│  │  └─ vision_wasm_nosimd_internal.wasm
│  └─ window.svg
├─ src
│  ├─ app
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components
│  │  └─ HUD.tsx
│  ├─ hooks
│  │  ├─ useCamera.ts
│  │  └─ usePoseLandmarker.ts
│  └─ lib
│     ├─ config.ts
│     ├─ mediapipe.ts
│     ├─ suit-renderer.ts
│     └─ types.ts
└─ tsconfig.json

```
```
suit-try-on-web
├─ .next
│  ├─ BUILD_ID
│  ├─ app-path-routes-manifest.json
│  ├─ build
│  │  ├─ 56416d4ae4ce586f.js
│  │  ├─ 56416d4ae4ce586f.js.map
│  │  ├─ chunks
│  │  │  ├─ [root-of-the-server]__0oj80bi._.js
│  │  │  ├─ [root-of-the-server]__0oj80bi._.js.map
│  │  │  ├─ [root-of-the-server]__1f933tp._.js
│  │  │  ├─ [root-of-the-server]__1f933tp._.js.map
│  │  │  ├─ [turbopack-node]_transforms_postcss_ts_0b7xl6g._.js
│  │  │  ├─ [turbopack-node]_transforms_postcss_ts_0b7xl6g._.js.map
│  │  │  ├─ [turbopack]_runtime.js
│  │  │  └─ [turbopack]_runtime.js.map
│  │  └─ package.json
│  ├─ build-manifest.json
│  ├─ cache
│  │  ├─ .previewinfo
│  │  └─ .rscinfo
│  ├─ dev
│  │  ├─ build
│  │  │  ├─ 56416d4ae4ce586f.js
│  │  │  ├─ 56416d4ae4ce586f.js.map
│  │  │  ├─ chunks
│  │  │  │  ├─ [root-of-the-server]__0oj80bi._.js
│  │  │  │  ├─ [root-of-the-server]__0oj80bi._.js.map
│  │  │  │  ├─ [root-of-the-server]__1f933tp._.js
│  │  │  │  ├─ [root-of-the-server]__1f933tp._.js.map
│  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_0b7xl6g._.js
│  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_0b7xl6g._.js.map
│  │  │  │  ├─ [turbopack]_runtime.js
│  │  │  │  └─ [turbopack]_runtime.js.map
│  │  │  └─ package.json
│  │  ├─ build-manifest.json
│  │  ├─ cache
│  │  │  ├─ .rscinfo
│  │  │  ├─ next-devtools-config.json
│  │  │  └─ turbopack
│  │  │     └─ v16.2.10
│  │  │        ├─ 00000002.sst
│  │  │        ├─ 00000003.sst
│  │  │        ├─ 00000004.sst
│  │  │        ├─ 00000005.meta
│  │  │        ├─ 00000006.meta
│  │  │        ├─ 00000007.meta
│  │  │        ├─ 00000013.sst
│  │  │        ├─ 00000014.sst
│  │  │        ├─ 00000015.sst
│  │  │        ├─ 00000016.meta
│  │  │        ├─ 00000018.meta
│  │  │        ├─ 00000019.meta
│  │  │        ├─ 00000021.sst
│  │  │        ├─ 00000022.sst
│  │  │        ├─ 00000023.meta
│  │  │        ├─ 00000025.meta
│  │  │        ├─ 00000027.sst
│  │  │        ├─ 00000028.sst
│  │  │        ├─ 00000029.meta
│  │  │        ├─ 00000031.meta
│  │  │        ├─ 00000033.sst
│  │  │        ├─ 00000034.sst
│  │  │        ├─ 00000035.sst
│  │  │        ├─ 00000036.meta
│  │  │        ├─ 00000037.meta
│  │  │        ├─ 00000039.meta
│  │  │        ├─ 00000041.sst
│  │  │        ├─ 00000042.sst
│  │  │        ├─ 00000043.meta
│  │  │        ├─ 00000045.meta
│  │  │        ├─ 00000047.sst
│  │  │        ├─ 00000048.sst
│  │  │        ├─ 00000049.meta
│  │  │        ├─ 00000051.meta
│  │  │        ├─ 00000053.sst
│  │  │        ├─ 00000054.sst
│  │  │        ├─ 00000055.meta
│  │  │        ├─ 00000057.meta
│  │  │        ├─ 00000059.sst
│  │  │        ├─ 00000060.sst
│  │  │        ├─ 00000061.meta
│  │  │        ├─ 00000062.meta
│  │  │        ├─ 00000065.sst
│  │  │        ├─ 00000066.sst
│  │  │        ├─ 00000067.sst
│  │  │        ├─ 00000068.meta
│  │  │        ├─ 00000069.meta
│  │  │        ├─ 00000070.meta
│  │  │        ├─ 00000076.sst
│  │  │        ├─ 00000077.sst
│  │  │        ├─ 00000078.sst
│  │  │        ├─ 00000079.meta
│  │  │        ├─ 00000080.meta
│  │  │        ├─ 00000082.meta
│  │  │        ├─ 00000083.sst
│  │  │        ├─ 00000084.sst
│  │  │        ├─ 00000085.meta
│  │  │        ├─ 00000087.sst
│  │  │        ├─ 00000088.sst
│  │  │        ├─ 00000089.sst
│  │  │        ├─ 00000090.sst
│  │  │        ├─ 00000091.meta
│  │  │        ├─ 00000092.meta
│  │  │        ├─ 00000093.meta
│  │  │        ├─ 00000094.meta
│  │  │        ├─ 00000095.sst
│  │  │        ├─ 00000096.sst
│  │  │        ├─ 00000097.sst
│  │  │        ├─ 00000098.meta
│  │  │        ├─ 00000099.meta
│  │  │        ├─ 00000100.meta
│  │  │        ├─ 00000101.sst
│  │  │        ├─ 00000102.sst
│  │  │        ├─ 00000103.sst
│  │  │        ├─ 00000104.meta
│  │  │        ├─ 00000105.meta
│  │  │        ├─ 00000106.meta
│  │  │        ├─ 00000107.sst
│  │  │        ├─ 00000108.sst
│  │  │        ├─ 00000109.sst
│  │  │        ├─ 00000110.meta
│  │  │        ├─ 00000111.meta
│  │  │        ├─ 00000112.meta
│  │  │        ├─ CURRENT
│  │  │        └─ LOG
│  │  ├─ fallback-build-manifest.json
│  │  ├─ lock
│  │  ├─ logs
│  │  │  └─ next-development.log
│  │  ├─ package.json
│  │  ├─ prerender-manifest.json
│  │  ├─ routes-manifest.json
│  │  ├─ server
│  │  │  ├─ app
│  │  │  │  ├─ _not-found
│  │  │  │  │  ├─ page
│  │  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  │  ├─ page.js
│  │  │  │  │  ├─ page.js.map
│  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ app-paths-manifest.json
│  │  │  ├─ chunks
│  │  │  │  └─ ssr
│  │  │  │     ├─ [externals]__12if52y._.js
│  │  │  │     ├─ [externals]__12if52y._.js.map
│  │  │  │     ├─ [externals]_next_dist_1mg6puk._.js
│  │  │  │     ├─ [externals]_next_dist_1mg6puk._.js.map
│  │  │  │     ├─ [root-of-the-server]__09gp5cy._.js
│  │  │  │     ├─ [root-of-the-server]__09gp5cy._.js.map
│  │  │  │     ├─ [root-of-the-server]__0hmgsoy._.js
│  │  │  │     ├─ [root-of-the-server]__0hmgsoy._.js.map
│  │  │  │     ├─ [root-of-the-server]__1ubvjr-._.js
│  │  │  │     ├─ [root-of-the-server]__1ubvjr-._.js.map
│  │  │  │     ├─ [turbopack]_runtime.js
│  │  │  │     ├─ [turbopack]_runtime.js.map
│  │  │  │     ├─ _next-internal_server_app__not-found_page_actions_0pt47yr.js
│  │  │  │     ├─ _next-internal_server_app__not-found_page_actions_0pt47yr.js.map
│  │  │  │     ├─ _next-internal_server_app_page_actions_0hhsz1j.js
│  │  │  │     ├─ _next-internal_server_app_page_actions_0hhsz1j.js.map
│  │  │  │     ├─ src_0kyqt-9._.js
│  │  │  │     └─ src_0kyqt-9._.js.map
│  │  │  ├─ interception-route-rewrite-manifest.js
│  │  │  ├─ middleware-build-manifest.js
│  │  │  ├─ middleware-manifest.json
│  │  │  ├─ next-font-manifest.js
│  │  │  ├─ next-font-manifest.json
│  │  │  ├─ pages-manifest.json
│  │  │  ├─ server-reference-manifest.js
│  │  │  └─ server-reference-manifest.json
│  │  ├─ static
│  │  │  ├─ chunks
│  │  │  │  ├─ [next]_internal_font_google_geist_a71539c9_module_css_1igg3k2._.single.css
│  │  │  │  ├─ [next]_internal_font_google_geist_a71539c9_module_css_1igg3k2._.single.css.map
│  │  │  │  ├─ [next]_internal_font_google_geist_mono_8d43a2aa_module_css_1igg3k2._.single.css
│  │  │  │  ├─ [next]_internal_font_google_geist_mono_8d43a2aa_module_css_1igg3k2._.single.css.map
│  │  │  │  ├─ [root-of-the-server]__04kpziu._.css
│  │  │  │  ├─ [root-of-the-server]__04kpziu._.css.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_1mojsay._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_1mojsay._.js.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_1xch-cm._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_1xx01vv._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_1xx01vv._.js.map
│  │  │  │  ├─ _01_ro95._.js.map
│  │  │  │  ├─ _1anvha4._.js
│  │  │  │  ├─ src_0rlue92._.js
│  │  │  │  ├─ src_0rlue92._.js.map
│  │  │  │  ├─ src_app_globals_css_1igg3k2._.single.css
│  │  │  │  ├─ src_app_globals_css_1igg3k2._.single.css.map
│  │  │  │  ├─ src_app_layout_tsx_007e4b2._.js
│  │  │  │  ├─ src_app_page_tsx_004tgyl._.js
│  │  │  │  └─ turbopack-_01_ro95._.js
│  │  │  ├─ development
│  │  │  │  ├─ _buildManifest.js
│  │  │  │  ├─ _clientMiddlewareManifest.js
│  │  │  │  └─ _ssgManifest.js
│  │  │  └─ media
│  │  │     ├─ 4fa387ec64143e14-s.2tuy5pz7dlieh.woff2
│  │  │     ├─ 53b9e256198e5412-s.390ncx5urfkfu.woff2
│  │  │     ├─ 5ce348bf30bf5439-s.31988l_ccedte.woff2
│  │  │     ├─ 6306c77e7c8268e4-s.2dbetqa9o8jxf.woff2
│  │  │     ├─ 7178b3e590c64307-s.21jp631_3pja2.woff2
│  │  │     ├─ 797e433ab948586e-s.p.0r6juujl39pe6.woff2
│  │  │     ├─ 7d817b4c03b0c5f1-s.1uyisp29ctx0d.woff2
│  │  │     ├─ 8a480f0b521d4e75-s.1qq4vpdcun5oj.woff2
│  │  │     ├─ bbc41e54d2fcbd21-s.1rgnod-3esatf.woff2
│  │  │     ├─ caa3a2e1cccd8315-s.p.0wgildi0cnwt9.woff2
│  │  │     ├─ favicon.2vob68tjqpejf.ico
│  │  │     └─ fef07dbb0973bf53-s.3p2_lha1f2xer.woff2
│  │  ├─ trace
│  │  └─ types
│  │     ├─ cache-life.d.ts
│  │     ├─ routes.d.ts
│  │     └─ validator.ts
│  ├─ diagnostics
│  │  ├─ build-diagnostics.json
│  │  ├─ framework.json
│  │  └─ route-bundle-stats.json
│  ├─ export-marker.json
│  ├─ fallback-build-manifest.json
│  ├─ images-manifest.json
│  ├─ next-minimal-server.js.nft.json
│  ├─ next-server.js.nft.json
│  ├─ package.json
│  ├─ prerender-manifest.json
│  ├─ required-server-files.js
│  ├─ required-server-files.json
│  ├─ routes-manifest.json
│  ├─ server
│  │  ├─ app
│  │  │  ├─ _global-error
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ _global-error.html
│  │  │  ├─ _global-error.meta
│  │  │  ├─ _global-error.rsc
│  │  │  ├─ _global-error.segments
│  │  │  │  ├─ __PAGE__.segment.rsc
│  │  │  │  ├─ _full.segment.rsc
│  │  │  │  ├─ _head.segment.rsc
│  │  │  │  ├─ _index.segment.rsc
│  │  │  │  └─ _tree.segment.rsc
│  │  │  ├─ _not-found
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ _not-found.html
│  │  │  ├─ _not-found.meta
│  │  │  ├─ _not-found.rsc
│  │  │  ├─ _not-found.segments
│  │  │  │  ├─ _full.segment.rsc
│  │  │  │  ├─ _head.segment.rsc
│  │  │  │  ├─ _index.segment.rsc
│  │  │  │  ├─ _not-found
│  │  │  │  │  └─ __PAGE__.segment.rsc
│  │  │  │  ├─ _not-found.segment.rsc
│  │  │  │  └─ _tree.segment.rsc
│  │  │  ├─ favicon.ico
│  │  │  │  ├─ route
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  └─ build-manifest.json
│  │  │  │  ├─ route.js
│  │  │  │  ├─ route.js.map
│  │  │  │  └─ route.js.nft.json
│  │  │  ├─ favicon.ico.body
│  │  │  ├─ favicon.ico.meta
│  │  │  ├─ index.html
│  │  │  ├─ index.meta
│  │  │  ├─ index.rsc
│  │  │  ├─ index.segments
│  │  │  │  ├─ __PAGE__.segment.rsc
│  │  │  │  ├─ _full.segment.rsc
│  │  │  │  ├─ _head.segment.rsc
│  │  │  │  ├─ _index.segment.rsc
│  │  │  │  └─ _tree.segment.rsc
│  │  │  ├─ page
│  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  ├─ build-manifest.json
│  │  │  │  ├─ next-font-manifest.json
│  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  └─ server-reference-manifest.json
│  │  │  ├─ page.js
│  │  │  ├─ page.js.map
│  │  │  ├─ page.js.nft.json
│  │  │  └─ page_client-reference-manifest.js
│  │  ├─ app-paths-manifest.json
│  │  ├─ chunks
│  │  │  ├─ [externals]_next_dist_0iuj5m_._.js
│  │  │  ├─ [externals]_next_dist_0iuj5m_._.js.map
│  │  │  ├─ [root-of-the-server]__1doahrz._.js
│  │  │  ├─ [root-of-the-server]__1doahrz._.js.map
│  │  │  ├─ [turbopack]_runtime.js
│  │  │  ├─ [turbopack]_runtime.js.map
│  │  │  ├─ _next-internal_server_app_favicon_ico_route_actions_0g2jjls.js
│  │  │  ├─ _next-internal_server_app_favicon_ico_route_actions_0g2jjls.js.map
│  │  │  └─ ssr
│  │  │     ├─ [root-of-the-server]__0ei1rro._.js
│  │  │     ├─ [root-of-the-server]__0ei1rro._.js.map
│  │  │     ├─ [root-of-the-server]__0g84hko._.js
│  │  │     ├─ [root-of-the-server]__0g84hko._.js.map
│  │  │     ├─ [root-of-the-server]__0vcu5aa._.js
│  │  │     ├─ [root-of-the-server]__0vcu5aa._.js.map
│  │  │     ├─ [root-of-the-server]__1gux7cw._.js
│  │  │     ├─ [root-of-the-server]__1gux7cw._.js.map
│  │  │     ├─ [root-of-the-server]__1s1n4t3._.js
│  │  │     ├─ [root-of-the-server]__1s1n4t3._.js.map
│  │  │     ├─ [root-of-the-server]__1tcd_jn._.js
│  │  │     ├─ [root-of-the-server]__1tcd_jn._.js.map
│  │  │     ├─ [root-of-the-server]__1ubvjr-._.js
│  │  │     ├─ [root-of-the-server]__1ubvjr-._.js.map
│  │  │     ├─ [root-of-the-server]__1w1ep09._.js
│  │  │     ├─ [root-of-the-server]__1w1ep09._.js.map
│  │  │     ├─ [turbopack]_runtime.js
│  │  │     ├─ [turbopack]_runtime.js.map
│  │  │     ├─ _next-internal_server_app__global-error_page_actions_0zi5s8-.js
│  │  │     ├─ _next-internal_server_app__global-error_page_actions_0zi5s8-.js.map
│  │  │     ├─ _next-internal_server_app__not-found_page_actions_0pt47yr.js
│  │  │     ├─ _next-internal_server_app__not-found_page_actions_0pt47yr.js.map
│  │  │     ├─ _next-internal_server_app_page_actions_0hhsz1j.js
│  │  │     ├─ _next-internal_server_app_page_actions_0hhsz1j.js.map
│  │  │     ├─ src_app_page_tsx_1chiuah._.js
│  │  │     └─ src_app_page_tsx_1chiuah._.js.map
│  │  ├─ functions-config-manifest.json
│  │  ├─ interception-route-rewrite-manifest.js
│  │  ├─ middleware-build-manifest.js
│  │  ├─ middleware-manifest.json
│  │  ├─ next-font-manifest.js
│  │  ├─ next-font-manifest.json
│  │  ├─ pages
│  │  │  ├─ 404.html
│  │  │  └─ 500.html
│  │  ├─ pages-manifest.json
│  │  ├─ prefetch-hints.json
│  │  ├─ server-reference-manifest.js
│  │  └─ server-reference-manifest.json
│  ├─ static
│  │  ├─ chunks
│  │  │  ├─ 0atut6a2uuyid.js
│  │  │  ├─ 0cz1d0mv5g_q7.js
│  │  │  ├─ 0esm-l4q5murl.css
│  │  │  ├─ 158myu8e_yme3.js
│  │  │  ├─ 1jq4o6yq14o4c.js
│  │  │  ├─ 3rxl-jt3pdxgx.js
│  │  │  ├─ 425u5352ko2az.js
│  │  │  └─ turbopack-38l7qwik-h828.js
│  │  ├─ ggcBTtn0RK7pU6KkoaguF
│  │  │  ├─ _buildManifest.js
│  │  │  ├─ _clientMiddlewareManifest.js
│  │  │  └─ _ssgManifest.js
│  │  └─ media
│  │     ├─ 4fa387ec64143e14-s.2tuy5pz7dlieh.woff2
│  │     ├─ 53b9e256198e5412-s.390ncx5urfkfu.woff2
│  │     ├─ 5ce348bf30bf5439-s.31988l_ccedte.woff2
│  │     ├─ 6306c77e7c8268e4-s.2dbetqa9o8jxf.woff2
│  │     ├─ 7178b3e590c64307-s.21jp631_3pja2.woff2
│  │     ├─ 797e433ab948586e-s.p.0r6juujl39pe6.woff2
│  │     ├─ 7d817b4c03b0c5f1-s.1uyisp29ctx0d.woff2
│  │     ├─ 8a480f0b521d4e75-s.1qq4vpdcun5oj.woff2
│  │     ├─ bbc41e54d2fcbd21-s.1rgnod-3esatf.woff2
│  │     ├─ caa3a2e1cccd8315-s.p.0wgildi0cnwt9.woff2
│  │     ├─ favicon.2vob68tjqpejf.ico
│  │     └─ fef07dbb0973bf53-s.3p2_lha1f2xer.woff2
│  ├─ trace
│  ├─ trace-build
│  ├─ turbopack
│  └─ types
│     ├─ cache-life.d.ts
│     ├─ routes.d.ts
│     └─ validator.ts
├─ AGENTS.md
├─ CLAUDE.md
├─ README.md
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ assets
│  │  ├─ female_suit_1.png
│  │  ├─ female_suit_2.png
│  │  ├─ male_suit_1.png
│  │  ├─ male_suit_2.png
│  │  └─ pose_landmarker_lite.task
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  ├─ wasm
│  │  ├─ vision_wasm_internal.js
│  │  ├─ vision_wasm_internal.wasm
│  │  ├─ vision_wasm_nosimd_internal.js
│  │  └─ vision_wasm_nosimd_internal.wasm
│  └─ window.svg
├─ src
│  ├─ app
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components
│  │  └─ HUD.tsx
│  ├─ hooks
│  │  ├─ useCamera.ts
│  │  └─ usePoseLandmarker.ts
│  └─ lib
│     ├─ config.ts
│     ├─ mediapipe.ts
│     ├─ suit-renderer.ts
│     └─ types.ts
└─ tsconfig.json

```