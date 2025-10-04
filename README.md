# NASA Space Apps Challenge (Will It Rain On My Parade?)

![Preview Image](https://github.com/Mubassim-Khan/NASA-Space-Apps-Challenge/blob/main/frontend/public/assets/Preview.png)

<div align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="reactdotjs" />
    <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="flask" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="tailwindcss" />
</div>

## 📋 <a name="table">Table of Contents</a>

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#quick-start)
5. [Project Structure](#project-structure)
6. [License](#license)
7. [Contributing](#contributing)
8. [Acknowledgements](#acknowledgements)
9. [Contact](#contact)

## <a name="introduction">🌦️ Introduction</a>

This project is a **Weather Forecast Dashboard** built using **React.js (frontend)** and **Flask (backend)**.
It allows users to **search for any city**, **view detailed weather forecasts**, and **analyze trends** through an interactive chart and dynamic map interface.

The dashboard fetches real-time data from the **Open-Meteo API**, providing temperature, rainfall, windspeed, humidity, and more — displayed with clean UI components styled using **Tailwind CSS** and **Shadcn/UI**.

## <a name="features">✨ Features</a>

👉 **🌍 Interactive Map** — Select or drag location pins to view weather forecasts anywhere on the map.

👉 **📊 Forecast Visualization** — Dynamic temperature trends displayed using a responsive chart.

👉 **📅 Custom Date Range** — View forecasts for 5 days, weeks, or months dynamically.

👉 **📋 Summary Insights** — Auto-calculated weather summaries (avg temp, humidity, rainfall, etc.).

👉 **📡 Real-time API Data** — Fetches live weather data from [Open-Meteo](https://open-meteo.com/).

👉 **🚨 Error Handling & Toasts** — User-friendly notifications for invalid city searches or failed API calls.

👉 **📱 Fully Responsive** — Works seamlessly on desktop, tablet, and mobile devices.

👉 **🧭 Auto Fly-to Location** — Map smoothly centers on selected or searched city coordinates.

## <a name="tech-stack">🛠️ Tech Stack</a>

### **Frontend**

* [React.js](https://reactjs.org/) - UI Library
* [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS Framework
* [Shadcn/UI](https://ui.shadcn.com/) — Reusable UI Components
* [React Leaflet](https://react-leaflet.js.org/) — Interactive Maps
* [React Hot Toast](https://react-hot-toast.com/) — Toast Notifications
* [Recharts](https://recharts.org/en-US/) — Data Visualization

### **Backend**

* [Flask](https://flask.palletsprojects.com/) — Lightweight Python Web Framework
* [Requests](https://pypi.org/project/requests/) — API Request Handling
* [Open-Meteo API](https://open-meteo.com/) — Weather Forecast Data Source

## <a name="#quick-start">🚀 Getting Started</a>

### **Frontend Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/Mubassim-Khan/NASA-Space-Apps-Challenge.git
   cd weather-forecast-dashboard/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Visit the app in your browser:
   👉 [http://localhost:5173](http://localhost:5173)

### **Backend Setup**

1. Navigate to backend folder:

   ```bash
   cd ../backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate   # (or venv\Scripts\activate on Windows)
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask server:

   ```bash
   python app.py
   ```

5. Backend runs at:
   👉 [http://localhost:5000](http://localhost:5000)

## <a name="license">📄 License</a>

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## <a name="contributing">🤝 Contributing</a>

Contributions are always welcome!
If you find any bugs, issues, or have suggestions for improvement:

* Open an issue in this repository, or
* Submit a pull request with detailed information.

## <a name="contact">📬 Contact</a>

If you have any questions, suggestions, or feedback, reach out to the project maintainer:

* **LinkedIn:** [Mubassim Ahmed Khan](https://www.linkedin.com/in/mubassim)
* **Email:** [mubassimkhan@gmail.com](mailto:mubassimkhan@gmail.com)
