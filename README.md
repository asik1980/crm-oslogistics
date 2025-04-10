# CRM OS Logistics

## Uruchomienie

### 1. Buduj i uruchom środowisko
```bash
docker-compose up -d --build
```

### 2. Sprawdź logi backendu
```bash
docker logs -f crm-backend
```

### 3. Wejdź w przeglądarce:
```
http://localhost
```

## Uwagi

- Domyślne dane bazy: użytkownik `root`, hasło `root`
- ORM: Prisma (plik `backend/prisma/schema.prisma`)
- API startowe pod adresem `/clients` (do rozbudowy)
