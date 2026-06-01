package org.naukma.raft.errorsHadling;

public class EmailAreadyExsistsException extends RuntimeException {
    public EmailAreadyExsistsException(String message) {
        super(message);
    }
}
