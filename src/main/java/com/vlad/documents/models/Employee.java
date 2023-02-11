package com.vlad.documents.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.vlad.documents.CustomSerializer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
//@JsonSerialize(using = CustomSerializer.class)
public class Employee {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.Summary.class)

    private int id;
    @Column(nullable = false)
    private String surname;
    @Column(nullable = false)
    private String firstName;
    private String patronymic;
    private String position;

    @ManyToMany(mappedBy = "executors", fetch = FetchType.LAZY)
@JsonIgnore
    public List<Order> orders=new ArrayList<>();

    public void addOrder(Order order){
        if(!this.orders.contains(order)){
            this.orders.add(order);
//            order.addExecutor(this);
        }

    }
    public void deleteOrder(Order order){
        Order order1=this.orders.stream().filter(order2 -> order2.getId()==order.getId()).findFirst().orElse(null);
        if(order1!=null){
            this.orders.remove(order1);
//            order1.getExecutors().remove(this);
        }
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", secondName='" + surname + '\'' +
                ", firstName='" + firstName + '\'' +
                ", patronymic='" + patronymic + '\'' +
                ", position='" + position + '\'' +
                '}';
    }
}
