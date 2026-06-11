package org.naukma.raft.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.naukma.raft.dto.request.ProfileUpdateRequest;
import org.naukma.raft.dto.response.UserResponse;
import org.naukma.raft.dto.response.UserSummaryResponse;
import org.naukma.raft.security.CustomUserDetails;
import org.naukma.raft.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(userService.getUserById(user.getId()));
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserSummaryResponse>> search(@RequestParam String q,
                                                            @AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(userService.searchUsers(q, user.getId()));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateCurrentUser(@AuthenticationPrincipal CustomUserDetails user,
                                                          @Valid @RequestBody ProfileUpdateRequest request) {
        return ResponseEntity.ok(userService.updateUser(user.getId(), request));
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteCurrentUser(@AuthenticationPrincipal CustomUserDetails user) {
        userService.deleteUser(user.getId());
        return ResponseEntity.noContent().build();
    }
}
