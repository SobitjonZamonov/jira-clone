import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// import Image from "next/image";

interface MemberAvatarProps {
    name: string;
    className?: string;
    fallbackClassName?: string;
}

export const MemberAvatar = ({
    name,
    className,
    fallbackClassName
}: MemberAvatarProps) => {
    // if (image) {
    //     return (
    //         <div className={cn(
    //             "size-10 relative rounded-md overflow-hidden",
    //             className,
    //         )}>
    //             <Image src={image} alt={name} fill className="object-cover" />
    //         </div>
    //     );
    // }

    return (
        <Avatar className={cn(
            "size-10 relative rounded-md overflow-hidden",
            className
        )}>
            <AvatarFallback className="text-white bg-amber-600 font-semibold text-lg uppercase">
                {name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}