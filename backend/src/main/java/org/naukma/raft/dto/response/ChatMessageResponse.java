package org.naukma.raft.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatMessageResponse {

    private String id;

    private String workspaceId;
    private String workspaceName;

    private UserSummaryResponse sender;

    private String content;
    private boolean edited;
    private boolean ownMessage;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}