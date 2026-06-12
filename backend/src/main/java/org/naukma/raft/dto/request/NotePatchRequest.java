package org.naukma.raft.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class NotePatchRequest {
    @Size(max = 120, message = "Title must be at most 120 characters")
    private String title;

    @Size(max = 10000, message = "Content must be at most 10 000characters")
    private String content;
}
