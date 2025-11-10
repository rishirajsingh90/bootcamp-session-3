# Cloud Architecture Overview

This repository is a monorepo with a React frontend (`packages/frontend`) and a simple Express backend (`packages/backend`). The MVP is intentionally local-first (frontend uses localStorage) and does not require cloud services. Below is a simple system-context diagram showing the main components and optional future cloud integrations.

```mermaid
flowchart TB
  %% System Context Diagram for TODO app monorepo
  subgraph User[Users]
    U[User Browser]
  end

  subgraph Frontend[packages/frontend]
    F[React App]
  end

  subgraph Backend[packages/backend]
    B[Express API]
  end

  subgraph Local[Local Storage]
    LS[Browser localStorage]
  end

  U -->|Interacts via UI| F
  F -->|Reads/Writes| LS
  F -->|Optional API calls| B
  B -->|Optional DB| DB[(Database - future)]
  F -.->|Optional 3rd-party services| Auth[(Auth Provider)]
  F -.->|Optional 3rd-party services| Notif[(Notification Service)]

  classDef optional fill:#f9f9f9,stroke-dasharray: 3 3
  class B,DB,Auth,Notif optional
```

Notes

- MVP: frontend only, localStorage for persistence. No backend or cloud required.
- Post-MVP: backend (`packages/backend`) can be enabled to provide persistent storage, multi-user support, and integrations (auth, notifications).

## Sequence: Create TODO

The sequence below shows a typical "Create TODO" flow in the MVP (local-first), and the optional backend interaction for Post-MVP.

```mermaid
sequenceDiagram
  participant U as User Browser
  participant F as Frontend (React)
  participant LS as Browser localStorage
  participant B as Backend (Express) 

  U->>F: Fill task form (title, dueDate?, priority?)
  F->>F: Validate input (title required, parse dueDate)
  alt validation fails
    F-->>U: Show validation error
  else validation succeeds
    F->>LS: Persist new task locally
    LS-->>F: Confirm save
    F-->>U: Show created task in list
    par optional backend sync
      F->>B: POST /tasks (task payload)
      B-->>F: 201 Created
    end
  end

```

Notes

- In the MVP, the flow ends with localStorage persistence and immediate UI update.
- In Post-MVP, the frontend may also send the task to the backend (`packages/backend`) for centralized storage and multi-user syncing.


