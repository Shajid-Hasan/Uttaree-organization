---
name: uttaree-profile
description: >-
  Builds and edits the Uttaree company profile: content JSON, reusable UI,
  project committees, ad landing pages, and the secured Express API. Use when
  working in the Uttaree project, changing ventures, news, contact, landing
  pages, ownership counts, committee names, colours, or preparing the site to
  go live.
---

# Uttaree profile

Uttaree is a collective enterprise, not a single-owner firm. The public site follows a group-company pattern: home, about, companies, news, contact, plus ad landings.

## Rules

- Copy, ventures, news, landings, colours, and ownership counts come from data files. Do not hardcode new marketing text in components.
- Publish ownership as counts only. Never add member or shareholder phone, email, age, WhatsApp, or Facebook to `content/`, `client/`, or any public API.
- A committee entry may show a person's name and role only, after they have agreed. No personal contact fields.
- Logo and photos stay empty until real files exist. Put files in `client/public/media/` and set the path in JSON, for example `/media/agro.jpg`. Empty `image` or `logo` renders `MediaFrame`.
- Office contact lives in `content/site.json`. Venture pages do not get their own private numbers.

## Where to edit

| Change | File |
| --- | --- |
| Name, story, hero, nav, phone, email | `content/site.json` |
| Colours | `client/src/index.css` `@theme` |
| Venture, services, committee | `content/projects.json` |
| News | `content/news.json` |
| Ad landing | `content/landings.json`, route `/go/:slug` |
| Button, section, image slot | `client/src/components/ui/` |
| Inquiry form | `client/src/components/forms/InquiryForm.jsx` |

Colour tokens: `--color-primary`, `--color-primary-dark`, `--color-gold`, `--color-paper`, `--color-ink`. Buttons use those classes (`bg-primary`). Change the token, not each button.

## Add a committee name

In the venture's `committees` array, set `director` and `assistantDirector` for that `year`. Keep older years. Mark the active year with `"current": true` and the others `false`.

## Add a venture

Add one object to `content/projects.json` with `slug`, `name`, `category`, `status`, `established`, `location`, `summary`, `about`, `services`, `quote`, `image`, `logo`, `facts`, `committees`. The nav dropdown and company grid read this list. Add a landing in `content/landings.json` only if an ad page is needed.

## Run and go live

Dev: `npm run dev` from the repo root. Site `http://localhost:5173`, API `http://localhost:5000`.

Live, same server: `npm run build`, set `NODE_ENV=production`, then `npm start`. Express serves `client/dist` and the API. Set `CLIENT_ORIGIN` only if the site and API are on different origins. `MONGODB_URI` is optional; without it, inquiries are saved in `server/storage/` (not public).

## More detail

See [content-model.md](content-model.md).
