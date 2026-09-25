/**
 * Держит текст в кавычках-ёлочках одним куском, чтобы заголовок не рвался
 * посреди названия: «FAMILY / Академия» — так быть не должно.
 */
export default function Tight({ children }: { children: string }) {
  return (
    <>
      {children.split(/(«[^»]*»)/g).map((part, i) =>
        part.startsWith("«") ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
