# Observability System POC

## Overview

This Proof of Concept (POC) aims to demonstrate my ability to build a fully functional observability system with a strong emphasis on both front-end and back-end architecture, as well as the overall design of the front-end application. 

**Note:** Due to time constraints, some backend services may not be as clean or refined as they could be. This includes areas such as file system database, typing and the presence of hardcoded values. I apologize for any inconvenience this may cause.

## Features

- **Comprehensive Observability**: The system has all answers to these questions:
    - What is my computer's current average CPU load?
    - How did the average CPU load change over a 10 minute window?
    - Has my computer been under heavy CPU load for 2 minutes or more? When? How many times?
    - Has my computer recovered from heavy CPU load? When? How many times?
- **Robust Front-End Architecture**: The front-end application is designed with a focus on maintainability, scalability, and user experience.
- **Backend Services**: A suite of backend services to support the observability features, although some aspects may lack refinement due to time constraints. For example, in a real-world scenario, we would opt for OpenTelemetry (OTEL) tools, such as using a collector as an agent and a centralized collector service.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v21 or later)
- npm (v10 or later)
- OSX (it should work on Windows, but I've not tested it)

### Installation
In the root folder
1. Install dependencies for the front-end and each backend service by runnings these commands

    ```bash
    npm run install
    npm run bootstrap
    ```

2. Run all services:

    ```bash
    npm run dev
    ```
**Note**:
To simulate heavy CPU load I recommend using `stress --cpu {number_of_cpus} --timeout 999` [Link](https://formulae.brew.sh/formula/stress). 

### Usage

1. **Front-End Application**: The front-end application can be accessed at `http://localhost:5173`.
2. **API Endpoints**: The backend services expose various endpoints for metrics and events (more info below)


## Before deploying to production
Before going live, couple of remarks what needs to be added
- Internationalization
- Add more unit & integration tests
- Add breadcrumbs
- Move inline CSS styles to separate files and polish them
- Migrate to `useQuery` and remove the `HostProvider` (alternative tackle state management using Redux/...)
- Add build pipeline (CircleCI/Github Actions)
    - **Make sure to create automated strict rules of dependencies for feature folders so we avoid importing files from other feature teams!** (https://www.npmjs.com/package/dependency-cruiser). Alternative we could introduce isolated packages for each feature folders.

## Architecture & Deployment
- Add diagrams and video how to deploy this app on the internet
### BE Architecture
- Diagram
### FE Architecture
- Diagram

## Walkthrough
