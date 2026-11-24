# Bridges: getting Teams and meetings into the desk

Teams is for talking; the workbench is for remembering. The bridges below are listed from
least to most access. Use the best one your organisation allows, and nothing beyond it.

| Bridge | How | Needs |
|---|---|---|
| Bridge 1: GitHub app for Teams | Add the GitHub app to a channel; on a message, **... > Create issue** | Teams app allowed |
| Bridge 2: Copilot in Teams | Mention GitHub in a thread: "summarise this into an issue in <repo>" | Admin enables it, plus the cloud agent |
| Bridge 3: Work IQ (MCP) | The agent can read mail, meetings, chats and files | Tenant admin consent; licence varies |
| Bridge 4: Meeting recap | Copy the action items from the Microsoft 365 Copilot recap into `inbox.md`, run `/triage` | Copilot meeting recaps |
| Fallback: copy and paste | Paste the thread or your notes into `inbox.md`, run `/triage` | Nothing |

Rules that do not change with the bridge:

- Whatever agent reads Teams or mail has no tool that sends. That is the defence against
  instructions hidden in messages.
- Never work around a disabled bridge with personal tokens or unofficial tools.
- Every captured item keeps a link back to where it came from.
