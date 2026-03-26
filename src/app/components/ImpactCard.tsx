interface ImpactCardProps {
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

export function ImpactCard({ title, description, stat, statLabel }: ImpactCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-3xl font-bold text-white">{title}</h3>
        <div className="text-right">
          <div className="text-4xl font-bold text-white">{stat}</div>
          <div className="text-sm text-white/70">{statLabel}</div>
        </div>
      </div>
      <p className="text-lg text-white/80 leading-relaxed">{description}</p>
    </div>
  );
}