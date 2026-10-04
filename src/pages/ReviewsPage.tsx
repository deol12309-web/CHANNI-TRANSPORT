import React, { useState, useEffect } from 'react';
import { Star, ExternalLink, Send, CheckCircle2 } from 'lucide-react';
import { INITIAL_REVIEWS, ReviewItem, CONFIG } from '../data/config';
import { useStore } from '../store/useStore';

export const ReviewsPage: React.FC = () => {
  const { showToast } = useStore();
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    try {
      const storedStr = localStorage.getItem('channi_reviews');
      if (storedStr) {
        const localRevs: ReviewItem[] = JSON.parse(storedStr);
        setReviews([...localRevs, ...INITIAL_REVIEWS]);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      showToast('Please fill in your Name and Review text.', 'error');
      return;
    }

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      location: location.trim() || 'Punjab Client',
      rating,
      date: new Date().toISOString().split('T')[0],
      commentEn: comment.trim(),
      commentHi: comment.trim(),
      commentPa: comment.trim(),
      approved: true
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      const savedUserRevsStr = localStorage.getItem('channi_reviews');
      const savedUserRevs: ReviewItem[] = savedUserRevsStr ? JSON.parse(savedUserRevsStr) : [];
      localStorage.setItem('channi_reviews', JSON.stringify([newRev, ...savedUserRevs]));
    } catch (err) {
      console.error(err);
    }

    setName('');
    setLocation('');
    setComment('');
    showToast('Thank you! Your review has been saved successfully.', 'success');
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8 space-y-16 text-[#141210] dark:text-[#F4EFE6]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
          VERIFIED CUSTOMER TESTIMONIALS
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight">
          Client Ratings & Reviews
        </h1>
        <p className="text-base text-[#6B6458] dark:text-[#A39B8B]">
          Read what local shop owners, merchants, and families say about CHANNI TRANSPORT.
        </p>

        {/* Rating Summary */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] max-w-md mx-auto flex items-center justify-around shadow-md">
          <div className="text-center">
            <span className="font-serif text-5xl font-bold text-[#C9A96E]">5.0</span>
            <div className="flex text-[#C9A96E] mt-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-[#6B6458] dark:text-[#A39B8B] block mt-1">Overall Satisfaction</span>
          </div>

          <a
            href={CONFIG.googleReviewsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-[#C9A96E] text-[#141210] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#B8923F]"
          >
            <span>Review on Google</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Write a Review & Review Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Review Form */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-2xl space-y-6">
          <h2 className="font-serif text-2xl font-bold">Write a Customer Review</h2>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Your Full Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] text-sm"
              data-testid="input-review-name"
            />
            <input
              type="text"
              placeholder="City / Business Name (e.g. Ludhiana Trader)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] text-sm"
              data-testid="input-review-location"
            />

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-[#C9A96E]">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 text-[#C9A96E]"
                  >
                    <Star className={`w-6 h-6 ${rating >= star ? 'fill-current' : 'opacity-40'}`} />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={4}
              required
              placeholder="Share your experience with our tempo transport service..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] text-sm resize-none"
              data-testid="input-review-comment"
            />

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#C9A96E] hover:bg-[#B8923F] text-[#141210] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              data-testid="submit-review-btn"
            >
              <Send className="w-4 h-4" />
              <span>Submit Review</span>
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-7 space-y-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base">{rev.name}</h3>
                  <span className="text-xs text-[#6B6458] dark:text-[#A39B8B]">{rev.location} • {rev.date}</span>
                </div>
                <div className="flex text-[#C9A96E]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-sm font-serif italic text-[#141210] dark:text-[#F4EFE6]">
                "{rev.commentEn}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
