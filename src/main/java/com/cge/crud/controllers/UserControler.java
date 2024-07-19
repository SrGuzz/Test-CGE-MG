package com.cge.crud.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cge.crud.models.Request;
import com.cge.crud.models.User;
import com.cge.crud.services.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/user")
@Validated
public class UserControler {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id){
        User user = userService.findById(id);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Request request){
        User autenticado = userService.login(request.getUsername(), request.getPassword());
        if(autenticado != null){
            return ResponseEntity.ok().body(autenticado);
        }else{
            return ResponseEntity.status(401).body("Usuário ou senha inválidos");
        }
    }

    @PostMapping
    public ResponseEntity<User> create(@Validated @RequestBody User user){
        User newUser = userService.create(user);
        return ResponseEntity.ok().body(newUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @Validated @RequestBody User user){
        user.setId(id);
        User newUser = userService.update(user);
        return ResponseEntity.ok().body(newUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    
}
