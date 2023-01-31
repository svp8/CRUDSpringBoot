package com.vlad.documents.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(path = "/users")
public class EmployeeController {
    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployees(@PathVariable int id){

    return null;
    }
}
