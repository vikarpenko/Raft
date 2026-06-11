package org.naukma.raft.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.naukma.raft.enums.FolderType;

@Data
public class FolderRequest {
    @NotBlank(message = "Title is required")
    @Size(max = 120, message = "Name must be at most 120 characters")
    private String name;

    @NotNull(message = "Folder type is required")
    private FolderType type;

    private Long workspaceId;
}
