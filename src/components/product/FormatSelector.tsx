import type { BookFormat } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FormatSelectorProps {
  formats: BookFormat[];
  selected: BookFormat;
  onSelect: (format: BookFormat) => void;
}

export function FormatSelector({ formats, selected, onSelect }: FormatSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Select Format
      </label>
      <div className="flex flex-wrap gap-3">
        {formats.map((format) => (
          <button
            key={format}
            onClick={() => onSelect(format)}
            className={cn(
              'px-5 py-2.5 rounded-full border-2 transition-all text-sm font-medium',
              selected === format
                ? 'border-primary bg-accent text-primary shadow-sm'
                : 'border-transparent bg-muted text-muted-foreground hover:bg-secondary'
            )}
          >
            {format}
          </button>
        ))}
      </div>
    </div>
  );
}
