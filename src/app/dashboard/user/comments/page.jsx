"use client";

import React, { useState } from "react";

export default function Comments() {
  const [comments, setComments] = useState([
    {
      id: "comment-1",
      lawyerName: "Patricia M. Vance",
      content: "Advocate Patricia resolved our family dispute with great care. Highly recommend her services!",
      date: "2026-06-23",
    },
    {
      id: "comment-2",
      lawyerName: "Elena R. Rostova",
      content: "Very analytical approach and professional representation. Got the case dismissed.",
      date: "2026-06-21",
    },
  ]);

  const handleDelete = (id) => {
    setComments((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">My Comments & Reviews</h2>
        <p className="mt-1 text-sm text-slate-400">Manage and edit your reviews submitted for lawyers.</p>
      </div>

      {comments.length === 0 ? (
        <div className="rounded-3xl border border-white/5 bg-slate-950/20 p-12 text-center text-slate-500">
          You haven't left any comments yet.
        </div>
      ) : (
        <div className="grid gap-6">
          {comments.map((item) => (
            <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-950/40 p-6 flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-white">{item.lawyerName}</h4>
                  <span className="text-[10px] text-slate-500">{item.date}</span>
                </div>
                <p className="mt-3 text-xs leading-6 text-slate-300">
                  "{item.content}"
                </p>
              </div>

              <div className="flex gap-4 border-t border-white/5 pt-4 justify-end">
                <button className="text-xs text-slate-400 hover:text-white transition cursor-pointer">
                  Edit Review
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs text-red-400 hover:text-red-300 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
