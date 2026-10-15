interface Icon2Props {
  size?: number;
  className?: string;
}

function Icon2({ size = 28, className }: Icon2Props) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeDasharray="56.5 18.85"
      strokeDashoffset="0"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="14"
        cy="14"
        r="12"
      />
    </svg>
  );
}

export default Icon2;
