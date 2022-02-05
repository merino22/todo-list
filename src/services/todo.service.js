import http from "../http-common";

class TodoDataService {
    getAll() {
        return http.get("/todos");
    }

    create(data) {
        return http.post("/todos", data);
    }

    update(id, data) {
        return http.put(`/todos/${id}`, data);
    }

    delete(id) {
        return http.delete(`/todos/${id}`);
    }

    deleteAll() {
        return http.delete(`/todos`);
    }
}

export default new TodoDataService();