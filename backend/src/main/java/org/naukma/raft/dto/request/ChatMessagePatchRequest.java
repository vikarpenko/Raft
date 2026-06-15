package org.naukma.raft.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChatMessagePatchRequest {

    @NotBlank
    @Size(max = 3000)
    private String content;
}