# 🤖 E-DÉSIGNE - N8N WORKFLOWS AVEC OLLAMA

Ce dossier contient les workflows n8n pour gérer ton entreprise E-DÉSIGNE avec l'IA locale.

---

## PRÉREQUIS

1. **Ollama** должен быть запущен (ollama serve)
2. **n8n** должен быть запущен локально (npm install n8n, n8n start)
3. **E-DÉSIGNE API** должен быть запущен (node server/index.js)

---

## ИМПОРТ В N8N

1. Открой n8n: http://localhost:5678
2. Создай новый воркфлоу
3. Добавь узлы вручную или импортируй JSON

---

## 🎯 ДОСТУПНЫЕ ВОРКФЛОУ

### 1. CHATBOT CLIENT (Коммерция ИИ)
**Trigger:** Webhook
**Func:** Отвечает на вопросы клиентов о товарах, доставке, оплате

### 2. RÉSUMÉ COMMANDES (Управление заказами)
**Trigger:** HTTP запрос /api/orders
**Func:** Анализирует заказы, отправляет подтверждения

### 3. RECOMMANDATIONS PRODUITS (Рекомендации)
**Trigger:** HTTP запрос /api/ai/recommendations
**Func:** Предлагает товары клиентам на основе истории

### 4. SUPPORT CLIENT (Поддержка)
**Trigger:** Оплаченный триггер
**Func:** Авто-ответ на тикеты поддержки

### 5. ANALYTICS HEBDO (Дашборд)
**Trigger:** Расписание (еженедельно)
**Func:** Генерирует отчеты о продажах

---

## CONFIGURATION OLLAMA

URL: http://localhost:11434
Modèles disponibles:
- llama2 (通用ный)
- mistral (быстрый)
- codellama (код)

Команда для проверки:
```bash
curl http://localhost:11434/api/tags
```

---

## EXEMPLE D'UTILISATION

```javascript
// Пример вызова из E-DÉSIGNE
const response = await fetch('http://localhost:5678/webhook/e-designe-chatbot', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "Bonjour, j'ai une question sur..."
  })
});
```

---

## ДЕПЛОЙМЕНТ

После настройки, E-DÉSIGNE будет использовать n8n вместо встроенного чатбота!

**Note:** Ce fichier est une documentation. Les vrais workflows sont dans les fichiers .json séparés.