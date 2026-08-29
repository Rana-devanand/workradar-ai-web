"use client";

import React, { useState } from "react";
import { MissedFollowupItem } from "@/lib/services/dashboardService";

interface MissedFollowupsCardProps {
  items?: MissedFollowupItem[];
}

export const MissedFollowupsCard: React.FC<MissedFollowupsCardProps> = ({
  items = [
    {
      id: "task-1",
      title: "Send API docs to DevTeam",
      dueText: "Due yesterday",
      completed: false,
    },
    {
      id: "task-2",
      title: "Review Q3 Marketing Spend",
      dueText: "Due 2 days ago",
      completed: false,
    },
  ],
}) => {
  const [tasks, setTasks] = useState(items);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="bg-white border border-[#e0e3e5] rounded-lg shadow-xs overflow-hidden flex flex-col text-left">
      <div className="px-4 py-2.5 border-b border-[#e0e3e5] bg-white">
        <h3 className="text-xs uppercase font-bold text-[#191c1e] tracking-wider">
          Missed Follow-ups
        </h3>
      </div>

      <div className="p-4 flex flex-col gap-2.5">
        {tasks.map((task) => (
          <label
            key={task.id}
            className="flex items-start gap-3 cursor-pointer group select-none"
          >
            <input
              type="checkbox"
              checked={!!task.completed}
              onChange={() => toggleTask(task.id)}
              className="mt-0.5 rounded border-[#e0e3e5] text-primary focus:ring-primary/20 cursor-pointer"
            />
            <div>
              <p
                className={`text-xs text-[#191c1e] group-hover:text-primary transition-colors ${
                  task.completed ? "line-through text-[#565e74]" : ""
                }`}
              >
                {task.title}
              </p>
              <p className="font-mono text-[10px] text-[#565e74]">{task.dueText}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

