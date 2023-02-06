package com.vlad.documents.models;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.vlad.documents.CustomEmployeeDeserializer;
import com.vlad.documents.CustomSerializer;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Getter
@Setter
@Entity
@Table(name = "orderTable")
@JsonDeserialize(using = CustomEmployeeDeserializer.class)
@NoArgsConstructor

public class Order {
    public Order(String title, Employee author, List<Employee> executors, Date date, boolean controlTag, boolean executionTag, String text) {
        this.title = title;
        this.author = author;
        this.executors = executors;
        this.date = date;
        this.controlTag = controlTag;
        this.executionTag = executionTag;
        this.text = text;
    }

    public Order(int id, String title, Employee author, List<Employee> executors, Date date, boolean controlTag, boolean executionTag, String text) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.executors = executors;
        this.date = date;
        this.controlTag = controlTag;
        this.executionTag = executionTag;
        this.text = text;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.Summary.class)
    private int id;
    @JsonView(View.Summary.class)
    @Column(nullable = false)
    private String title;
    @JsonView(View.Summary.class)
    @ManyToOne
    private Employee author;

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author=" + author +
                ", date=" + date +
                ", controlTag='" + controlTag + '\'' +
                ", executionTag=" + executionTag +
                ", text='" + text + '\'' +
                '}';
    }
//    @JsonView(View.Summary.class)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "Order_Executor",
            joinColumns = { @JoinColumn(name = "order_id") },
            inverseJoinColumns = { @JoinColumn(name = "executor_id") }
    )
//   @JsonSerialize(using = CustomSerializer.class)

    private List<Employee> executors=new ArrayList<>();
    @JsonView(View.Summary.class)
    private Date date;
    @JsonView(View.Summary.class)
    private boolean controlTag;
    @JsonView(View.Summary.class)
    private boolean executionTag;
    @JsonView(View.Summary.class)
@Column(length=512)
    private String text;

    public void addExecutor(Employee employee){
        if(!this.executors.contains(employee)){
            this.executors.add(employee);
            employee.getOrders().add(this);
        }

    }
    public void deleteExecutor(Employee employee){
        Employee employee1=this.executors.stream().filter(employee2 -> employee2.getId()==employee.getId()).findFirst().orElse(null);
        if(employee1!=null){
            this.executors.remove(employee1);
            employee1.getOrders().remove(this);
        }
    }
    public enum State{
        PREPARATION,
        EXECUTION,
        CONTROL,
        MODIFICATION,
        ACCEPTION
    }
}
