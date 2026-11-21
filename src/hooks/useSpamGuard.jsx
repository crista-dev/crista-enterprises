import { useRef } from 'react';

/**
 * Invisible bot traps for forms: a honeypot field humans never see or fill,
 * plus the time since the form appeared. Checked again on the server.
 */
export default function useSpamGuard() {
  const start = useRef(Date.now());
  const hp = useRef(null);

  const field = (
    <div aria-hidden="true" className="absolute -left-[10000px] top-0 h-px w-px overflow-hidden">
      <label>
        Website
        <input ref={hp} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );

  return { field, guard: () => ({ start: start.current, hp: hp.current?.value ?? '' }) };
}
