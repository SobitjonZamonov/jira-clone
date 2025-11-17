"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { Dice1, Loader } from "lucide-react"
import { CreateTaskForm } from "./create-task-form"

interface CreateTaskFormWrapperProps {
    onCancel?: () => void
}

export const CreateTaskFormWrapper = ({ onCancel }: CreateTaskFormWrapperProps) => {
    const workspaceId = useWorkspaceId();

    const { data: projects, isLoading: IsLoadingProjects } = useGetProjects({ workspaceId });
    const { data: members, isLoading: IsLoadingMembers } = useGetMembers({ workspaceId });

    const projectOptions = projects?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl
    }))

    const memberOptions = members?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
    }))

    const isLoading = IsLoadingProjects || IsLoadingMembers;

    if (isLoading) {
        return (
            <Card className="w-full h-[714px] boder-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animated-spin text-muted-foreground" />
                </CardContent>
            </Card>
        )
    }

    return (
        <CreateTaskForm
            onCancel={onCancel}
            projectOptions={projectOptions ?? []}
            memberOptions={memberOptions ?? []}
        />
    )
}