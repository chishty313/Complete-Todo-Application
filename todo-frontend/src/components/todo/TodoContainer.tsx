import { useEffect, useState } from "react";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";

type TTodo = {
  _id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  priority: string;
};

const TodoContainer = () => {
  const [priority, setPriority] = useState("");
  // From Local State
  // const { todos } = useAppSelector((state) => state.todos);

  // From server
  const { data: todos, isLoading } = useGetTodosQuery(priority);

  const [sortedTodos, setSortedTodos] = useState<TTodo[]>([]);

  useEffect(() => {
    if (todos && todos.data) {
      const newSortedTodos = [...todos.data];
      rearrange(newSortedTodos);
      setSortedTodos(newSortedTodos);
    }
  }, [todos]);

  const rearrange = (todos: TTodo[]) => {
    todos.sort((a, b) => {
      if (a.isCompleted === b.isCompleted) return 0;
      return a.isCompleted ? 1 : -1;
    });
  };

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
        <div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
          {sortedTodos.map((todo: TTodo) => (
            <TodoCard key={todo._id} {...todo} />
          ))}
        </div>

        {/* <div className="bg-white text-2xl font-bold p-5 flex justify-center items-center rounded-md">
          <p>There is no task pending</p>
        </div> */}
      </div>
    </div>
  );
};

export default TodoContainer;
