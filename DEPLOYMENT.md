# GitHub Pages Deployment

This repository is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

## Setup Instructions

To enable GitHub Pages deployment for this repository:

1. Go to your repository on GitHub
2. Click on **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

The workflow will automatically build and deploy the site whenever changes are pushed to the `main` branch.

## Accessing the Site

Once deployed, your site will be available at:
https://Kirbyfan1223.github.io/time-shift-calculato/

## Manual Deployment

You can also trigger a manual deployment by going to the **Actions** tab and running the "Deploy to GitHub Pages" workflow manually.

## Local Development

To run the site locally:

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```
