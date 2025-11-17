import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "./ui/select";
import { FolderIcon, ListChecksIcon, UserIcon } from "lucide-react";
import { TaskStatus } from "@/features/tasks/types";
import { useTaskFilters } from "@/features/tasks/hooks/use-task-filters";

interface DataFilterProps {
    hideProjectFilter?: boolean;
}

export const DateFilters = ({ hideProjectFilter }: DataFilterProps) => {
    const workspaceId = useWorkspaceId();
    const { data: projects, isLoading: IsLoadingProjects } = useGetProjects({ workspaceId });
    const { data: members, isLoading: IsLoadingMembers } = useGetMembers({ workspaceId });

    const isLoading = IsLoadingMembers || IsLoadingProjects;

    const projectOptions = projects?.documents.map((project) => ({
        value: project.$id,
        label: project.name,
    }))

    const memberOptions = members?.documents.map((member) => ({
        value: member.$id,
        label: member.name,
    }))

    const [{
        status,
        assigneeId,
        projectId,
    }, setFilters] = useTaskFilters();

    const onStatusChange = (value: string) => {
        if (value === "all") {
            setFilters({ status: null })
        } else {
            setFilters({ status: value as TaskStatus })
        }
    }

    const onAssigneeChange = (value: string) => {
        if (value === "all") {
            setFilters({ status: null })
        } else {
            setFilters({ assigneeId: value as string })
        }
    }

    const onProjectChange = (value: string) => {
        if (value === "all") {
            setFilters({ status: null })
        } else {
            setFilters({ projectId: value as string })
        }
    }

    if (isLoading) return null

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Select
                defaultValue={status ?? undefined}
                onValueChange={(value) => onStatusChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <ListChecksIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All statuses" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectSeparator />
                    <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
                    <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                    <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
                    <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                </SelectContent>
            </Select>

            <Select
                defaultValue={assigneeId ?? undefined}
                onValueChange={(value) => onAssigneeChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <UserIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All assignees" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All assignees</SelectItem>
                    <SelectSeparator />
                    {memberOptions?.map((member) => (
                        <SelectItem key={member.value} value={member.value}>
                            {member.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {!hideProjectFilter && (
                <Select
                    defaultValue={projectId ?? undefined}
                    onValueChange={(value) => onProjectChange(value)}
                >
                    <SelectTrigger className="w-full lg:w-auto h-8">
                        <div className="flex items-center pr-2">
                            <FolderIcon className="size-4 mr-2" />
                            <SelectValue placeholder="All projects" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All projects</SelectItem>
                        <SelectSeparator />
                        {projectOptions?.map((project) => (
                            <SelectItem key={project.value} value={project.value}>
                                {project.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        </div>
    )
}