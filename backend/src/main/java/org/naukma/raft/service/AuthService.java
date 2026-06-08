package org.naukma.raft.service;

import lombok.RequiredArgsConstructor;
import org.naukma.raft.dto.request.LoginRequest;
import org.naukma.raft.dto.request.UserRequest;
import org.naukma.raft.dto.response.AuthResponse;
import org.naukma.raft.dto.response.UserResponse;
import org.naukma.raft.entity.User;
import org.naukma.raft.errorsHadling.EmailAreadyExsistsException;
import org.naukma.raft.errorsHadling.NotFoundException;
import org.naukma.raft.repository.UserRepository;
import org.naukma.raft.security.CustomUserDetails;
import org.naukma.raft.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final WorkspaceService workspaceService;

    public AuthResponse register(UserRequest userRequest) {
        if(userRepository.existsByEmail(userRequest.getEmail())) {
            throw new EmailAreadyExsistsException("Email already in use");
        }
        if(userRepository.existsByUsername(userRequest.getUsername().trim())) {
            throw new EmailAreadyExsistsException("Username already taken");
        }

        User user = new User();
        user.setEmail(userRequest.getEmail());
        user.setUsername(userRequest.getUsername().trim());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setFirstName(userRequest.getFirstName().trim());
        user.setLastName(userRequest.getLastName().trim());
        user.setAvatar(userRequest.getAvatar());

        User saved  = userRepository.save(user);
        workspaceService.ensurePersonalWorkspace(saved.getId());

        CustomUserDetails userDetails = new CustomUserDetails(saved);
        String token = jwtService.generateToken(userDetails);

        return new AuthResponse(token, mapToResponse(saved));
    }

    public AuthResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getLogin(), loginRequest.getPassword())
        );

        User user = userRepository.findByEmailOrUsername(loginRequest.getLogin(), loginRequest.getLogin())
                .orElseThrow(() -> new NotFoundException("User not found"));

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String token = jwtService.generateToken(userDetails);

        return new AuthResponse(token, mapToResponse(user));
    }

    private UserResponse mapToResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId().toString());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setAvatar(user.getAvatar());
        return userResponse;
    }
}
