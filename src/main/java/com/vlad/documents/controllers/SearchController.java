package com.vlad.documents.controllers;

import com.vlad.documents.models.Employee;
import com.vlad.documents.models.Order;
import jakarta.persistence.EntityManager;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Field;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
public class SearchController {
    @Autowired
    private EntityManager entityManager;

    @PostMapping("/search")
    public List<?> searchByAttribute(@RequestBody Search s) {
        String clsName = "com.vlad.documents.models." + s.className;  // use fully qualified name
        Class cls = null;
        try {
            cls = Class.forName(clsName);
            if(Objects.equals(s.attribute, "manager")){
//                List<?> emp = entityManager.createQuery("FROM "+ s.className +" d Join Employee e on e.id=d.manager" +
//                        , cls).getResultList();
                List<?> emp = entityManager.createQuery("select d FROM "+ s.className +" d Join d.manager e"+
                        " WHERE lower(Concat(e.surname,' ',e.firstName)) LIKE " + "'%" + s.query.toLowerCase().trim() + "%'", cls).getResultList();
                return emp;
            }
//            else if(Objects.equals(s.attribute, "controlTag")||Objects.equals(s.attribute, "executionTag")){
//                if("true".contains(s.query)){
//                    List<?> emp = entityManager.createQuery("select d FROM "+ s.className +" d Join d.manager e"+
//                            " WHERE lower(Concat(e.surname,' ',e.firstName)) LIKE " + "'%" + s.query.toLowerCase().trim() + "%'", cls).getResultList();
//                }
////                List<?> emp = entityManager.createQuery("FROM "+ s.className +" d Join Employee e on e.id=d.manager" +
////                        , cls).getResultList();
//                List<?> emp = entityManager.createQuery("select d FROM "+ s.className +" d Join d.manager e"+
//                        " WHERE lower(Concat(e.surname,' ',e.firstName)) LIKE " + "'%" + s.query.toLowerCase().trim() + "%'", cls).getResultList();
//                return emp;
//            }
            List<?> emp = entityManager.createQuery("FROM " + s.className + " WHERE lower(" + s.attribute + ") LIKE " + "'%" + s.query.toLowerCase().trim() + "%'", cls).getResultList();
            return emp;
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

    }

    @PostMapping("/search/order")
    public List<Order> searchOrder(@RequestBody Search search) {
        List<Order> orders=search.orders.stream().filter(o->{
            Class<?> c = o.getClass();

            Field f = null;
            try {
                f = c.getDeclaredField(search.attribute);
                f.setAccessible(true);
                if(f.getType().equals(boolean.class)){

                    Boolean value= (Boolean) f.get(o);
                    if(value&&"true".contains(search.query)){
                        return true;
                    }
                    else if(!value&&"false".contains(search.query)){
                        return true;
                    }
                    return false;
                }
                if(f.getType()== Date.class){
                   Date value= (Date) f.get(o);
                    SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                    Date date = null;
                    try {
                        date = formatter.parse(search.query);
                    } catch (ParseException e) {
                        throw new RuntimeException(e);
                    }
                    return value.equals(date);
                }
                String value = (String) f.get(o);
                return value.toUpperCase().contains(search.query.toUpperCase());
            } catch (NoSuchFieldException | IllegalAccessException e) {
                throw new RuntimeException(e);
            }



        }).toList();
        return orders;
    }

    @Data
    public static class Search {
        public String attribute;
        public String query;
        public String className;
        public List<Order> orders;

        Search() {

        }
    }
}
