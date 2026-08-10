type Props = {
  code: string;
  className?: string;
};

/** Stylized NL license plate — workshop DNA without cartoon icons. */
export function Kenteken({ code, className = "" }: Props) {
  return (
    <span className={`kenteken ${className}`.trim()} aria-label={code}>
      <span className="kenteken__eu" aria-hidden>
        <span className="kenteken__stars">★★</span>
        <span>NL</span>
      </span>
      <span className="kenteken__code">{code}</span>
    </span>
  );
}
