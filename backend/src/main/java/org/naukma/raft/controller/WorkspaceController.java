package org.naukma.raft.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.naukma.raft.dto.request.MemberRequest;
import org.naukma.raft.dto.request.WorkspaceRequest;
import org.naukma.raft.dto.request.WorkspaceUpdateRequest;
import org.naukma.raft.dto.response.MemberResponse;
import org.naukma.raft.dto.response.WorkspaceDetailResponse;
import org.naukma.raft.dto.response.WorkspaceResponse;
import org.naukma.raft.security.CustomUserDetails;
import org.naukma.raft.service.WorkspaceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/workspaces")
@RequiredArgsConstructor
public class WorkspaceController {
    private final WorkspaceService workspaceService;

    @GetMapping
    public ResponseEntity<List<WorkspaceResponse>> getWorkspaces(@AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(workspaceService.getWorkspaces(user.getId()));
    }

    @PostMapping
    public ResponseEntity<WorkspaceResponse> createWorkspace(@AuthenticationPrincipal CustomUserDetails user,
                                                             @Valid @RequestBody WorkspaceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(workspaceService.createWorkspace(user.getId(), request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkspaceDetailResponse> getWorkspace(@AuthenticationPrincipal CustomUserDetails user,
                                                                @PathVariable Long id) {
        return ResponseEntity.ok(workspaceService.getWorkspace(user.getId(), id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<WorkspaceResponse> updateWorkspace(@AuthenticationPrincipal CustomUserDetails user,
                                                             @PathVariable Long id,
                                                             @Valid @RequestBody WorkspaceUpdateRequest request) {
        return ResponseEntity.ok(workspaceService.updateWorkspace(user.getId(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkspace(@AuthenticationPrincipal CustomUserDetails user,
                                                @PathVariable Long id) {
        workspaceService.deleteWorkspace(user.getId(), id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/members")
    public ResponseEntity<MemberResponse> addMember(@AuthenticationPrincipal CustomUserDetails user,
                                                    @PathVariable Long id,
                                                    @Valid @RequestBody MemberRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workspaceService.addMember(user.getId(), id, request));
    }

    @DeleteMapping("/{id}/members/{memberUserId}")
    public ResponseEntity<Void> removeMember(@AuthenticationPrincipal CustomUserDetails user,
                                             @PathVariable Long id,
                                             @PathVariable Long memberUserId) {
        workspaceService.removeMember(user.getId(), id, memberUserId);
        return ResponseEntity.noContent().build();
    }
}
