# Create-Event

Event Calendar is the first part of a desing and creation series of smaller projects.

- Event calendar
- Events Creator Frontend
- Events Creator Api

---

## Introduction

This task will require you to use React Typescript. You will need to organize your code into components and determine where to handle the logic. You shouldn't use any component libraries.

---

## MVP

Create a page that displays a calendar. The calendar should include a title showing the current month and a grid of days (Please note that you DO NOT have to use css grid to style it).
• Each of the days cells should be clickable.
• When a user click on a chosen day, a modal should appear (empty for now)
• The user should be able to navigate between months - view the upcoming month, previous month etc.

---

## Build Steps

- how to build / run project

1. Clone the repo and run

```bash
npm install
```

2. Run

```bash
npm run dev
```

3. And visit the provided url.

---

## Design Goals / Approach

- Version control using GitHub
- Project management using GitHub Issues and Linear
- API-First approach using OpenAPI and SwaggerHub
- Test-driven development TDO: Red, Green, Refactor development cycle
- Continuous integration/ continuous deployment using GitHub Actions

- I chose to use ModelMapper in this project.
- I chose to use JavaFaker for data seeding
- I am using Abstract class as a BaseEntity class holding ID, createdAt and updatedAt, which is then inherited by the child
- For testing I chose RestAssure for end to end testing and Mockito for unit testing

---

## Features

---

## Known issues

---

## Future Goals

---

## What did you struggle with?

---

## Licensing Details

- Public, free
