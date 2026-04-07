import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, subMonths, format } from "@/lib/calendar";
import { useEvents } from "@/hooks/useEvents";
import CalendarGrid from "@/components/CalendarGrid";
import EventList from "@/components/EventList";
import AddEventDialog from "@/components/AddEventDialog";

export default function Index() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { events, addEvent, removeEvent } = useEvents();

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl text-foreground tracking-tight">
            {format(currentMonth, "MMMM yyyy")}
          </h1>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
              className="p-2 rounded-lg hover:bg-sage-50 text-muted-foreground transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
              className="p-2 rounded-lg hover:bg-sage-50 text-muted-foreground transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Calendar */}
        <CalendarGrid
          month={currentMonth}
          events={events}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Events section */}
        {selectedDate && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-1">
              <div /> {/* spacer */}
              <AddEventDialog date={selectedDate} onAdd={addEvent} />
            </div>
            <EventList date={selectedDate} events={events} onRemove={removeEvent} />
          </div>
        )}
      </div>
    </div>
  );
}
