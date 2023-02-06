package com.vlad.documents.repositories;

import com.vlad.documents.models.Organisation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganisationRepository extends JpaRepository<Organisation,Integer> {
}
