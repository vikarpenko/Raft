package org.naukma.raft.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.naukma.raft.enums.MemberRole;

@Data
public class MemberRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private MemberRole role;
}
