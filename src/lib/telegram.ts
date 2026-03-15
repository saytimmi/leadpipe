export async function sendToTelegram(data: Record<string, string>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram credentials not configured");
    return;
  }

  const text = [
    "🔥 Новая заявка с LeadPipe",
    "",
    `👤 Имя: ${data.name}`,
    `🏢 Бизнес: ${data.business}`,
    `📢 Трафик: ${data.hasTraffic}`,
    `💰 Бюджет: ${data.budget}`,
    `📊 Заявок в день: ${data.leadsPerDay}`,
    `👥 Кто отвечает: ${data.whoAnswers}`,
    `💬 Мессенджер: ${data.messenger}`,
    `📱 Контакт: ${data.contact}`,
  ].join("\n");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}
