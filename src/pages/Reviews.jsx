import React, { useEffect, useState } from 'react';

const SHEET_ID = '11t0od6iK2SiYhpqW71PEaXrkx1-bkREV12cSKdt8NE0';
const GID = '1911247948';
const API_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

function parseSheetData(jsonText) {
  // Remove Google API prefix
  const json = JSON.parse(jsonText.substring(47).slice(0, -2));
  const rows = json.table.rows;
  return rows.map(row => ({
    Timestamp: row.c[0]?.v || '',
    Feedback: row.c[1]?.v || '',
    Name: row.c[2]?.v || '',
    Class: row.c[3]?.v || '',
  }));
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.text())
      .then(data => {
        setReviews(parseSheetData(data));
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load reviews.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8 mb-12">
      <h1 className="text-4xl font-extrabold text-center text-primary mb-8">Student & Parent Reviews</h1>
      {loading && <div className="text-center text-gray-500">Loading reviews...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!loading && !error && reviews.length === 0 && (
        <div className="text-center text-gray-400">No reviews found.</div>
      )}
      <div className="space-y-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="bg-[#FBE4D6] rounded-lg shadow p-6 border-l-4 border-primary">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <span className="font-semibold text-lg text-primary">{review.Name || 'Anonymous'}</span>
              <span className="text-xs text-gray-500">{review.Timestamp}</span>
            </div>
            <div className="text-gray-700 mb-2 italic">Class: {review.Class}</div>
            <div className="text-gray-900 text-lg">{review.Feedback}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
