# supastro

## Table of Contents

- [About](#about)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Using](#using)

## About

This repository contains the demonstration project for the Astro talk.

The slides can be found here: [Astro talk](https://github.com/MrSquaare/astro-talk)

## Getting started

### Prerequisites

1. [Install Node.js](https://nodejs.org/en/download/)
2. [Install pnpm](https://pnpm.io/installation)
3. [Setup Supabase](SETUP-SUPABASE.md)

### Installation

1. Clone the repository:

```shell script
git clone https://github.com/MrSquaare/supastro.git
cd supastro
```

2. Install dependencies:

```shell script
pnpm install
```

3. Build the project:

```shell script
pnpm build
```

## Using

1. Set required environment vars to [`wrangler.toml`](./wrangler.toml)

```toml
# ...

[vars]
SUPASTRO_SERVER_URL = "supabase_url"
SUPASTRO_CLIENT_URL = "supabase_url"
SUPASTRO_CLIENT_KEY = "supabase_anon_key"

# ...
```

2. Set required secrets to `.dev.vars`

```text
SUPASTRO_SERVER_KEY="supabase_service_key"
```

3. Launch the Wrangler preview:

```shell script
pnpm preview
```
