package com.cge.crud.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cge.crud.Repositories.NotaRepository;
import com.cge.crud.models.Nota;
import com.cge.crud.models.User;

import jakarta.transaction.Transactional;

@Service
public class NotaService {
    
    @Autowired
    private NotaRepository notaRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public Nota findById(Long id) {
        Optional<Nota> nota = this.notaRepository.findById(id);
        return nota.orElseThrow(() -> new RuntimeException("Nota not found"));
    }

    public List<Nota> findByAllUserId(Long userId) {
        List<Nota> notas = this.notaRepository.findByUserId(userId);
        return notas;
    }

    @Transactional
    public Nota create(Nota nota){
        User user = this.userService.findById(nota.getUser().getId());
        nota.setId(null);
        nota.setUser(user);
        nota = this.notaRepository.save(nota);
        return nota;
    }

    @Transactional
    public Nota update(Nota nota){
        Nota newNota = this.findById(nota.getId());
        newNota.setTitulo(nota.getTitulo());
        newNota.setDescricao(nota.getDescricao());
        return this.notaRepository.save(newNota);
    }

    public void delete(Long id){
        this.findById(id);
        try{
            this.notaRepository.deleteById(id);
        }catch(Exception e){
            throw new RuntimeException("Impossivel deletar pois a entidades relacionadas!");
        }
    }
}
