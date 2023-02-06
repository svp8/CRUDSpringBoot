package com.vlad.documents.services;

import com.vlad.documents.models.Organisation;
import com.vlad.documents.repositories.OrganisationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganisationService {
    @Autowired
    OrganisationRepository organisationRepository;

    public Organisation addOrganisation(Organisation organisation) {

        Organisation savedOrganisation = organisationRepository.save(organisation);

        return savedOrganisation;
    }


    public void delete(int id) {
        Organisation organisation = organisationRepository.findById(id).orElse(null);
        if (organisation != null) {
            organisationRepository.deleteById(id);
        }
    }


    public Organisation getById(int id) {
        Optional<Organisation> temp = organisationRepository.findById(id);
        return temp.orElse(null);
    }

    public Organisation editOrganisation(Organisation organisation) {

        return organisationRepository.save(organisation);
    }

    public List<Organisation> getAll() {
        return organisationRepository.findAll();
    }
}
