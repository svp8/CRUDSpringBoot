package com.vlad.documents.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String contactInfo;
    @OneToOne
    @JoinColumn(name = "manager_id")
    private Employee manager;
    @OneToMany
    private List<Employee> employees=new ArrayList<>();
}
