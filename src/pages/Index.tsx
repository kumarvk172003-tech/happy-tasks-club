import { TodoList } from "@/components/TodoList";

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-12">
        <TodoList />
      </div>
    </main>
  );
};

export default Index;
