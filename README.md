# AarogyaJal – Smart Community Health Monitoring & Early Warning System

> **Final Year Project** | **Status: Production-Ready Candidate**

A comprehensive Smart Community Health Monitoring System designed for rural Northeast India. AarogyaJal detects, predicts, and alerts about potential water-borne disease outbreaks using a deterministic risk engine and real-time community health data.

---

## 🚀 Key Features

### 1. Decision Intelligence Dashboard
- **Real-time Risk Heatmap**: Visualizes village risk levels (Low/Medium/High) using color-coded metrics.
- **AI-Driven Insights**: Automated text summarization of daily health anomalies (e.g., "Water quality is the primary driver for [Village]").
- **Action Queue**: Prioritized list of recommended actions for health officials.
- **Silent Village Detection**: Automatically flags villages that haven't reported data in > 48 hours for accountability.

### 2. Mobile-First Field Surveillance
- **ASHA Worker Optimized**: The interface transforms into a touch-friendly app on mobile devices.
- **Responsive Navigation**: Slide-over drawer and hamburger menus for smaller screens.
- **Offline-Ready UI**: Skeleton loaders and clean states designed for low-connectivity environments.

### 3. Comprehensive Data Management
- **Health Reporting**: Digital forms for logging daily symptoms (fever, diarrhea, vomiting, dehydration).
- **Water Quality Monitoring**: Forms to log pH, turbidity, chlorine, and bacterial presence.
- **Instant Validation**: Immediate visual feedback on unsafe water parameters during data entry.

### 4. Deterministic AI Risk Engine
*Located in `src/lib/riskEngine.ts`*
The system uses a transparent, explainable algorithm to calculate outbreak probability in the browser:
- **Water Quality (45%)**: Weighted score based on WHO safety standards (e.g., Bacterial Presence = Critical Risk).
- **Symptom Trends (35%)**: Analyzes the ratio of specific enteric symptoms to total cases.
- **Seasonality (20%)**: Adjusts risk based on historical monsoon data.

### 5. UI/UX Consistency & Design System
- **Unified Design**: Standardized colors (Teal/Blue/Red/Yellow), typography (Inter), and layout across all pages.
- **Components**: Reusable `PageHeader`, `Card`, `Button`, and `Badge` components ensure visual consistency.
- **Multilingual Support**: Full toggle support for English and Assamese (অসমীয়া), persisting user preference across sessions.

### 6. Interactive Settings & Configuration
- **Profile Management**: Manage user details (mocked).
- **Notification Preferences**: Granular control over Email, SMS, and Push notifications.
- **Security**: 2FA and password management settings.
- **System Preferences**: Data retention and auto-sync intervals.

---

## 🏗️ System Architecture

### Frontend Layer
- **React 18**: Component-based UI architecture.
- **TypeScript**: Strict type safety for all data models.
- **Tailwind CSS**: Utility-first styling with a consistent, professional healthcare design system.
- **Context API**: Global state for Language (`LanguageProvider`) and Mobile Layout (`LayoutProvider`).
- **Routing**: `react-router-dom` for seamless navigation (including `/settings`).

### Logic Layer (Simulated Backend)
- **`useMockData` Hook**: Acts as a client-side database wrapper.
- **Dynamic Logic**: Recalculates risk scores and stats in real-time.
- **State Management**: Data flows from Forms -> Hook -> Risk Engine -> Dashboard.

### Data Models
The system mimics a robust SQL schema:
- `Village`: Geographic & demographic data.
- `HealthReport`: Daily symptom logs.
- `WaterQualityReport`: Lab or field test results.
- `Prediction`: Calculated risk scores and factors.

---

## 📱 User Flow Scenarios

### Scenario A: The Warning Sign
1. **Field Worker** logs in on a mobile phone.
2. She submits a **Water Quality Report** for "Majuli" indicating **Bacterial Presence**.
3. The system immediately flags this report as unsafe.

### Scenario B: The Response
1. **Health Official** checks the **Dashboard**.
2. They see a **"High Risk"** alert for Majuli.
3. The **Health Intelligence** summary explains: *"Water quality contamination is the primary risk driver."*
4. The **Action Queue** suggests: *"Deploy containment team to Majuli."*

---

## 🛠️ Technology Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide Icons
- **Visualization**: Recharts (Trends), Leaflet (Maps)
- **Forms**: React State & Validation
- **Routing**: React Router DOM

---

## 🏃 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Explore the System**
   - Use the **Dashboard** to see the big picture.
   - Use **Health Reports** or **Water Quality** to input new data and watch the AI logic update the risk scores in real-time.

---

**Built for Public Health** 🏥 | **Powered by Logic** 🧠 | **Community First** 👥