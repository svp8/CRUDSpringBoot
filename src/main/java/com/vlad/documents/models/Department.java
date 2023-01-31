package com.vlad.documents.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
}
