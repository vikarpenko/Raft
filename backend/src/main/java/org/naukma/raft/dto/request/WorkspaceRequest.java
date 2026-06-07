package org.naukma.raft.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.naukma.raft.enums.WorkspaceColor;

@Data
public class WorkspaceRequest {
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be at most 100 characters")
    private String name;

    private WorkspaceColor color;
}
