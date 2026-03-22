import { Check, ChevronDown, Copy } from "lucide-react"
import { useCopyToClipboard } from "../../hooks/useCopyClipboard"
import { Button } from "@workspace/ui/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui/components/ui/dropdown"
import {
    Popover,
    PopoverAnchor,
    PopoverContent,
    PopoverTrigger,
} from "@workspace/ui/components/ui/popover"
import { Separator } from "@workspace/ui/components/ui/separator"


const menuItems = {
    markdown: (url: string) => (
        <a href={`${url}.md`} target="_blank" rel="noopener noreferrer">
            <svg strokeLinejoin="round" viewBox="0 0 22 16">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.5 2.25H2.5C1.80964 2.25 1.25 2.80964 1.25 3.5V12.5C1.25 13.1904 1.80964 13.75 2.5 13.75H19.5C20.1904 13.75 20.75 13.1904 20.75 12.5V3.5C20.75 2.80964 20.1904 2.25 19.5 2.25ZM2.5 1C1.11929 1 0 2.11929 0 3.5V12.5C0 13.8807 1.11929 15 2.5 15H19.5C20.8807 15 22 13.8807 22 12.5V3.5C22 2.11929 20.8807 1 19.5 1H2.5ZM3 4.5H4H4.25H4.6899L4.98715 4.82428L7 7.02011L9.01285 4.82428L9.3101 4.5H9.75H10H11V5.5V11.5H9V7.79807L7.73715 9.17572L7 9.97989L6.26285 9.17572L5 7.79807V11.5H3V5.5V4.5ZM15 8V4.5H17V8H19.5L17 10.5L16 11.5L15 10.5L12.5 8H15Z"
                    fill="currentColor"
                />
            </svg>
            View as Markdown
        </a>
    ),
}

export function DocsCopyPage({ page, url }: { page: string; url: string }) {
    const { copyToClipboard, isCopied } = useCopyToClipboard()

    const trigger = (
        <Button
            variant="primary"
            size="sm"
            className="peer -ml-0.5 size-8 shadow-none md:size-7 md:text-[0.8rem]"
        >
            <ChevronDown className="rotate-180 sm:rotate-0" />
        </Button>
    )

    return (
        <Popover>
            <div className="bg-secondary group/buttons relative flex rounded-lg *:[[data-slot=button]]:focus-visible:relative *:[[data-slot=button]]:focus-visible:z-10">
                <PopoverAnchor />
                <Button
                    variant="primary"
                    size="sm"
                    className="h-8 shadow-none md:h-7 md:text-[0.8rem]"
                    onClick={() => copyToClipboard(page)}
                >
                    {isCopied ? <Check /> : <Copy />}
                    Copy Page
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="hidden sm:flex">
                        {trigger}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="shadow-none">
                        {Object.entries(menuItems).map(([key, value]) => (
                            <DropdownMenuItem key={key} asChild>
                                {value(url)}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator
                    orientation="vertical"
                    className="!bg-foreground/10 absolute top-0 right-8 z-0 !h-8 peer-focus-visible:opacity-0 sm:right-7 sm:!h-7"
                />
                <PopoverTrigger asChild className="flex sm:hidden">
                    {trigger}
                </PopoverTrigger>
                <PopoverContent
                    className="bg-background/70 dark:bg-background/60 w-52 !origin-center rounded-lg p-1 shadow-sm backdrop-blur-sm"
                    align="start"
                >
                    {Object.entries(menuItems).map(([key, value]) => (
                        <Button
                            size="lg"
                            asChild
                            key={key}
                            className="*:[svg]:text-muted-foreground w-full justify-start text-base font-normal"
                        >
                            {value(url)}
                        </Button>
                    ))}
                </PopoverContent>
            </div>
        </Popover>
    )
}
