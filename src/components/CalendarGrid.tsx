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
                "relative flex flex-col items-start p-1.5 sm:p-2 transition-colors rounded-lg mx-0.5 my-0.5 min-h-[4rem] sm:min-h-[5rem]",
                !inMonth && "opacity-30",
                inMonth && "hover:bg-sage-50",
                selected && "bg-primary/10 ring-1 ring-primary hover:bg-primary/10",
                today && !selected && "ring-1 ring-sage-200"
              )}
            >
              <span
                className={cn(
                  "text-xs sm:text-sm leading-none mb-1",
                  selected ? "font-semibold text-primary" : "font-light text-foreground",
                  today && !selected && "font-medium"
                )}
              >
                {day.getDate()}
              </span>
              {dayEvents.length > 0 && (
                <div className="flex flex-col gap-0.5 w-full overflow-hidden">
                  {dayEvents.slice(0, 2).map((e) => (
                    <span
                      key={e.id}
                      className={cn(
                        "text-[10px] leading-tight truncate w-full text-left rounded px-1 py-0.5",
                        selected
                          ? "bg-primary/20 text-primary"
                          : "bg-sage-100 text-muted-foreground"
                      )}
                    >
                      {e.title}
                    </span>
                  ))}
                  {dayEvents.length > 2 && (
                    <span className="text-[9px] text-muted-foreground pl-1">
                      +{dayEvents.length - 2} more
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
