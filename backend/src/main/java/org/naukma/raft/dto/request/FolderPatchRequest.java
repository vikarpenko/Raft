package org.naukma.raft.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class FolderPatchRequest {
    @Size(max = 120, message = "Name must be at most 120 characters")
    private String name;
}
