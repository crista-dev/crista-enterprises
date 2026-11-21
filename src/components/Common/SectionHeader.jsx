import cn from '../../utils/cn';
import Reveal from './Reveal';

/** Editorial section header: index number + eyebrow on a rule, heading, optional aside. */
export default function SectionHeader({ title, lede, aside, tone = 'dark', className, size = 'lg' }) {
  const light = tone === 'light';
  return (
    <Reveal className={cn('grid gap-8 lg:grid-cols-12 lg:gap-10', className)}>
      <div className={cn(aside ? 'lg:col-span-7' : 'lg:col-span-9')}>
        <h2 className={cn(size === 'lg' ? 'display-lg' : 'display-md', light && 'text-white')}>{title}</h2>
        {lede && <p className={cn('lede mt-5 max-w-2xl', light && 'text-white/60')}>{lede}</p>}
      </div>
      {aside && <div className="flex items-end lg:col-span-5 lg:justify-end">{aside}</div>}
    </Reveal>
  );
}
