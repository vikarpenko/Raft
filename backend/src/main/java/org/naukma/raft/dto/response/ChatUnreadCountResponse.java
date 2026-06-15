package org.naukma.raft.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatUnreadCountResponse {

    private String workspaceId;

    private String workspaceName;

    private long unreadCount;
}