import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface TaskInputProps {
  onAdd: (text: string) => void;
}

export const TaskInput = ({ onAdd }: TaskInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 h-12 text-lg border-border/50 focus:border-primary bg-card/50 backdrop-blur-sm transition-all duration-300 focus:shadow-button/20"
      />
      <Button
        type="submit"
        size="lg"
        className="h-12 px-6 bg-gradient-primary hover:shadow-button transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <Plus className="h-5 w-5" />
        Add Task
      </Button>
    </form>
  );
};