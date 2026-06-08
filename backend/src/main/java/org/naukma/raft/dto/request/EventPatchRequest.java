package org.naukma.raft.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventPatchRequest {

    @Size(max = 120, message = "Title must be at most 120 characters")
    private String title;

    @Size(max = 255, message = "Description must be at most 255 characters")
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime endTime;
}