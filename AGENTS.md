[.gitignore](../VanGeelNuxt/.gitignore)# 🤖 Codex Agents Overzicht

Dit document beschrijft de verschillende agents in het Codex-programma. Elke agent is een module met een specifieke taak, geoptimaliseerd voor samenwerking binnen het systeem. Agents communiceren via een centrale router of orchestrator.

---

## 🔧 Architectuur
- Elke agent is een geïsoleerde module (bijv. als class, service of microservice)
- Agents communiceren via events of een shared state manager
- Agents zijn asynchroon, schaalbaar en stateless indien mogelijk

---

## 🧠 Beschikbare Agents

### 1. `InputAgent`
- **Doel**: Verwerken en normaliseren van gebruikersinvoer
- **Taken**:
    - Parseren van natuurlijke taal
    - Detecteren van commando's of intenties
- **Output**: gestandaardiseerde queryobjecten

---

### 2. `PlannerAgent`
- **Doel**: Interpreteren van input en opstellen van een plan
- **Taken**:
    - Kiezen welke agents geactiveerd worden
    - Maken van sequentiële of parallelle actieplannen
- **Output**: een `Plan` met stappen en doelstellingen

---

### 3. `ExecutionAgent`
- **Doel**: Uitvoeren van een plan
- **Taken**:
    - Stap voor stap uitvoeren of delegeren
    - Error handling & retries
- **Output**: Resultaten of foutmeldingen

---

### 4. `MemoryAgent`
- **Doel**: Opslaan en ophalen van context of langetermijninformatie
- **Taken**:
    - Loggen van conversaties
    - Vragen wat eerder gebeurd is
- **Output**: Herinneringen of contextuele data

---

### 5. `OutputAgent`
- **Doel**: Vormgeven van output naar de gebruiker
- **Taken**:
    - Genereren van natuurlijke taal
    - Formatteren van antwoorden of data
- **Output**: UI-ready response of gesproken feedback

---

### 6. `ToolAgent`
- **Doel**: Toegang tot externe APIs of tools
- **Taken**:
    - Roepen van externe services aan (bv. weerbericht, database, rekenmodules)
- **Output**: Data van externe tools of bevestigingen van acties

---

## 💡 Voorbeeldflow

```text
[User] → InputAgent → PlannerAgent → ExecutionAgent
                            ↓              ↓
                         MemoryAgent    ToolAgent
                            ↓              ↓
                        OutputAgent → [User]
