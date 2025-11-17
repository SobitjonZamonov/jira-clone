
import { useMedia } from "react-use"
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({
    children,
    open,
    onOpenChange
}: ResponsiveModalProps) => {
    const isDesktop = useMedia("(min-width: 1024px)", true);

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[88vh]">
                    <VisuallyHidden>
                        <DialogTitle>Responsive Modal</DialogTitle>
                    </VisuallyHidden>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <VisuallyHidden>
                    <DialogTitle>Responsive Modal</DialogTitle>
                </VisuallyHidden>
                <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    )
}