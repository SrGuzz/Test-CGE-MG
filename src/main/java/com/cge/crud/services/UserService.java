package com.cge.crud.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cge.crud.Repositories.UserRepository;
import com.cge.crud.models.User;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public User findById(Long id) {
        Optional<User> user = this.userRepository.findById(id);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }


    public User login(String email, String password) {
        return userRepository.findByEmail(email)
            .filter(user -> user.getPassword().equals(password))
            .orElse(null);
    }

    @Transactional
    public User create(User user) {
        user.setId(null);
        return this.userRepository.save(user);
    }

    @Transactional
    public User update(User user) {
        User newUser = this.findById(user.getId());
        newUser.setPassword(user.getPassword());
        newUser.setEmail(user.getEmail());
        return this.userRepository.save(newUser);
    }

    public void delete(Long id) {
        this.findById(id);
        this.userRepository.deleteById(id);
    }
}
