package org.naukma.raft.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.naukma.raft.enums.MemberRole;

@Data
public class MemberRequest {
    @NotBlank(message = "Email or username is required")
    private String login;

    private MemberRole role;
}
