package org.naukma.raft.dto.response;

import lombok.Builder;
import lombok.Data;
import org.naukma.raft.enums.MemberRole;
import org.naukma.raft.enums.WorkspaceColor;
import org.naukma.raft.enums.WorkspaceType;

import java.util.List;

@Data
@Builder
public class WorkspaceDetailResponse {
    private String id;
    private String name;
    private WorkspaceType type;
    private WorkspaceColor color;
    private MemberRole role;
    private List<MemberResponse> members;
}
