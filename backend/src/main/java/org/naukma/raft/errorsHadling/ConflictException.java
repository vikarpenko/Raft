package org.naukma.raft.errorsHadling;

public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }
}
