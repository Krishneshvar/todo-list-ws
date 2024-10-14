package com.todows.tasksserver;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("/tasks")
public class TasksResource {

    private static List<Task> taskList = new ArrayList<>();

    // GET method to retrieve all tasks
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTasks() {
        return Response.ok(taskList).build();
    }

    // POST method to create a new task
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createTask(Task newTask) {
        newTask.setId(System.currentTimeMillis()); // Generating a unique ID
        taskList.add(newTask);
        return Response.ok(newTask).build();
    }

    // DELETE method to delete a task by ID
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response deleteTask(@PathParam("id") long id) {
        boolean removed = taskList.removeIf(task -> task.getId() == id);
        if (removed) {
            return Response.ok("Task deleted").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Task not found").build();
        }
    }
}
