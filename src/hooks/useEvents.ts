import { useState, useEffect, useCallback } from "react";
import { CalendarEvent } from "@/lib/calendar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setEvents([]);
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: true });

      if (!error && data) {
        setEvents(
          data.map((row: any) => ({
            id: row.id,
            title: row.title,
            date: new Date(row.date),
            time: row.time ?? undefined,
            color: row.color ?? undefined,
          }))
        );
      }
      setLoading(false);
    };

    fetchEvents();
  }, [user]);

  const addEvent = useCallback(
    async (event: Omit<CalendarEvent, "id">) => {
      if (!user) return;
      const { data, error } = await supabase
        .from("events")
        .insert({
          user_id: user.id,
          title: event.title,
          date: event.date.toISOString().split("T")[0],
          time: event.time ?? null,
          color: event.color ?? null,
        })
        .select()
        .single();

      if (!error && data) {
        setEvents((prev) => [
          ...prev,
          {
            id: data.id,
            title: data.title,
            date: new Date(data.date),
            time: data.time ?? undefined,
            color: data.color ?? undefined,
          },
        ]);
      }
    },
    [user]
  );

  const updateEvent = useCallback(
    async (id: string, updates: Partial<Omit<CalendarEvent, "id">>) => {
      if (!user) return;
      const payload: Record<string, any> = {};
      if (updates.title !== undefined) payload.title = updates.title;
      if (updates.date !== undefined) payload.date = updates.date.toISOString().split("T")[0];
      if (updates.time !== undefined) payload.time = updates.time || null;
      if (updates.color !== undefined) payload.color = updates.color || null;

      const { error } = await supabase
        .from("events")
        .update(payload)
        .eq("id", id)
        .eq("user_id", user.id);

      if (!error) {
        setEvents((prev) =>
          prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
        );
      }
    },
    [user]
  );

  const removeEvent = useCallback(
    async (id: string) => {
      if (!user) return;
      await supabase.from("events").delete().eq("id", id).eq("user_id", user.id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    },
    [user]
  );

  return { events, addEvent, updateEvent, removeEvent, loading };
}
