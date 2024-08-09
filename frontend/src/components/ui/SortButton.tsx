import { Button } from "./moving-border";

const SortButton = ({ onClick, name, buttonStatus }: { onClick: () => void, name: string, buttonStatus: string }) => {
  return (
    <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800"
        onClick={onClick}
        movingBg={buttonStatus === name ? "purple" : ""}
    >
        {name}
    </Button>
  )
}

export default SortButton