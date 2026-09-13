import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-20">
      <h1 className="font-display text-3xl">Страница не найдена</h1>
      <p className="mt-3 max-w-[60ch] text-[var(--muted)]">
        Возможно, адрес изменился. Посмотрите разделы центра — нужное почти наверняка там.
      </p>
      <ul className="mt-6 space-y-2">
        <li><Link href="/massazh/" className="underline">Массаж</Link></li>
        <li><Link href="/basseyn/" className="underline">Бассейн</Link></li>
        <li><Link href="/prokol-ushey/" className="underline">Прокол ушей</Link></li>
        <li><Link href="/tseny/" className="underline">Цены</Link></li>
        <li><Link href="/kontakty/" className="underline">Контакты</Link></li>
      </ul>
    </div>
  );
}
