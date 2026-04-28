interface Props {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ label, title, subtitle }: Props) {
  return (
    <div className="mb-12">
      <span className="text-emerald-500/60 font-mono text-sm font-medium">{label}.</span>
      <h2 className="text-3xl md:text-4xl font-bold text-white mt-1 mb-3">{title}</h2>
      {subtitle && <p className="text-gray-400 max-w-xl">{subtitle}</p>}
      <div className="flex items-center gap-3 mt-4">
        <div className="h-px w-12 bg-emerald-500" />
        <div className="h-px flex-1 bg-gray-800" />
      </div>
    </div>
  );
}
