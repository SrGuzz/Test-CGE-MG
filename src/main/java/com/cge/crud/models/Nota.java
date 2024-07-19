package com.cge.crud.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "nota")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = "id")
    private Long id;

    @Column(nullable = false, name = "titulo")
    @NotBlank(message = "O titulo nao pode ser nulo!")
    @Size(min = 3, max = 50, message = "O titulo deve ter entre 3 e 50 caracteres!")
    private String titulo;

    @Column(nullable = false, name = "descricao")
    @NotBlank(message = "A descricao nao pode ser nula!")
    @Size(min = 3, max = 3000, message = "A descricao deve ter entre 3 e 3000 caracteres!")
    private String descricao;

    @Column(nullable = false, name = "data_criacao")
    @NotBlank(message = "A data de criacao nao pode ser nula!")
    @Size(min = 10, max = 10, message = "A data de criacao deve ter 10 caracteres!")
    private String dataCriacao;

    @ManyToOne
    @JsonIgnoreProperties("notas")
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    public Nota() {
    }

    public Nota(Long id, String titulo, String descricao, String dataCriacao) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataCriacao = dataCriacao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(String dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public int hashCode(){
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        return result;
    }
}
