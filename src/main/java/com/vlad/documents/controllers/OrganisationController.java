package com.vlad.documents.controllers;

import com.vlad.documents.models.Organisation;
import com.vlad.documents.services.OrganisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/organisation")
public class OrganisationController {
    @Autowired
    OrganisationService organisationService;

    @GetMapping("/all")
    public ResponseEntity<List<Organisation>> getOrganisations(){
        return new ResponseEntity<>(organisationService.getAll(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrganisation(@PathVariable int id){
        Organisation organisation=organisationService.getById(id);
        if(organisation!=null){
            return new ResponseEntity<>(organisation,HttpStatus.OK);
        }
        return new ResponseEntity<>("No such organisation",HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/create")
    public ResponseEntity<Organisation> createOrganisation(@RequestBody Organisation organisation){
        if(organisation!=null) {
            return new ResponseEntity<>(organisationService.addOrganisation(organisation),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/update")
    public ResponseEntity<Organisation> editOrganisation(@RequestBody Organisation organisation){
        if(organisationService.getById(organisation.getId())!=null){
            return new ResponseEntity<>(organisationService.editOrganisation(organisation),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @DeleteMapping("/{id}")
    public void deleteOrganisation(@PathVariable int id){
        organisationService.delete(id);
    }
}
