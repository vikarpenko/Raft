package org.naukma.raft.service;

import lombok.RequiredArgsConstructor;
import org.naukma.raft.dto.request.UserRequest;
import org.naukma.raft.dto.response.UserResponse;
import org.naukma.raft.entity.User;
import org.naukma.raft.errorsHadling.EmailAreadyExsistsException;
import org.naukma.raft.errorsHadling.NotFoundException;
import org.naukma.raft.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse getUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
        return mapToResponse(user);
    }

    public UserResponse updateUser(Long id, UserRequest userRequest){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));

        if(!user.getEmail().equals(userRequest.getEmail()) &&
        userRepository.existsByEmail(userRequest.getEmail())){
            throw new EmailAreadyExsistsException("Email already in use");
        }

        String username = userRequest.getUsername().trim();
        if(!username.equals(user.getUsername()) && userRepository.existsByUsername(username)){
            throw new EmailAreadyExsistsException("Username already taken");
        }

        user.setEmail(userRequest.getEmail());
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setFirstName(userRequest.getFirstName().trim());
        user.setLastName(userRequest.getLastName().trim());
        user.setAvatar(userRequest.getAvatar());

        return mapToResponse(userRepository.save(user));
    }

    public List<UserResponse> searchUsers(String query, Long excludeUserId){
        String q = query == null ? "" : query.trim();
        if(q.isEmpty()) { return List.of(); }
        return userRepository
                .findTop8ByUsernameContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(q, q, q)
                .stream()
                .filter(user -> !user.getId().equals(excludeUserId))
                .map(this::mapToResponse)
                .toList();
    }

    public void deleteUser(Long id){
        userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
        userRepository.deleteById(id);
    }

    private UserResponse mapToResponse(User user){
        UserResponse response = new UserResponse();
        response.setId(user.getId().toString());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setAvatar(user.getAvatar());
        return response;
    }
}
