"use client";

import { phoneHref } from "@/lib/site";

export default function MobileBar() {
  function goToForm(e: React.MouseEvent) {
    const form = document.getElementById("zapis");
    if (form) {
      e.preventDefault();
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // если формы на странице нет — обычный переход на контакты
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--surface)] md:hidden">
      <div className="grid grid-cols-2">
        <a
          href={phoneHref}
          className="border-r border-[var(--line)] px-3 py-4 text-center text-sm font-medium"
        >
          Позвонить
        </a>
        <a
          href="/kontakty/#zapis"
          onClick={goToForm}
          className="bg-[var(--accent)] px-3 py-4 text-center text-sm font-medium text-white"
        >
          Записаться
        </a>
      </div>
    </div>
  );
}
