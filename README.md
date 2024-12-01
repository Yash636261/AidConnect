# 🌊 DisasterFlow: Real-time Disaster Response & Resource Management

**DisasterFlow** is an intelligent platform that aggregates and analyzes social media data to facilitate rapid disaster response and resource management. By leveraging AI/ML capabilities and real-time social media monitoring, it helps identify areas of need and available resources during disasters.

---

## 🚀 Key Features

### 🔄 **Social Media Integration**

- Real-time monitoring of **Twitter**, **Facebook**, and **Instagram**
- Automated data collection and classification
- Sentiment analysis and urgency detection

### 🤖 **AI-Powered Analysis**

- **Smart Classification**: Automatically categorizes posts as needs or availability
- **Insight Generation**: AI-generated actionable insights for each post
- **Urgency Detection**: Intelligent prioritization of critical needs

### 📊 **Interactive Dashboard**

1. **Real-time Map View**

   - Visualize disaster-affected areas
   - Track resource availability
   - Monitor need hotspots

2. **Data Analytics**
   - Trend analysis
   - Resource distribution metrics
   - Response effectiveness tracking

### 🔔 **Automated Alerts**

- Real-time notifications for critical needs
- Resource matching alerts
- Status updates and reports

---

## 🛠️ Technical Stack

### Frontend (Next.js 14)

- **Framework**: Next.js with App Router
- **UI Components**: Shadcn/UI
- **Styling**: Tailwind CSS
- **State Management**: React Context/Hooks
- **Maps**: Leaflet.js

### Backend (Node.js)

- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **AI Integration**: OpenAI API
- **Social Media APIs**: Twitter, Facebook, Instagram

---

## 📦 Project Structure

### Client Structure

```
client/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── home/
│   │   ├── map/
│   │   ├── posts/
│   │   └── availability/
│   └── api/
├── components/
│   ├── shared/
│   └── ui/
└── lib/
    └── utils/
```

### Server Structure

```
server/
├── src/
│   ├── controllers/
│   │   ├── action.controller.ts
│   │   ├── classify.controller.ts
│   │   └── disaster.controller.ts
│   ├── models/
│   │   ├── Tweet.model.ts
│   │   ├── FacebookPost.model.ts
│   │   └── InstagramStory.model.ts
│   └── routes/
└── dist/
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB
- Social Media API Keys
- OpenAI API Key

### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/disasterflow.git
cd disasterflow
```

2. **Setup Client**

```bash
cd client
npm install
npm run dev
```

3. **Setup Server**

```bash
cd server
npm install
npm run dev
```

4. **Environment Variables**

Client (.env.local):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_CLERK_WEBHOOK_SECRET=your_clerk_secret
```

Server (.env):

```env
MONGODB_URI=your_mongodb_uri
APIFY_API_TOKEN=your_apify_token
OPENAI_API_KEY=your_openai_key
```

---

## 🔄 Core Workflows

### Social Media Data Processing

1. Data Collection from multiple sources
2. AI-powered classification
3. Sentiment analysis
4. Geolocation mapping
5. Priority assignment

### Resource Management

1. Need identification
2. Resource matching
3. Status tracking
4. Response coordination

---

## 🤖 Automated Workflows with Kestra

### Data Collection & Processing Pipeline

DisasterFlow uses Kestra for orchestrating automated workflows that handle data collection, transformation, and analysis. Here's how our main pipeline works:

### 🔄 Main Workflow

```yaml
# Data Collection Pipeline
id: final.weMakesDevs
namespace: technodes.wemakedevs

tasks:
  # 1. Social Media Data Collection
  - fetch-twitter-posts # Fetches latest tweets
  - fetch-instagram-stories # Fetches Instagram stories
  - fetch-facebook-posts # Fetches Facebook posts

  # 2. Data Transformation
  - disaster_case_api # Transforms data into unified format

  # 3. AI Processing
  - classify_api # Classifies posts (needs/availability)
  - llm_insights # Generates AI insights
```

### ⚡ Key Automation Features

1. **Automated Data Collection**

   - Periodic fetching from multiple social media sources
   - MongoDB integration for data storage
   - Configurable batch sizes and intervals

2. **Intelligent Processing**

   - Automated classification of posts
   - AI-powered insight generation
   - Real-time data transformation

3. **Error Handling**
   - Automatic issue creation on GitHub for failures
   - Error logging and monitoring
   - Retry mechanisms for failed tasks

### 🔍 Monitoring & Alerts

```yaml
# Auto Issue Creation on Failure
id: create-github-issue-on-failure
namespace: company.team

triggers:
  - on_failure:
      type: io.kestra.plugin.core.trigger.Flow
      conditions:
        - ExecutionStatusCondition: [FAILED, WARNING]
```

This automated pipeline ensures:

- Continuous data collection from all sources
- Real-time processing and analysis
- Immediate alert generation for critical issues
- Seamless integration with our main application

---
