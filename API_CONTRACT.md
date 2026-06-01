# API Contract

## GET /api/me
```jsonc
{ "id", "firstName", "lastName", "email", "avatarUrl": "| null" }
```
Розбіжності з `User`: `name` → firstName/lastName; `avatar` → avatarUrl; `password` не віддавати; id Long→string.

## GET /api/tasks
```jsonc
{
  "id", "title", "description": "| null",
  "priority": "low|medium|high",
  "dueDate": "YYYY-MM-DD",
  "dueTime": "HH:mm | null",
  "completed": true
}
```
Розбіжності з `Task`: `deadline` → dueDate+dueTime; `status` → completed (COMPLETED=true); priority LOW→low; id Long→string.
