/** Editorial enhancement only: the document's resting state is always visible. */
const groups = [...document.querySelectorAll<HTMLElement>('[data-reveal-group]')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const seen = new WeakSet<Element>();
let entrances: IntersectionObserver | undefined;

function settle(group: HTMLElement) {
  seen.add(group);
  entrances?.unobserve(group);
  group.classList.remove('is-entering');
}

function settleAll() {
  entrances?.disconnect();
  groups.forEach(settle);
}

function initEntrances() {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (reducedMotion.matches || location.hash || navigation?.type === 'back_forward' || !('IntersectionObserver' in window)) return;
  try {
    entrances = new IntersectionObserver(entries => {
      // A late callback must never replay content the reader has already passed.
      const passed = entries.filter(entry => entry.boundingClientRect.top < 0);
      for (const entry of passed) {
        const index = groups.indexOf(entry.target as HTMLElement);
        groups.slice(0, index + 1).forEach(settle);
      }
      for (const entry of entries) {
        const group = entry.target as HTMLElement;
        if (!entry.isIntersecting || seen.has(group)) continue;
        seen.add(group);
        entrances?.unobserve(group);
        if (entry.boundingClientRect.top < 0 || group.contains(document.activeElement)) continue;
        // Only this finite animation has a hidden first frame. No pending/hidden CSS state.
        group.classList.add('is-entering');
      }
    }, { rootMargin: '0px 0px 24px 0px', threshold: 0 });
    // Read before writing. Visible content is never hidden during late initialization.
    const positions = groups.map(group => group.getBoundingClientRect().top);
    groups.forEach((group, i) => {
      if (positions[i] < innerHeight + 24) seen.add(group);
      else entrances!.observe(group);
    });
  } catch {
    settleAll();
  }
}

document.addEventListener('focusin', event => {
  if (!(event.target instanceof Element)) return;
  const group = event.target.closest<HTMLElement>('[data-reveal-group]');
  if (group) settle(group);
});
window.addEventListener('hashchange', settleAll);
// Settle before the browser performs native anchor navigation, including repeated hashes.
document.addEventListener('click', event => {
  if (!(event.target instanceof Element)) return;
  const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
  if (!anchor) return;
  const url = new URL(anchor.href);
  if (url.origin === location.origin && url.pathname === location.pathname && url.hash) settleAll();
});
window.addEventListener('pagehide', settleAll);
window.addEventListener('pageshow', event => {
  if (event.persisted || location.hash || scrollY > 0) settleAll();
});
window.addEventListener('beforeprint', settleAll);
reducedMotion.addEventListener('change', event => { if (event.matches) settleAll(); });
initEntrances();

/** A first deliberate gesture completes the Home opening; ordinary scrolling resumes. */
const opening = document.querySelector<HTMLElement>('.prologue');
const entry = document.getElementById('site-header');
if (opening && entry) {
  let departure: IntersectionObserver | undefined;
  const dismissPassedOpening = () => {
    if (opening.hidden || opening.getBoundingClientRect().bottom > 1) return;
    const nextScrollY = Math.max(0, scrollY - opening.offsetHeight);
    // Cancel any remaining smooth scroll before removing its original destination offset.
    window.scrollTo({ top: scrollY, behavior: 'instant' });
    if (opening.contains(document.activeElement)) entry.focus({ preventScroll: true });
    opening.hidden = true;
    window.scrollTo({ top: nextScrollY, behavior: 'instant' });
    // A deep link may still be travelling beyond the opening when it crosses this boundary.
    try {
      const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target && !opening.contains(target)) target.scrollIntoView({ block: 'start', behavior: 'instant' });
    } catch { /* A malformed fragment must not prevent a readable page. */ }
    departure?.disconnect();
    window.removeEventListener('scrollend', dismissPassedOpening);
    window.removeEventListener('pageshow', dismissPassedOpening);
  };
  // Remove the spent opening only once it is offscreen, preserving the reader's position.
  // This is the second observer on Home; Research has its own second observer instead.
  if ('IntersectionObserver' in window) {
    try {
      departure = new IntersectionObserver(dismissPassedOpening, { rootMargin: '-1px 0px 0px', threshold: 0 });
      departure.observe(opening);
    } catch { /* Native scrollend still handles observer failures. */ }
  }
  window.addEventListener('scrollend', dismissPassedOpening);
  window.addEventListener('pageshow', dismissPassedOpening);
}
if (opening && entry && !location.hash && scrollY === 0) {
  const controller = new AbortController();
  const { signal } = controller;
  const finish = () => controller.abort();
  const canEnter = () => opening.getBoundingClientRect().bottom > 0
    // Enlarged text must be readable before advancing past an oversized opening.
    && opening.offsetHeight <= innerHeight + 1;
  const enter = (focusEntry = false) => {
    finish();
    settleAll();
    if (focusEntry) entry.focus({ preventScroll: true });
    entry.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  };
  opening.addEventListener('wheel', event => {
    if (event.ctrlKey || event.deltaY <= 0 || Math.abs(event.deltaX) > event.deltaY || !canEnter()) return;
    event.preventDefault();
    enter();
  }, { passive: false, signal });
  let touchY: number | undefined;
  opening.addEventListener('touchstart', event => {
    touchY = event.touches.length === 1 ? event.touches[0].clientY : undefined;
  }, { passive: true, signal });
  opening.addEventListener('touchmove', event => {
    if (touchY === undefined || event.touches.length !== 1 || !canEnter()) return;
    const distance = touchY - event.touches[0].clientY;
    if (distance <= 0 || !event.cancelable) return;
    // Decide before native touch inertia starts, so it cannot cancel the entry scroll.
    event.preventDefault();
    if (distance > 30) enter();
  }, { passive: false, signal });
  opening.addEventListener('touchend', () => { touchY = undefined; }, { passive: true, signal });
  opening.addEventListener('touchcancel', () => { touchY = undefined; }, { passive: true, signal });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !canEnter()) return;
    if (document.activeElement !== document.body && !opening.contains(document.activeElement)) return;
    if (!['ArrowDown', 'PageDown', ' '].includes(event.key)) return;
    event.preventDefault();
    enter(true);
  }, { signal });
  // The visible link keeps native anchor/history/focus behavior, even without JS.
  opening.querySelector('.prologue-next')?.addEventListener('click', finish, { signal });
  window.addEventListener('hashchange', finish, { signal });
  window.addEventListener('pagehide', finish, { signal });
  window.addEventListener('pageshow', event => { if (event.persisted || scrollY > 0) finish(); }, { signal });
}

