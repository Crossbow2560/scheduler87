import { useState } from "react";
import { ChevronLeft, ChevronRight, LogOut, Calendar, User } from "lucide-react";
import { addMonths, subMonths, format } from "@/lib/calendar";
import { useEvents } from "@/hooks/useEvents";
import { useAuth } from "@/contexts/AuthContext";
import CalendarGrid from "@/components/CalendarGrid";
import EventList from "@/components/EventList";
import AddEventDialog from "@/components/AddEventDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Index() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { events, addEvent, removeEvent } = useEvents();
  const { user, signOut } = useAuth();

  const avatarUrl = user?.user_metadata?.avatar_url;
  const displayName = user?.user_metadata?.full_name || user?.email || "User";
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-primary" />
            <span className="font-heading text-xl text-foreground">Cal</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full hover:bg-sage-50 transition-colors p-1 pr-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatarUrl} alt={displayName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground hidden sm:inline">{displayName}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem className="text-xs text-muted-foreground focus:bg-transparent cursor-default">
                {user?.email}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut} className="gap-2 text-destructive focus:text-destructive">
                <LogOut size={14} />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex items-start justify-center px-4 pt-20 pb-10 sm:pt-24 sm:pb-16">
        <div className="w-full max-w-md">
          {/* Month header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-heading text-3xl text-foreground tracking-tight">
              {format(currentMonth, "MMMM yyyy")}
            </h1>
            <div className="flex gap-1 items-center">
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
                <div />
                <AddEventDialog date={selectedDate} onAdd={addEvent} />
              </div>
              <EventList date={selectedDate} events={events} onRemove={removeEvent} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}