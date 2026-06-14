package org.naukma.raft.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProfileUpdateRequest {
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters")
    @Pattern(regexp = "^[A-Za-z0-9._-]+$",
             message = "Username may contain only letters, digits, dot, underscore and hyphen")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 100, message = "Email must be at most 100 characters")
    private String email;

    @NotBlank(message = "Firstname is required")
    @Size(max = 50, message = "First name must be at most 50 characters")
    private String firstName;

    @NotBlank(message = "Lastname is required")
    @Size(max = 50, message = "Last name must be at most 50 characters")
    private String lastName;

    @Pattern(regexp = "^(https?://.+|/[A-Za-z0-9._\\-/]+)?$", message = "Avatar must be a valid path or URL")
    private String avatar;
}
