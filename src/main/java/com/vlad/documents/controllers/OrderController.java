package com.vlad.documents.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.vlad.documents.models.Order;
import com.vlad.documents.models.View;
import com.vlad.documents.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/order")
public class OrderController {
    @Autowired
    private OrderService orderService;
//    @JsonView(View.Summary.class)
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getOrders(){
        return new ResponseEntity<>(orderService.getAll(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(@PathVariable int id){
        Order order=orderService.getById(id);
        if(order!=null){
            return new ResponseEntity<>(order,HttpStatus.OK);
        }
        return new ResponseEntity<>("No such order",HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody Order order){
        if(order!=null) {
            return new ResponseEntity<>(orderService.addOrder(order),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/update")
    public ResponseEntity<Order> editOrder(@RequestBody Order order){
        if(orderService.getById(order.getId())!=null){
            return new ResponseEntity<>(orderService.editOrder(order),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable int id){
        orderService.delete(id);
    }
}
