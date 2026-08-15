# HOH Voting Platform

A simple, interactive **Head of House (HOH) Voting Platform** built with **HTML, Tailwind CSS, and TypeScript**.

The platform allows registered voters to select their name, choose between two HOH candidates, and cast a vote. The system prevents duplicate voting, updates candidate scores in real time, enforces a maximum of 20 successful votes, and dynamically displays the election result using the existing result modal.

## 🚀 Features

* Voter selection through a dropdown menu
* Two HOH candidates:

  * Kosi
  * Augustine
* One vote per registered voter
* Duplicate-vote prevention
* Real-time candidate vote-count updates
* Total vote counter
* Maximum of 20 successful votes
* Automatic voting shutdown when the limit is reached
* Validation for missing voter or candidate selections
* Existing **Check Result** button connected to TypeScript logic
* Existing result modal displays the dynamically calculated election result
* Automatic winner determination
* Tie/draw detection
* No page refresh required when submitting votes
* Strong TypeScript typing with no unnecessary `any`
* Responsive layout using Tailwind CSS

## 🛠️ Technologies Used

* **HTML5** — Page structure and form elements
* **Tailwind CSS** — Styling and responsive layout
* **TypeScript** — Voting logic, state management, validation, and result calculation
* **Bun** — Package management and development tooling
* **TypeScript Compiler (`tsc`)** — Compiles TypeScript into browser-compatible JavaScript

## 📁 Project Structure

```text
Voting-System/
│
├── src/
│   ├── img/
│   │   └── logo.png
│   │
│   ├── index.html
│   ├── input.css
│   ├── output.css
│   └── voting.ts
│
├── dist/
│   └── voting.js
│
├── node_modules/
├── package.json
├── package-lock.json
├── bun.lock
└── tsconfig.json
```

### Important Files

| File             | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `src/index.html` | Main voting page and existing UI              |
| `src/voting.ts`  | All voting logic and state management         |
| `src/input.css`  | Tailwind/input styling                        |
| `src/output.css` | Generated CSS                                 |
| `dist/voting.js` | Compiled JavaScript generated from TypeScript |
| `tsconfig.json`  | TypeScript compiler configuration             |
| `package.json`   | Project dependencies and scripts              |

## 🗳️ How the Voting System Works

### 1. Select a Voter

A voter selects their name from the voter dropdown.

The system keeps track of voters who have already successfully submitted a vote.

### 2. Select a Candidate

The voter chooses one of the two available candidates:

* Kosi
* Augustine

### 3. Submit the Vote

When the voter submits the form, TypeScript validates:

1. Whether a voter was selected.
2. Whether a candidate was selected.
3. Whether the voter has already voted.
4. Whether the maximum voting limit has been reached.
5. Whether the selected candidate exists.

Only a valid vote is counted.

### 4. Live Vote Counts

After a successful vote, the candidate's score is immediately updated.

For example:

```text
Kosi: 12
Augustine: 8

Total Votes: 20/20
```

The page does not need to be refreshed.

### 5. Duplicate Voting Prevention

Each voter can vote only once.

If a voter attempts to submit another vote, the system rejects it and displays an appropriate message.

The voter is tracked using a TypeScript `Set`:

```typescript
votedVoters: Set<string>
```

### 6. 20-Vote Limit

The system has a maximum successful vote limit of **20**.

Once the twentieth valid vote has been submitted:

* Voting controls are disabled.
* The Submit Vote button is disabled.
* Additional votes are rejected.
* A message informs users that voting has ended.

The limit is controlled by:

```typescript
const MAX_VOTES = 20;
```

## 🏆 Election Results

The existing **Checking Result** button is connected directly to the TypeScript voting logic.

When clicked, the system calculates the current scores of both candidates.

### Winner

If one candidate has more votes, the existing result modal displays that candidate as the winner and shows their vote count.

Example:

```text
ELECTION WINNER

Kosi

is the winner with 12 votes.

Kosi: 12 votes
Augustine: 8 votes
```

### Tie

If both candidates have the same number of votes, the modal displays:

```text
IT'S A TIE

Kosi: 10 votes
Augustine: 10 votes
```

The result is calculated from the actual voting state and is not hardcoded.

## ⚙️ Installation

Make sure you have **Bun** installed on your computer.

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project:

```bash
cd Voting-System
```

Install the project dependencies:

```bash
bun install
```

If TypeScript has not yet been installed:

```bash
bun add -d typescript
```

## 🔨 Compile TypeScript

The project uses the TypeScript compiler to convert:

```text
src/voting.ts
```

into browser-compatible JavaScript inside:

```text
dist/voting.js
```

Run:

```bash
bunx tsc
```

After compilation, the generated JavaScript should be available at:

```text
dist/voting.js
```

The HTML file loads the compiled file using:

```html
<script type="module" src="../dist/voting.js"></script>
```

## 👨‍💻 Development

During development, you can use TypeScript's watch mode:

```bash
bunx tsc --watch
```

This automatically recompiles the TypeScript file whenever changes are saved.

## 📋 Current Voters

The current voter list contains 18 registered voters:

* Stephanie
* Abigail
* James
* Gaberial
* Lilian
* Kosi
* Bonaventure
* Ifeanyi
* Chidinma
* Majesty
* Christopher
* Peter
* Victor
* David
* Loveth
* Charlse
* Augustine
* Anthony

The system supports a **maximum of 20 successful votes**, but the current voter list contains 18 registered voters. Therefore, the practical maximum with the current list is 18 unless additional voters are added.

## 🔐 Current Voting State

The current implementation manages voting state in the browser using TypeScript.

This means the voting data is currently **not stored in a database or backend server**.

Consequently:

* Refreshing the page resets the votes.
* Closing the browser resets the votes.
* Different users/devices do not share the same voting state.
* The system is suitable for a frontend/demo project but is **not yet suitable for a real-world election**.

For a production voting platform, the voting state should be moved to a secure backend/database with proper authentication and server-side validation.

## 🔮 Future Improvements

Possible future improvements include:

* Persistent voting using a database
* Backend API for submitting votes
* User authentication
* Server-side duplicate-vote prevention
* Admin dashboard
* Election start and end times
* Real-time voting updates across multiple devices
* Secure voter verification
* Persistent election results
* Vote audit logs
* Database-backed candidate management
* Deployment to a production hosting platform

## 🎯 Project Goal

The goal of this project is to demonstrate how a traditional HTML interface can be made interactive using TypeScript while maintaining the existing UI and design.

The project focuses on practical TypeScript concepts including:

* Interfaces
* Arrays
* Sets
* Functions
* DOM manipulation
* Event listeners
* Form validation
* State management
* Conditional logic
* Dynamic UI updates
* Type safety

## 📄 License

This project is available for educational and demonstration purposes.

You may modify and extend it for your own learning and development.
