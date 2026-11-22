import './loader.css';

/** Shown while a page's code is loading (route changes). */
export default function PageLoader() {
  return (
    <div className="wrap flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page">
      <div className="loader" aria-hidden="true" />
    </div>
  );
}
