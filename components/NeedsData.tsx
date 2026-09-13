import { site } from "@/lib/site";

export default function NeedsData({ children }: { children: React.ReactNode }) {
  if (!site.flags.showNeedsDataFrames) return null;
  return (
    <div className="my-4 rounded border-2 border-dashed border-red-500 bg-red-50 px-4 py-3 text-sm text-red-800">
      <span className="font-semibold">Нужны данные заказчика: </span>
      {children}
    </div>
  );
}
