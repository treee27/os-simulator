# ⚙️ CPU Scheduling & Page Replacement Simulator (React + Firebase)

A **web-based Operating Systems simulator** built using **React.js** and **Firebase** that helps visualize and understand **CPU Scheduling Algorithms** and **Page Replacement Algorithms** interactively.

It calculates and displays **Waiting Time**, **Turnaround Time**, **Completion Time**, **Gantt Chart**, **Page Faults**, and **Fault Rates** — all in an intuitive and responsive interface.

---

## 🚀 Features

### 🧠 CPU Scheduling Algorithms
- **FCFS (First Come First Serve)**
  - Non-preemptive scheduling
  - Processes are executed in the order they arrive
  - Calculates:
    - Waiting Time (WT)
    - Turnaround Time (TAT)
    - Completion Time (CT)
    - Average WT and TAT

- **SJF (Shortest Job First)**
  - Non-preemptive algorithm
  - Process with the shortest burst time is executed next
  - Reduces average waiting time

- **Priority Scheduling**
  - Non-preemptive scheduling based on process priority
  - Lower priority number = higher priority
  - Calculates same metrics as above

- **Round Robin (RR)**
  - Preemptive scheduling
  - Each process is given a fixed time quantum
  - Context switching simulated
  - Calculates:
    - Completion Time
    - Waiting Time
    - Turnaround Time
    - Average WT & TAT

---

### 🧩 Page Replacement Algorithms
- **FIFO (First In First Out)**
  - Oldest page in memory is replaced first
  - Displays step-by-step frame state changes
  - Shows total page faults and fault rate

- **LRU (Least Recently Used)**
  - Page not used for the longest time is replaced
  - Simulates stack-based page replacement
  - Shows total page faults and fault rate

---

## 📊 Output Metrics

| Metric | Description |
|--------|-------------|
| **CT (Completion Time)** | Time when a process finishes execution |
| **TAT (Turnaround Time)** | `CT - Arrival Time` |
| **WT (Waiting Time)** | `TAT - Burst Time` |
| **Average TAT & WT** | Mean of all processes |
| **Page Faults** | Number of times a page had to be loaded into memory |
| **Fault Rate (%)** | `(Page Faults / Total Pages) × 100` |

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React.js |
| Styling | Tailwind CSS |
| State Management | React Context API |
| Backend | Firebase Firestore |
| Auth | Firebase Authentication |
| Deployment | Firebase Hosting |

---

## 🧩 Project Modules

### 🔹 CPU Scheduler (`/pages/CPUScheduler.jsx`)
Handles all CPU scheduling algorithms with table output and Gantt chart visualization.

### 🔹 Page Replacement (`/pages/PageReplacement.jsx`)
Simulates FIFO and LRU algorithms with frame visualization and page fault stats.

### 🔹 Firebase Setup (`/firebase.js`)
Manages Firestore database and authentication.

### 🔹 Context (`/context/AuthContext.jsx`)
Provides user authentication context across all pages.

---

