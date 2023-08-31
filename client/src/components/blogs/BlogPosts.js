import React, { memo } from "react";

const BlogPosts = () => {
  return (
    <div className="mt-6">
      <div className="border-b-2 border-main py-4 flex items-center justify-between">
        <span className="text-xl uppercase font-semibold">blog pots</span>
      </div>
    </div>
  );
};

export default memo(BlogPosts);
