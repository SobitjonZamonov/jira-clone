import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MemberAvatarProps {
    name: string;
    className?: string;
}

export const MemberAvatar = ({
    name,
    className,
}: MemberAvatarProps) => {
    return (
        <Avatar className={cn(
            "size-10 relative rounded-md overflow-hidden",
            className
        )}>
            <AvatarFallback className="text-white bg-neutral-300 font-semibold text-lg uppercase">
                {name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}