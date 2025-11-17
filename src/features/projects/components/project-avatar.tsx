import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// import Image from "next/image";

interface ProjectAvatarProps {
    image?: string;
    name: string;
    className?: string;
}



export const ProjectAvatar = ({
    image,
    name,
    className
}: ProjectAvatarProps) => {
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
            "size-5 relative overflow-hidden",
            className
        )}>
            <AvatarFallback className="text-white bg-green-600 font-semibold text-sm uppercase">
                {name[0]}
            </AvatarFallback>
        </Avatar>
    )
}