import { CalendarEvent, getCalendarDays, isSameDay, isSameMonth } from "@/lib/calendar";
import { isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {
  month: Date;
  events: CalendarEvent[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export default function CalendarGrid({ month, events, selectedDate, onSelectDate }: Props) {
  const days = getCalendarDays(month);

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2 tracking-wide uppercase">
            {d}
          </div>
        ))}
      </div>
      <motion.div
        key={month.toISOString()}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-7"
      >
        {days.map((day) => {
          const inMonth = isSameMonth(day, month);
          const today = isToday(day);
          const selected = selectedDate && isSameDay(day, selectedDate);
          const dayEvents = events.filter((e) => isSameDay(e.date, day));

          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              className={cn(
                "relative flex flex-col items-center py-3 transition-colors rounded-lg mx-0.5 my-0.5",
                !inMonth && "opacity-30",
                inMonth && "hover:bg-sage-50",
                selected && "bg-primary text-primary-foreground hover:bg-primary",
                today && !selected && "ring-1 ring-sage-200"
              )}
            >
              <span className={cn("text-sm", selected ? "font-medium" : "font-light")}>
                {day.getDate()}
              </span>
              {dayEvents.length > 0 && (
                <div className="flex gap-0.5 mt-1">
                  {dayEvents.slice(0, 3).map((e) => (
                    <span
                      key={e.id}
                      className={cn(
                        "w-1 h-1 rounded-full",
                        selected ? "bg-primary-foreground" : "bg-sage-400"
                      )}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
