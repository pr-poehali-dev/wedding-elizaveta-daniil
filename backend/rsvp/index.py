import json
import os
import urllib.request
# v2


def handler(event: dict, context) -> dict:
    """Принимает RSVP от гостя и отправляет сообщение в Telegram"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    attend = body.get("attend", "")
    guests = body.get("guests", "1")

    if not name or attend not in ("yes", "no"):
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Заполните имя и выберите ответ"}),
        }

    status = f"✅ Придёт! Гостей: {guests}" if attend == "yes" else "❌ Не сможет прийти"

    text = (
        f"💌 <b>Новый ответ на приглашение!</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📋 <b>Статус:</b> {status}\n\n"
        f"<i>Свадьба Elizaveta &amp; Daniil · 26.06.2026</i>"
    )

    bot_token = os.environ["TELEGRAM_BOT_TOKEN"]
    chat_id = os.environ["TELEGRAM_CHAT_ID"]

    tg_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
    }).encode()

    req = urllib.request.Request(
        tg_url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        resp.read()

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }