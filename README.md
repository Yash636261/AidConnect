# AidConnect Disaster Relief Application

## Overview

AidConnect is a disaster relief web application designed to centralize and analyze data from multiple social media platforms such as Twitter, Instagram, and Facebook. The application leverages a dual architecture: a **Next.js-based client** and an **Express.js-based server**. It facilitates disaster response operations by identifying needs and availabilities, generating insights using LLMs, and presenting actionable data for organizations via dashboards.


---

## Features

1. **Data Centralization**:
   - Aggregates data from Twitter, Instagram, and Facebook.
   - Identifies and categorizes posts as "Needs" or "Availability."

2. **LLM Insights**:
   - Processes posts using Large Language Models (LLMs) to extract actionable insights.
   - Adds insights like urgency levels, sentiment analysis, and recommended actions.

3. **Dashboards**:
   - Interactive dashboards showcasing disaster data.
   - Filters to view data by location, urgency, and type (Need vs Availability).

4. **Chat with Database**:
   - Allows users to query the database interactively using AI for tailored information.

5. **API Endpoints**:
   - Exposes RESTful APIs for managing and querying centralized disaster data.


## Technologies Used

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Backend**: Express.js, TypeScript, Node.js
- **Database**: MongoDB
- **LLMs**: Integrated for text processing and insights generation
- **Deployment**: Render, Vercel (or similar hosting platforms)




