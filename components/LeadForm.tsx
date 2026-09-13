"use client";

import { useState } from "react";
import { site, phoneHref } from "@/lib/site";

declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

export default function LeadForm({
  service = "",
  goal = "lead_form",
}: {
  service?: string;
  goal?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error" | "unconfigured">("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service,
    comment: "",
    company: "", // honeypot
  });
  const [agree, setAgree] = useState(false);

  const token = typeof window !== "undefined" ? `${Date.now()}` : "";

  async function submit() {
    if (!form.phone.trim()) {
      setMessage("Укажите телефон — без него мы не сможем перезвонить.");
      setStatus("error");
      return;
    }
    if (!agree) {
      setMessage("Отметьте согласие на обработку данных.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token, page: window.location.pathname }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("ok");
        setMessage("Заявка принята. Мы перезвоним и подберём время.");
        if (YM_ID && window.ym) window.ym(Number(YM_ID), "reachGoal", goal);
      } else if (data.reason === "unconfigured") {
        setStatus("unconfigured");
        setMessage("Отправка заявок пока не настроена.");
      } else {
        setStatus("error");
        setMessage("Не получилось отправить. Позвоните нам — так быстрее.");
      }
    } catch {
      setStatus("error");
      setMessage("Не получилось отправить. Позвоните нам — так быстрее.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded border border-[var(--line)] bg-[var(--surface)] p-6">
        <p className="font-display text-xl">Заявка принята</p>
        <p className="mt-2 text-[var(--muted)]">{message}</p>
      </div>
    );
  }

  const tgText = encodeURIComponent(
    `Здравствуйте! Хочу записаться${service ? `: ${service}` : ""}. Меня зовут `
  );

  return (
    <div className="rounded border border-[var(--line)] bg-[var(--surface)] p-6">
      <p className="font-display text-xl">Записаться</p>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Оставьте телефон — администратор перезвонит и подберёт удобное время.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm">Как вас зовут</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded border border-[var(--line)] bg-[var(--paper)] px-3 py-2"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm">Телефон</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded border border-[var(--line)] bg-[var(--paper)] px-3 py-2"
            placeholder="+7"
            autoComplete="tel"
            required
          />
        </label>
      </div>

      <label className="mt-3 block">
        <span className="mb-1 block text-sm">Что вас интересует</span>
        <input
          type="text"
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full rounded border border-[var(--line)] bg-[var(--paper)] px-3 py-2"
          placeholder="Например: массаж спины или занятие в бассейне"
        />
      </label>

      <label className="mt-3 block">
        <span className="mb-1 block text-sm">Комментарий</span>
        <textarea
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          rows={3}
          className="w-full rounded border border-[var(--line)] bg-[var(--paper)] px-3 py-2"
          placeholder="Для кого, что беспокоит, удобное время"
        />
      </label>

      {/* honeypot: люди это поле не видят */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Компания
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </label>
      </div>

      <label className="mt-4 flex items-start gap-2 text-xs text-[var(--muted)]">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          Согласен на обработку персональных данных в соответствии с{" "}
          <a href="/politika/" className="underline">политикой конфиденциальности</a>
        </span>
      </label>

      <button
        type="button"
        onClick={submit}
        disabled={status === "sending"}
        className="mt-4 w-full rounded bg-[var(--accent)] px-5 py-3 font-medium text-white disabled:opacity-60"
      >
        {status === "sending" ? "Отправляем" : "Отправить заявку"}
      </button>

      {message && (
        <p className={`mt-3 text-sm ${status === "error" || status === "unconfigured" ? "text-red-700" : "text-[var(--muted)]"}`}>
          {message}
        </p>
      )}

      {status === "unconfigured" && (
        <div className="mt-3 rounded border border-[var(--line)] bg-[var(--paper)] p-4 text-sm">
          <p>Позвоните или напишите — так быстрее:</p>
          <p className="mt-2">
            <a href={phoneHref} className="font-medium underline">{site.org.phone}</a>
          </p>
          {site.org.telegram && (
            <p className="mt-1">
              <a
                href={`https://t.me/${site.org.telegram}?text=${tgText}`}
                target="_blank"
                rel="noopener"
                className="font-medium underline"
              >
                Написать в Telegram
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
