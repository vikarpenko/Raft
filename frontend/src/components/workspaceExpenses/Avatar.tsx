import {initials} from "@/components/workspaceExpenses/utils/initials.ts";

export function Avatar({name, size = 28}: {name: string; size?: number}) {
    return (
        <span
            className="we-avatar"
            style={{width: size, height: size, fontSize: size * 0.36}}
            title = {name}
        >
            {initials(name)}
        </span>
    );
}
