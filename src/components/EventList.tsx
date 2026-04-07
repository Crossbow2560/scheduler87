import { CalendarEvent, isSameDay, format } from "@/lib/calendar";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  date: Date | null;
  events: CalendarEvent[];
  onRemove: (id: string) => void;
}

export default function EventList({ date, events, onRemove }: Props) {
  if (!date) return null;
  const dayEvents = events.filter((e) => isSameDay(e.date, date));

  return (
    <div className="mt-6">
      <h3 className="font-heading text-xl text-foreground mb-3">
        {format(date, "MMMM d, yyyy")}
      </h3>
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
              className="flex items-center justify-between py-2 px-3 rounded-md bg-card mb-1.5 group"
            >
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{e.title}</p>
                  {e.time && <p className="text-xs text-muted-foreground">{e.time}</p>}
                </div>
              </div>
              <button
                onClick={() => onRemove(e.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive p-1"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
