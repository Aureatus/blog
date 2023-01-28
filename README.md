
# Blog Project
This is a project consisting of two sites, one for reading blog posts, and one for writing, editing and deleting them.

The site for writing blog posts can be found here: https://blog-read.vercel.app

## Table of Contents
* [Features](#features)
* [Roadmap](#roadmap)
* [Tech stack](#tech-stack)
* [Run locally](#run-locally)
  * [Frontend](#frontend)
  * [Backend](#backend)



## Features
- Anyone can read posts that have been published, alongside any comments on it.
  - Users can comment on posts.
- Users can create posts, and edit or delete them.
  - Can select whether they are published when creating or editing them.

## Roadmap

- Let users delete and edit comments.
- Add ability for users to add reactions to either posts, comments or both, via emojis in a similar style to discord.
- Implement a rich text editor for writing posts.

## Known Issues

- Changing published status of a post doesn't work.
- Admins can edit other peoples posts. Ideally, they should only be able to delete them.
- Characters that are escaped by express-validator, are not displayed properly, since they're HTML and the post content is just rendered as text.
- The way loading of data is currently handled, if you're in a different region to where the server is hosted, the site will feel very unresponsive.

## Tech Stack

**Client:** React, TypeScript, Bulma

**Server:** Express, TypeScript, MongoDB with Mongoose


## Run Locally

Clone the project

```bash
  git clone https://github.com/Aureatus/readvocab.git
```

#### Frontend
Go to the project directory

```bash
  cd blog/frontend/yourPath
```

Install dependencies

```bash
  npm install
```

Provide environment variable for VITE_restBlogAPIprefix.

Start the server

```bash
  vite
```

#### Backend
Go to the project directory

```bash
  cd blog/backend
```

Install dependencies

```bash
  npm install
```

Provide environment variables for PORT, JWT_SECRET and mongoConnectionURL.

Start the server

```bash
  npm run serverstart
```
