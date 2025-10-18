export function PageHeader({ title }: { title: string }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-card px-4 shadow-sm lg:h-[60px] lg:px-6">
      <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
    </header>
  );
}
