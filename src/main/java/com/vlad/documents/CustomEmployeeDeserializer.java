package com.vlad.documents;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.vlad.documents.models.Employee;
import com.vlad.documents.models.Order;
import com.vlad.documents.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class CustomEmployeeDeserializer extends StdDeserializer<Order> {
    @Autowired
    EmployeeService employeeService;

    public CustomEmployeeDeserializer() {
        this(null);
    }

    protected CustomEmployeeDeserializer(Class<?> vc) {
        super(vc);
    }


    @Override
    public Order deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);
        JsonNode ids = node.get("executors");
        ArrayList<Employee> employees = new ArrayList<>();
        if (ids != null) {
            for (JsonNode jsonNode : ids) {
                int id;
                if (jsonNode.has("id")) {
                    id = jsonNode.get("id").asInt();
                } else {
                    id = jsonNode.asInt();

                }
                employees.add(employeeService.getById(id));

            }
        }
        int id = node.has("id") ? node.get("id").asInt() : -1;
        JsonNode authorNode=node.get("author");
        int authorId;
        if(authorNode.has("id")){
            authorId=authorNode.get("id").asInt();
        }
        else {
            authorId = node.get("author").asInt();
        }

        String title = node.get("title").asText();
        boolean controlTag = node.has("controlTag") && !node.get("controlTag").asText().contentEquals("null") && node.get("controlTag").asBoolean();
        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
        String dateInString = node.has("date") ? node.get("date").asText() : null;
        Date date = null;
        try {
            date = formatter.parse(dateInString);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        String text = node.get("text").asText();
        boolean state = node.has("executionTag") && !node.get("executionTag").asText().contentEquals("null") && node.get("executionTag").asBoolean();
        Employee author = employeeService.getById(authorId);
        if (id != -1) {
            return new Order(id, title, author, employees, date, controlTag, state, text);
        } else {
            return new Order(title, author, employees, date, controlTag, state, text);
        }
    }
}
