package com.cge.crud.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cge.crud.models.Nota;
import com.cge.crud.services.NotaService;
import com.cge.crud.services.UserService;

@RestController
@RequestMapping("/notas")
@Validated
public class NotaController {
    @Autowired
    private NotaService notaService;

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<List<Nota>> findById(@PathVariable Long id){
        this.userService.findById(id);
        List<Nota> notas = this.notaService.findByAllUserId(id);
        return ResponseEntity.ok().body(notas);
    }

    @PostMapping
    @Validated
    public ResponseEntity<Nota> create(@Validated @RequestBody Nota nota){
        Nota newNota = this.notaService.create(nota);
        return ResponseEntity.ok().body(newNota);
    }

    @PutMapping("/{id}")
    @Validated
    public ResponseEntity<Nota> update(@PathVariable Long id, @Validated @RequestBody Nota nota){
        nota.setId(id);
        Nota newNota = this.notaService.update(nota);
        return ResponseEntity.ok().body(newNota);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        this.notaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
