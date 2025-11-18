# Workbench Risk Viewer (React)

A Vite + React single-page app that reimagines the provided HTML mockup with tabbed navigation, rich styling, and data-driven panels for ASP outputs and snapshot visualisations.

## Features

- Tabbed layout mirroring the original workbench sections (ASP, Snapshot, and placeholders for the remaining tabs).
- Context toggles for portfolio and ASP views, preserving the UX from the shared HTML.
- Snapshot visuals using Recharts (status mix, party table, premium history, and rate change view).
- ASP panel that renders HTML returned by the live API or falls back to mock content.
- Mock dataset to develop locally without live connectivity.

## Getting started

> The container used to author this code could not reach npm registries, so the dependency installation step is unverified here. Run the steps below in an environment with internet access.

```bash
npm install
npm run dev
```

Then open `http://localhost:4173?riskid=302` (or any `riskid` your API supports).

### Environment and API

- Base URL: `https://common-dalint-api-management.azure-api.net/dev/dalint/api/v1`
- Subscription key (used inline in the API client): `9a84719bcc7541b6a525b7be4377e8be`
- ASP links also reference the pricing sheet subscription key from the original HTML snippet.

If you want to swap in environment variables, update `src/api/client.js` to pull keys from `import.meta.env` and configure a `.env` file with `VITE_API_KEY` values.

### Running a production build

```bash
npm run build
npm run preview
```

## Deployment (Azure Static Web Apps)

The simplest Azure path is Static Web Apps + GitHub Actions:

1. Push this repo to GitHub.
2. In the Azure Portal, create a **Static Web App** and connect it to your GitHub repo/branch.
3. Build preset: **Custom**
   - App location: `/`
   - Api location: *(leave blank)*
   - Output location: `dist`
   - Build command: `npm run build`
4. Azure will generate a GitHub Actions workflow. Commit it or let the portal create it automatically. The workflow installs dependencies, runs `npm run build`, and uploads the `dist/` folder.
5. Once the action succeeds, your site is live on the Azure-provided URL. Map a custom domain in the Static Web App settings if needed.

If you prefer a simple static host, you can also run `npm run build` locally and upload the `dist/` folder to Azure Blob Storage with static website hosting enabled.

### Publishing to GitHub

If you want this work to live on GitHub, push the current branch (named `work` here) to your desired remote. For example, assuming you have a `origin` remote configured:

```bash
git push origin work
```

You can also push it as a new branch name (for example `feature/workbench-ui`) with:

```bash
git push -u origin work:feature/workbench-ui
```

Once pushed, open a pull request in GitHub and connect that branch to Azure Static Web Apps as described above.

## Project structure

```
├── index.html
├── src
│   ├── api
│   │   └── client.js        # API helpers for ASP and programme endpoints
│   ├── components           # Reusable UI/visual components
│   ├── data
│   │   └── mockApiResponse.js
│   ├── styles
│   │   └── app.css
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js
├── package.json
└── .eslintrc.cjs
```

## Notes on data modelling

- The mock dataset mirrors the shape implied by the supplied HTML: programme meta, status mix, parties, premium history, and rate change distribution. Extend `mockApiResponse` as your API evolves.
- ASP HTML blocks are rendered directly; ensure the API returns safe HTML snippets or sanitise as needed.
- Visuals use Recharts for quick layout. Swap in Plotly/D3 if you need parity with the original prototype.

## Next steps

- Replace inline subscription keys with environment variables.
- Wire real data for the placeholder tabs and enrich with additional charts.
- Add automated testing and linting steps to the CI workflow once npm connectivity is confirmed.
