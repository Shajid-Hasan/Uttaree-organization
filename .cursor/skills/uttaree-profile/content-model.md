# Content model

All public copy is JSON. The client imports these files and also refreshes from `GET /api/content`.

## site.json

- `ownership.foundingMembers`, `ownership.shareholders`, `founded` — the only public ownership data.
- `ownership.statement` and `committeeNote` — about-page sentences.
- `hero[]` — slides. `image` may be `""`. `ctaTo` is an internal path.
- `contact` — office phone, email, address, `mapUrl`. `hours` hidden when empty.
- `social[]` — `{ "label", "url" }`. Hidden when empty. Use real profiles only.
- `clients[]` — `{ "name", "logo" }`. The clients row is hidden when empty.
- `nav[]` — `{ "label", "to", "children" }`. `children: true` builds the company dropdown from projects.

## projects.json

```json
{
  "slug": "uttaree-agro",
  "name": "Uttaree Agro",
  "category": "Agriculture",
  "status": "Active",
  "established": 2024,
  "location": "Rangpur, Bangladesh",
  "summary": "One sentence.",
  "about": ["Paragraph."],
  "services": ["Crop production"],
  "quote": "",
  "image": "",
  "logo": "",
  "facts": [{ "label": "Students", "value": "40" }],
  "committees": [
    { "year": 2026, "current": true, "director": "", "assistantDirector": "" }
  ]
}
```

Empty director names are kept in the file and omitted on the page.

## news.json

`articles[]`: `slug`, `projectSlug`, `title`, `date` (`YYYY-MM-DD`), `excerpt`, `image`, `body` (array of paragraphs).

## landings.json

`landings[]`: `slug`, `projectSlug`, `active`, `eyebrow`, `title`, `text`, `points`, `image`, `ctaLabel`.

Public URL: `/go/agro`. Inactive landings are not returned by the API.

## API

- `GET /api/health`
- `GET /api/content`
- `POST /api/inquiries` — `name`, `phone`, `message`, optional `email`, `projectSlug`, `source`, `kind` (`contact` or `landing`). Honeypot field `company` must stay empty.

There is no public members endpoint.
