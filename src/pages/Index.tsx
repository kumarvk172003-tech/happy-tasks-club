import { TodoList } from "@/components/TodoList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-12">
        <TodoList />
      </div>
    </div>
  );
};

export default Index;
