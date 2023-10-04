import { twMerge } from "tailwind-merge";
interface TooltipProps {
  children: React.ReactNode;
  text: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  return (
    <span className="group relative z-[999]">
      <span
        className={twMerge(
          `pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-[#282828] before:content-[''] group-hover:opacity-100 text-sm bg-[#282828]`,
          props.className
        )}
      >
        {props.text}
      </span>

      {props.children}
    </span>
  );
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
