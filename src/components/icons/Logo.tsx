export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 40"
      className="h-10 w-auto"
      {...props}
    >
      <text
        x="10"
        y="30"
        fontFamily="var(--font-headline), sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="hsl(var(--primary))"
        className="fill-primary"
      >
        Geek Haven
      </text>
    </svg>
  );
}
