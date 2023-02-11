package com.vlad.documents.controllers;


import com.vlad.documents.models.Order;
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
    @GetMapping("/author/{id}")
    public ResponseEntity<?> getOrdersByAuthorId(@PathVariable int id){
        return new ResponseEntity<>(orderService.getByAuthorId(id),HttpStatus.OK);
    }
    @GetMapping("/executor/{id}")
    public ResponseEntity<?> getOrdersByExecutorId(@PathVariable int id){
        return new ResponseEntity<>(orderService.getByExecutorId(id),HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody Order order){
        if(order!=null) {
            return new ResponseEntity<>(orderService.addOrder(order),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/update")
    public ResponseEntity<?> editOrder(@RequestBody Order order){
        if(orderService.getById(order.getId())!=null){
            return orderService.editOrder(order);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable int id){
        orderService.delete(id);
    }
}
