"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export default function Comments() {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [newContent, setNewContent] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [submittingEdit, setSubmittingEdit] = useState(false);

  const fetchComments = async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    setError("");
    try {
      const token = session?.session?.token;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/comments/user/${session.user.email}`, {
        credentials: "include",
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (!res.ok) {
        throw new Error("Failed to fetch comments.");
      }
      const data = await res.json();
      setComments(data);
    } catch (err) {
      setError(err.message || "An error occurred while loading your reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchComments();
    }
  }, [session]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const token = session?.session?.token;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/comments/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        setComments((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete comment");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenEdit = (comment) => {
    setEditingComment(comment);
    setNewContent(comment.content);
    setNewRating(comment.rating);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    setSubmittingEdit(true);
    try {
      const token = session?.session?.token;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/comments/${editingComment._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          content: newContent,
          rating: newRating
        })
      });
      if (res.ok) {
        setShowEditModal(false);
        fetchComments();
      } else {
        alert("Failed to save changes.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingEdit(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-1/3 bg-white/5 rounded-full" />
        <div className="h-64 bg-white/5 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">My Comments & Reviews</h2>
        <p className="mt-1 text-sm text-slate-400">Manage and edit your reviews submitted for lawyers.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {comments.length === 0 ? (
        <div className="rounded-3xl border border-white/5 bg-slate-950/20 p-12 text-center text-slate-500">
          You haven't left any comments yet.
        </div>
      ) : (
        <div className="grid gap-6">
          {comments.map((item) => (
            <div key={item._id} className="rounded-3xl border border-white/10 bg-slate-950/40 p-6 flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white">{item.lawyerName}</h4>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: item.rating }).map((_, idx) => (
                        <svg key={idx} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[var(--brand-accent)]">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500">{item.date}</span>
                </div>
                <p className="mt-3 text-xs leading-6 text-slate-300">
                  "{item.content}"
                </p>
              </div>

              <div className="flex gap-4 border-t border-white/5 pt-4 justify-end">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
                >
                  Edit Review
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-xs text-red-400 hover:text-red-300 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Review Modal */}
      {showEditModal && editingComment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-4xl border border-white/10 bg-slate-950 p-6 shadow-2xl">
            <div className="absolute inset-x-0 top-0 h-28" style={{ background: "radial-gradient(circle at top, rgba(217,154,30,0.08), transparent 70%)" }} />
            
            <form onSubmit={handleSaveEdit}>
              <h3 className="text-xl font-semibold text-white">Edit Review</h3>
              <p className="mt-1 text-xs text-slate-400">
                Updating your review for {editingComment.lawyerName}.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 uppercase mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="focus:outline-none transition hover:scale-110"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill={star <= newRating ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-6 w-6 text-[var(--brand-accent)]"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="edit-text" className="block text-xs font-medium text-slate-300 uppercase mb-2">Review Content</label>
                  <textarea
                    id="edit-text"
                    rows={4}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--brand-accent)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  disabled={submittingEdit}
                  className="flex-1 rounded-full border border-white/10 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingEdit}
                  className="flex-1 justify-center flex rounded-full px-5 py-2.5 text-xs font-semibold transition hover:bg-[#f8c232] cursor-pointer disabled:opacity-30"
                  style={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-accent-contrast)" }}
                >
                  {submittingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
