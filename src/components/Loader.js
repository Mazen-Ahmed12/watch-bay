import React from 'react';

export default function Loader() {
  return (
    <div className="w-full flex-colo min-h-[200px] bg-dry rounded-lg">
      <div className="w-12 h-12 rounded-full border-4 border-t-subMain border-main animate-spin"></div>
    </div>
  );
}