/** Reuse the native research index; its containing block ends before publications. */
const fieldbook = document.querySelector<HTMLElement>('[data-fieldbook]');
const index = fieldbook?.querySelector<HTMLElement>('.theme-index');
if (fieldbook && index && 'IntersectionObserver' in window) {
  const sections = [...fieldbook.querySelectorAll<HTMLElement>('.research-theme')];
  const links = [...index.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const desktop = matchMedia('(min-width: 1024px) and (min-height: 640px)');
  let orientation: IntersectionObserver | undefined;
  const setCurrent = (id?: string) => links.forEach(link => {
    if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  function configureIndex() {
    orientation?.disconnect();
    fieldbook!.classList.remove('fieldbook-ready');
    setCurrent();
    if (!desktop.matches) return;
    const height = index!.getBoundingClientRect().height;
    // Large text and wrapping take priority over a persistent index.
    if (height > innerHeight / 5) return;
    try {
      const line = Math.ceil(height + 24);
      orientation = new IntersectionObserver(() => {
        // Three reads, only on boundary crossings. No continuous scroll work.
        const current = sections.find(section => {
          const rect = section.getBoundingClientRect();
          // Native anchor positions can retain a fractional pixel after scroll rounding.
          return rect.top <= line + 1 && rect.bottom > line + 1;
        });
        setCurrent(current?.id);
      }, { rootMargin: `-${line}px 0px -${Math.max(0, innerHeight - line - 1)}px 0px`, threshold: 0 });
      sections.forEach(section => orientation!.observe(section));
      fieldbook!.style.setProperty('--fieldbook-offset', `${line}px`);
      fieldbook!.classList.add('fieldbook-ready');
    } catch {
      orientation?.disconnect();
      fieldbook!.classList.remove('fieldbook-ready');
      setCurrent();
    }
  }
  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(configureIndex, 120);
  });
  desktop.addEventListener('change', configureIndex);
  // Text-only zoom can resize the index without resizing the viewport.
  if ('ResizeObserver' in window) new ResizeObserver(configureIndex).observe(index);
  window.addEventListener('pageshow', event => {
    configureIndex();
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (event.persisted || navigation?.type === 'back_forward' || !location.hash) return;
    // WebKit may position a reload's fragment before sticky enhancement is ready.
    // Correct only an obscured/offscreen initial target; never change history restoration.
    requestAnimationFrame(() => {
      if (!fieldbook!.classList.contains('fieldbook-ready')) return;
      let target: HTMLElement | null;
      try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); }
      catch { return; }
      if (!target || !fieldbook!.contains(target)) return;
      const top = target.getBoundingClientRect().top;
      if (top < index!.getBoundingClientRect().height || top >= innerHeight) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    });
  });
  document.fonts.ready.then(configureIndex);
  configureIndex();
}
