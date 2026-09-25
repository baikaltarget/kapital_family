import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Lead = {
  name?: string;
  phone?: string;
  service?: string;
  comment?: string;
  company?: string;
  token?: string;
  page?: string;
};

/** Скоринг заявки: 🔥 горячая, 🌡 тёплая, 🧊 холодная */
function score(lead: Lead) {
  const reasons: string[] = [];
  let points = 0;

  const digits = (lead.phone || "").replace(/\D/g, "");
  if (digits.length >= 11) {
    points += 2;
    reasons.push("телефон полный");
  } else {
    reasons.push("телефон неполный");
  }
  if ((lead.name || "").trim().length >= 2) {
    points += 1;
    reasons.push("указано имя");
  }
  if ((lead.comment || "").trim().length >= 15) {
    points += 2;
    reasons.push("подробный комментарий");
  }
  if ((lead.service || "").trim()) {
    points += 1;
    reasons.push("названа услуга");
  }
  if (/(.)\1{4,}/.test(digits)) {
    points -= 2;
    reasons.push("подозрительный номер");
  }

  const mark = points >= 5 ? "🔥" : points >= 3 ? "🌡" : "🧊";
  return { mark, points, reasons };
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return false;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML" }),
  });
  return res.ok;
}

async function sendBitrix(lead: Lead, mark: string) {
  const hook = process.env.BITRIX_WEBHOOK_URL;
  if (!hook) return false;
  const res = await fetch(`${hook.replace(/\/$/, "")}/crm.lead.add.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        TITLE: `Сайт ${mark} ${lead.service || "заявка"}`,
        NAME: lead.name || "",
        COMMENTS: `${lead.comment || ""}\nСтраница: ${lead.page || ""}`,
        PHONE: [{ VALUE: lead.phone, VALUE_TYPE: "WORK" }],
        SOURCE_ID: "WEB",
      },
    }),
  });
  return res.ok;
}

async function sendAmo(lead: Lead, mark: string) {
  const base = process.env.AMO_BASE_URL;
  const token = process.env.AMO_ACCESS_TOKEN;
  if (!base || !token) return false;
  const res = await fetch(`${base.replace(/\/$/, "")}/api/v4/leads/complex`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify([
      {
        name: `Сайт ${mark} ${lead.service || "заявка"}`,
        _embedded: {
          contacts: [
            {
              name: lead.name || "Клиент с сайта",
              custom_fields_values: [
                {
                  field_code: "PHONE",
                  values: [{ value: lead.phone }],
                },
              ],
            },
          ],
        },
      },
    ]),
  });
  return res.ok;
}

async function sendEmail(text: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!key || !to || !from) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Заявка с сайта «FAMILY Академия»",
      text,
    }),
  });
  return res.ok;
}

export async function POST(req: Request) {
  let lead: Lead;
  try {
    lead = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  // honeypot: заполнено — это бот, отвечаем как обычно и молча выбрасываем
  if (lead.company) {
    return NextResponse.json({ ok: true, spam: true });
  }

  // одноразовый токен: форма должна быть открыта дольше 2 секунд
  const opened = Number(lead.token || 0);
  if (opened && Date.now() - opened < 2000) {
    return NextResponse.json({ ok: true, spam: true });
  }

  const { mark, reasons } = score(lead);

  const text = [
    `${mark} <b>Заявка с сайта «FAMILY Академия»</b>`,
    ``,
    `Имя: ${lead.name || "не указано"}`,
    `Телефон: ${lead.phone || "не указан"}`,
    `Интересует: ${lead.service || "не указано"}`,
    lead.comment ? `Комментарий: ${lead.comment}` : "",
    ``,
    `Страница: ${lead.page || "—"}`,
    `Оценка: ${reasons.join(", ")}`,
  ]
    .filter(Boolean)
    .join("\n");

  const results = await Promise.allSettled([
    sendTelegram(text),
    sendBitrix(lead, mark),
    sendAmo(lead, mark),
    sendEmail(text.replace(/<\/?b>/g, "")),
  ]);

  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);

  if (!delivered) {
    // ключи не настроены — заявка не теряется, пишем в лог сервера
    console.log("[LEAD:NOT_DELIVERED]", text);
    return NextResponse.json({ ok: false, reason: "unconfigured" });
  }

  return NextResponse.json({ ok: true, mark });
}
