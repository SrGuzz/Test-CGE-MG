package com.cge.crud.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cge.crud.models.Nota;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {
    List<Nota> findByUserId(Long userId);
}
