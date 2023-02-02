package com.vlad.documents;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.vlad.documents.models.Employee;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CustomSerializer extends StdSerializer<List<Employee>> {

    protected CustomSerializer() {
        this(null);
    }
    protected CustomSerializer(Class<List<Employee>> t) {
        super(t);
    }

    @Override
    public void serialize(List<Employee> employees, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        List<Employee> employees1=new ArrayList<>();
        for(Employee e :employees){
            e.setOrders(null);
//            e.getOrders().stream().forEach(order -> order.setExecutors(null));
            employees1.add(e);
        }
        jsonGenerator.writeObject(employees1);

    }
}
