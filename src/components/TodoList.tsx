import { useState } from "react";
import { TaskItem } from "./TaskItem";
import { TaskInput } from "./TaskInput";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { toast } = useToast();

  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
    toast({
      title: "Task added!",
      description: "Your new task has been added successfully.",
    });
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed from your list.",
    });
  };

  const editTask = (id: string, newText: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  const clearCompleted = () => {
    const completedCount = tasks.filter(task => task.completed).length;
    setTasks(tasks.filter(task => !task.completed));
    if (completedCount > 0) {
      toast({
        title: "Completed tasks cleared",
        description: `Removed ${completedCount} completed task(s).`,
      });
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case "active":
        return !task.completed;
      case "completed":
        return task.completed;
      default:
        return true;
    }
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Happy Tasks
        </h1>
        <p className="text-lg text-muted-foreground">
          Stay organized and get things done with style
        </p>
      </div>

      {/* Task Input */}
      <div className="mb-8">
        <TaskInput onAdd={addTask} />
      </div>

      {/* Stats */}
      {tasks.length > 0 && (
        <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-gradient-card border border-border/50">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2 text-task-pending-foreground">
              <Circle className="h-4 w-4" />
              {activeCount} active
            </span>
            <span className="flex items-center gap-2 text-task-completed-foreground">
              <CheckCircle2 className="h-4 w-4" />
              {completedCount} completed
            </span>
          </div>
          {completedCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCompleted}
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear completed
            </Button>
          )}
        </div>
      )}

      {/* Filters */}
      {tasks.length > 0 && (
        <div className="flex justify-center mb-6">
          <div className="flex rounded-lg bg-card border border-border/50 p-1">
            {(["all", "active", "completed"] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={
                  filter === filterType 
                    ? "bg-gradient-primary text-primary-foreground shadow-button/30" 
                    : "hover:bg-task-hover/50"
                }
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-xl text-muted-foreground mb-2">
              {tasks.length === 0 
                ? "No tasks yet" 
                : filter === "active" 
                ? "No active tasks" 
                : "No completed tasks"
              }
            </p>
            <p className="text-sm text-muted-foreground">
              {tasks.length === 0 
                ? "Add your first task above to get started!" 
                : filter === "active"
                ? "All tasks are completed! 🎉"
                : "Complete some tasks to see them here."
              }
            </p>
          </div>
        ) : (
          filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className="animate-in slide-in-from-top-2 duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TaskItem
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};