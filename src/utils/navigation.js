export function getActivePart(pathname) {
  if (pathname === '/' || pathname === '/course-welcome' || pathname === '/is-this-for-you') return 'intro';
  if (pathname.includes('/part-2/')) return 'part2';
  if (pathname.includes('/part-3/')) return 'part3';
  if (pathname.includes('/part-1/')) return 'part1';
  return 'part1'; // default
}
