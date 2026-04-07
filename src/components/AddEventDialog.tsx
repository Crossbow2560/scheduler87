import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { CalendarEvent } from "@/lib/calendar";

interface Props {
  date: Date;
  onAdd: (event: Omit<CalendarEvent, "id">) => void;
}

export default function AddEventDialog({ date, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), date, time: time || undefined });
    setTitle("");
    setTime("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary hover:bg-moss text-primary-foreground gap-1.5">
          <Plus size={14} />
          Add event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm bg-cream-50">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            {format(date, "MMMM d")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <Input
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="bg-cream-100 border-border"
          />
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-cream-100 border-border"
          />
          <Button type="submit" className="w-full bg-primary hover:bg-moss text-primary-foreground">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
