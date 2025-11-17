import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface WorkspaceAvatarProps {
    image?: string;
    name: string;
    className?: string;
}

export const WorkspaceAvatar = ({
    name,
    className
}: WorkspaceAvatarProps) => {
    return (
        <Avatar className={cn(
            "size-10 relative rounded-md overflow-hidden",
            className
        )}>
            <AvatarFallback className="text-white bg-amber-600 font-semibold text-lg uppercase">
                {name[0]}
            </AvatarFallback>
        </Avatar>
    )
}