package com.git.gagymservice.partner;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.git.gagymservice.trainer.Trainer;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Long>{

//	Optional<Trainer> findAllById(long id);

}
