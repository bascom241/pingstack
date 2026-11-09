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

## Landing page links

Get started, registration, and Log in open `https://pingstackapp.vercel.app/`. Set `NEXT_PUBLIC_APP_URL` before building to override the dashboard entry URL. See `.env.example`. Pricing enquiries use the same support address; rates are not published until confirmed.

The developer examples match the local backend request contracts. Set `baseUrl`, a server-side `accessToken`, and an owned `savedTemplateId` before using them. Examples do not send live requests from this landing page.

## Color themes

Use the navbar selector for System, Light, or Dark. The preference is saved under `pingstack-theme`; System follows the operating system. Theme tokens are in `app/globals.css`, the pre-paint initializer is in `app/lib/theme-script.ts`, and the reactive preference store is in `app/lib/theme.ts`. The globe updates its palette without restarting the scene. See `docs/DARK_MODE_PLAN.md` for the design and validation record.

## 3D use-case stories

`UseCases.tsx` pairs four scrolling desktop stories with one sticky scene; mobile uses an accessible button selector. `UseCaseScene.tsx` builds the phone, receipt, appointment marker, and email window directly in Three.js. Message surfaces use CSS3DRenderer so the text stays HTML. The scene loads near the viewport, animates only while a transition is running onscreen, and respects live reduced-motion preferences. A static HTML device replaces the renderer when WebGL is unavailable or its context is lost. No external model assets or provider calls are required.

## Interactive workspace preview

`MessagingWorkflow.tsx` presents the supplied screenshots in one lazy-loaded Three.js workspace (`WorkspaceScene.tsx`) with CSS3DRenderer. Feature tabs, previous/next controls, and keyboard arrow/Home/End navigation select the view. Desktop supports subtle pointer tilt and a raised crop of the original screenshot; mobile uses an inspect dialog. The full screenshot can also be opened in a native accessible dialog. These are product previews, not live account actions. Reduced-motion preferences use the flat screenshot presentation; WebGL failures and context loss fall back to the same controls and screenshots. Rendering stops when the scene settles or leaves the viewport.

## Closing section and footer

The final CTA uses an open typographic layout instead of a boxed banner. The footer groups Product, Developers, and Help & enquiries navigation, provides the existing support address, and closes with a large brand wordmark. Links use real in-page sections or the existing contact email; Back to top targets the navbar. Both themes and mobile layouts are supported without additional 3D assets.
