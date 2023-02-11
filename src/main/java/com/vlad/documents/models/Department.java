package com.vlad.documents.models;

import jakarta.annotation.Nonnull;
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
    @Column(nullable = false)
    private String name;
    private String contactInfo;
    @OneToOne
    @JoinColumn(name = "manager_id")
    @Nonnull
    private Employee manager;
    @OneToMany
    private List<Employee> employees=new ArrayList<>();
}
