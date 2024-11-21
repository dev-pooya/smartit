import React from "react";

function TestimonialsCard({ sublist, index }) {
  return (
    <div
      className={`flex w-full flex-col gap-4 lg:gap-6 ${(index - 1) % 3 === 0 ? "md:pt-10" : null}`}
    >
      {sublist.map(({ title, subtitle, comment }) => (
        <div
          class="dark:border-[#52525b99] border-base-300 border bg-base-200/50 dark:bg-[#27272a80] p-4 rounded-2xl"
          data-aos="fade-up"
          data-aos-delay="0.2"
        >
          <div class="w-full mx-auto">
            <div class="flex items-center gap-6 mr-auto">
              <div class="shrink-0 h-12 overflow-hidden rounded-full w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  className="opacity-80"
                >
                  <path
                    fill="white"
                    d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.23 7.23 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-medium"> {title} </h3>
                <p class="opacity-90 dark:opacity-80 text-sm">{subtitle}</p>
              </div>
            </div>
            <p class="text-sm lg:text-base mt-4">{comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TestimonialsCard;
