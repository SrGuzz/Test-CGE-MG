package com.cge.crud.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "name")
    @NotBlank(message = "O nome nao pose ser nulo!")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres!")
    private String name;

    @Column(nullable = false, name = "email", unique = true)
    @NotBlank(message = "O email nao pode ser nulo!")
    @Size(min = 3, max = 100, message = "O email deve ter entre 3 e 100 caracteres!")
    private String email;

    @Column(nullable = false, name = "password")
    @NotBlank(message = "A senha nao pode ser nula!")
    @Size(min = 8, max = 30, message = "A senha deve ter entre 8 e 30 caracteres!")
    private String password;

    @OneToMany(mappedBy = "user")
    private List<Nota> notas = new ArrayList<Nota>();

    public User() {
    }

    public User(Long id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public List<Nota> getNotas() {
        return this.notas;
    }

    public void setNotas(List<Nota> notas) {
        this.notas = notas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public int hashCode(){
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        return result;
    }
}
