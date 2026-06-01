# API Contract

## GET /api/me
```jsonc
{ "id", "firstName", "lastName", "email", "avatar": "| null" }
```
Розбіжності з `User`: `name` → firstName/lastName; `password` не віддавати; id Long→string.

## GET /api/tasks
```jsonc
{
  "id", "title", "description": "| null",
  "priority": "LOW|MEDIUM|HIGH",
  "dueDate": "YYYY-MM-DD",
  "dueTime": "HH:mm | null",
  "status": "TODO | IN_PROGRESS | COMPLETED"
}
```
Розбіжності з `Task`: `deadline` → dueDate+dueTime; id Long→string.
