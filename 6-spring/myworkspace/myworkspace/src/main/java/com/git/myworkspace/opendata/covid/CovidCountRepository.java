package com.git.myworkspace.opendata.covid;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CovidCountRepository extends JpaRepository<CovidCount, Long>{
}