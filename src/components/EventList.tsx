import { useState } from "react";
import { CalendarEvent, isSameDay } from "@/lib/calendar";
import { X, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  date: Date | null;
  events: CalendarEvent[];
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<CalendarEvent, "id">>) => void;
}

export default function EventList({ date, events, onRemove, onUpdate }: Props) {
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTime, setEditTime] = useState("");

  if (!date) return null;
  const dayEvents = events.filter((e) => isSameDay(e.date, date));

  const openEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setEditTitle(event.title);
    setEditTime(event.time || "");
  };

  const handleSave = () => {
    if (!editingEvent || !editTitle.trim()) return;
    onUpdate(editingEvent.id, {
      title: editTitle.trim(),
      time: editTime || undefined,
    });
    setEditingEvent(null);
  };

  return (
    <>
      <div>
        <AnimatePresence mode="popLayout">
          {dayEvents.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground italic"
            >
              No events
            </motion.p>
          ) : (
            dayEvents.map((e) => (
              <motion.div
                key={e.id}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="flex items-center justify-between py-2 px-3 rounded-md bg-card mb-1.5 group cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => openEdit(e)}
              >
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{e.title}</p>
                    {e.time && <p className="text-xs text-muted-foreground">{e.time}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(ev) => { ev.stopPropagation(); openEdit(e); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={(ev) => { ev.stopPropagation(); onRemove(e.id); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <Dialog open={!!editingEvent} onOpenChange={(open) => !open && setEditingEvent(null)}>
        <DialogContent className="sm:max-w-sm bg-card">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Edit event</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(ev) => { ev.preventDefault(); handleSave(); }}
            className="space-y-3 mt-2"
          >
            <Input
              placeholder="Event title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
              className="bg-background border-border"
            />
            <Input
              type="time"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
              className="bg-background border-border"
            />
            <Button type="submit" className="w-full bg-primary hover:bg-moss text-primary-foreground">
              Save changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
