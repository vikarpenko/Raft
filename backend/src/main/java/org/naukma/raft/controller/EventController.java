package org.naukma.raft.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.naukma.raft.dto.request.EventPatchRequest;
import org.naukma.raft.dto.request.EventRequest;
import org.naukma.raft.dto.response.EventResponse;
import org.naukma.raft.security.CustomUserDetails;
import org.naukma.raft.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<List<EventResponse>> getEvents(@AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(eventService.getEvents(user.getId()));
    }

    @PostMapping
    public ResponseEntity<EventResponse> createEvent(
            @AuthenticationPrincipal CustomUserDetails user,
            @Valid @RequestBody EventRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(eventService.createEvent(user.getId(), request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EventResponse> updateEvent(
            @AuthenticationPrincipal CustomUserDetails user,
            @PathVariable Long id,
            @Valid @RequestBody EventPatchRequest request
    ) {
        return ResponseEntity.ok(eventService.updateEvent(user.getId(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(
            @AuthenticationPrincipal CustomUserDetails user,
            @PathVariable Long id
    ) {
        eventService.deleteEvent(user.getId(), id);
        return ResponseEntity.noContent().build();
    }
}