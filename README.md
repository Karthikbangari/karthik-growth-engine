# Karthik Growth Engine

A promotion + lead-generation tool for a portfolio-website business. It's a
public marketing site **plus** a private toolkit: a promotion-post generator, a
price calculator, a WhatsApp link builder, a follow-up message writer, and a
password-protected lead dashboard.

Built with **React + Vite + Tailwind CSS + Framer Motion**. No backend needed —
leads are stored in the browser's `localStorage`.

---

## Run it locally

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install      # install dependencies (one time)
npm run dev      # start the dev server at http://localhost:5173
```

Build for production:

```bash
npm run build    # output goes to /dist
npm run preview  # preview the production build
```

---

## Deploy (free)

**Vercel** — push this folder to GitHub, then "Import Project" on
[vercel.com](https://vercel.com). Framework is auto-detected as Vite. The
included `vercel.json` makes deep links (like `/tools`) work.

**Netlify** — drag the `dist` folder onto
[app.netlify.com/drop](https://app.netlify.com/drop), or connect the repo with
build command `npm run build` and publish directory `dist`. The included
`public/_redirects` handles routing.

---

## Make it yours (edit these first)

Everything personal lives in a few files so you don't have to hunt through code:

| What | File |
| --- | --- |
| WhatsApp number, Instagram, email, **admin password** | `src/lib/constants.js` |
| Services & starting prices | `src/data/services.js` |
| Pricing packages + calculator amounts | `src/data/pricing.js` |
| Portfolio cards, process steps, FAQs, testimonials | `src/data/portfolio.js` |
| Promotion-post & follow-up templates, tones | `src/data/content.js` |
| Colors & fonts | `tailwind.config.js` |

> **Change the admin password.** Open `src/lib/constants.js` and set
> `ADMIN_PASSWORD` to your own secret before deploying.

---

## Two honest notes about the dashboard

**1. The password is a soft gate, not real security.** Because this MVP has no
backend, the password check happens in the browser. It keeps casual visitors
out, but anyone technical could read it in the code. Don't store anything you'd
be upset to leak here. When you add a backend (below), move auth there.

**2. Leads live in one browser, on one device.** `localStorage` is not shared
across devices or visitors. That means:

- Leads **you add manually** in the dashboard are saved on **your** device.
- A lead a **customer** submits via the public contact form is saved on **their**
  device — so it will *not* show up in your dashboard on your laptop.

For an MVP this works well as your **personal CRM**: your real funnel is
WhatsApp, and you add each lead to the dashboard yourself. When you're ready for
the public form to reach you across devices, add a real database.

### Upgrading to a real database later

The storage layer is isolated in `src/lib/storage.js`. Swap the `localStorage`
calls for [Supabase](https://supabase.com) or [Firebase](https://firebase.google.com)
there, and the rest of the app keeps working unchanged. The content generator
(`src/data/content.js`) also has a `generateAIContent()` function with a marked
spot to plug in an AI API later.

---

## Pages

- `/` — Home (hero, services, pricing, portfolio, process, testimonials, FAQ, contact)
- `/services` — Services & pricing detail
- `/tools` — Post Generator · Price Calculator · WhatsApp Link · Follow-up
- `/contact` — Contact details + public lead form
- `/dashboard` — Password-protected lead tracker
