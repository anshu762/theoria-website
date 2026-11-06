import { useEffect, useState } from 'react';

// Branded placeholder (Theoria book icon colours) shown if an image fails to load
const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>" +
      "<rect width='120' height='120' rx='16' fill='#EEF3FF'/>" +
      "<circle cx='60' cy='34' r='11' fill='#9FBDFF'/>" +
      "<path d='M22 50h34v44C46 80 32 76 22 78z' fill='#9FBDFF'/>" +
      "<path d='M98 50H64v44c10-14 24-18 34-16z' fill='#B88BF7'/>" +
      '</svg>'
  );

// referrerPolicy="no-referrer" avoids CDN hotlink/referrer blocking
export default function CdnImage({ src, alt = '', className = '', ...rest }) {
  const [bad, setBad] = useState(false);
  useEffect(() => setBad(false), [src]);
  return (
    <img
      src={bad ? FALLBACK : src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setBad(true)}
      className={className}
      {...rest}
    />
  );
}